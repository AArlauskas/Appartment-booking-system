import React, { Component } from "react";
import Scheduler, { SchedulerData, ViewTypes } from "react-big-scheduler";
import "react-big-scheduler/lib/css/style.css";
import moment from "moment";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import "./Scheduler.css";
import SlotItemTemplateResolver from "./SlotItemTemplateResolver";
import DefaultButton from "../Core-Components/DefaultButton/DefaultButton";
import DefaultMultiSelect from "../Core-Components/DefaultMultiSelect";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import _ from "lodash";
import EventItemPopoverTemplateResolver from "./EventItemPopoverTemplateResolver";
import ModalScheduledItems from "../ModalScheduledItems";
import Notification from "../Notification/Notification";

let schedulerData = new SchedulerData(moment(), ViewTypes.Month, false, false, {
    eventItemPopoverEnabled: true,
    scrollToSpecialMomentEnabled: true,
    views: [
        {
            viewName: "Week",
            viewType: ViewTypes.Week,
        },
        {
            viewName: "Month",
            viewType: ViewTypes.Month,
        },
        {
            viewName: "Quarter",
            viewType: ViewTypes.Quarter,
        },
    ],
});

class SchedulerComponent extends Component {
    constructor(props) {
        super(props);

        let events = props.events;
        let resources = props.resources;

        events.forEach((event) => {
            event.bgColor = resources.find(
                (resource) => resource.id === event.resourceId
            ).color;
            if (!event.isApproved) {
                event.bgColor = event.isApproved
                    ? event.bgColor
                    : event.bgColor + "61";
            }
        });

        schedulerData.localeMoment.locale("en");
        schedulerData.config.creatable = false;
        schedulerData.config.movable = false;
        schedulerData.config.crossResourceMove = false;
        schedulerData.config.resourceName = "Apartments";
        schedulerData.config.monthResourceTableWidth = 250;
        schedulerData.config.weekResourceTableWidth = 250;
        schedulerData.config.quarterResourceTableWidth = 250;
        schedulerData.setResources(props.resources);
        schedulerData.setEvents(props.events);

        this.state = {
            viewModel: schedulerData,
            isAdmin: window.localStorage.getItem("role") === "Admin",
            confirmDeleteModalOpen: false,
            confirmEditModalOpen: false,
            eventToDelete: {},
            eventToEdit: {},
            selectedTags: [],
            notificationOpen: false,
            notificationMessage: "",
            notificationSeverity: "",
        };
    }

    componentDidMount() {
        this.toggleAdminRights();
    }

    nonAgendaCellHeaderTemplateResolver = (
        schedulerData,
        item,
        formattedDateItems,
        style
    ) => {
        let datetime = schedulerData.localeMoment(item.time);
        let isCurrentDate = false;

        if (schedulerData.viewType === ViewTypes.Day) {
            isCurrentDate = datetime.isSame(new Date(), "hour");
        } else {
            isCurrentDate = datetime.isSame(new Date(), "day");
        }

        if (isCurrentDate) {
            style.backgroundColor = "#CE2B27";
            style.color = "white";
        }

        return (
            <th key={item.time} className={"header3-text"} style={style}>
                {formattedDateItems.map((formattedItem, index) => (
                    <div
                        key={index}
                        dangerouslySetInnerHTML={{
                            __html: formattedItem.replace(
                                /[0-9]/g,
                                "<b>$&</b>"
                            ),
                        }}
                    />
                ))}
            </th>
        );
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const getEventColor = (event, nextProps) => {
            let resourceId = event.resourceId;
            let resources = nextProps.resources;

            let resource = resources.find((r) => {
                return r.id === resourceId;
            });

            let eventColor = resource.color;
            // 61 means 31% opacity in hex
            eventColor = event.isApproved ? eventColor : eventColor + "61";
            return eventColor;
        };

        const setEventColors = (nextProps) => {
            nextProps.events.forEach((event) => {
                let color = getEventColor(event, nextProps);
                event.bgColor = color;
            });
        };

        if (!_.isEqual(nextProps.events, prevState.viewModel.events)) {
            let events = nextProps.events;
            setEventColors(nextProps);
            schedulerData.setEvents(events);
        }
        if (!_.isEqual(nextProps.resources, prevState.viewModel.resources)) {
            let resources = nextProps.resources;
            schedulerData.setResources(resources);
        }

        return { viewModel: schedulerData };
    }

    render() {
        const getFilteredViewModel = () => {
            let viewModel = this.state.viewModel;
            let selectedTagsCategories = [];
            let filteredResources = [];
            this.state.selectedTags.forEach((tag) => {
                selectedTagsCategories.push(tag.name);
            });
            if (selectedTagsCategories.length !== 0) {
                viewModel.resources.forEach((resource) => {
                    if (resource.tags.length === 0) {
                        filteredResources.push(resource);
                    }
                    resource.tags.forEach((includedTag) => {
                        if (
                            selectedTagsCategories.includes(includedTag) ||
                            resource.groupOnly === false
                        ) {
                            filteredResources.push(resource);
                        }
                    });
                });
                viewModel.setResources(filteredResources);
            }
            return viewModel;
        };

        return (
            <div>
                <Notification
                    open={this.state.notificationOpen}
                    onClose={() =>
                        this.setState({
                            notificationOpen: false,
                            notificationMessage: "",
                            notificationSeverity: "",
                        })
                    }
                    message={this.state.notificationMessage}
                    severity={this.state.notificationSeverity}
                />
                <h3 className="scheduler-header">Devbridge Scheduler</h3>

                <div className="scheduler-buttons-block">
                    {window.localStorage.getItem("role") === "Admin" ? (
                        <React.Fragment>
                            <div className="scheduler-add-event-btn">
                                <DefaultButton
                                    disabled={!this.state.isAdmin}
                                    onClick={() =>
                                        this.setState({
                                            confirmEditModalOpen: true,
                                        })
                                    }
                                    label="Add event"
                                />
                            </div>
                            <br />
                        </React.Fragment>
                    ) : null}
                    <div className="scheduler-today-btn">
                        <DefaultButton
                            onClick={this.setTodayDate}
                            label="Today"
                        />
                    </div>
                    <br />
                </div>
                <br />
                <div style={{ paddingTop: 20 }}>
                    <DefaultMultiSelect
                        options={this.props.tags}
                        getOptionLabel={(option) => option.name}
                        label="Filter"
                        onChange={(value, type) =>
                            type === "clear"
                                ? this.setState({ selectedTags: [] })
                                : this.setState({
                                    selectedTags: value,
                                    notificationOpen: true,
                                    notificationMessage:
                                        "Categories filtered",
                                    notificationSeverity: "info",
                                })
                        }
                    />
                </div>

                <Scheduler
                    newEvent={(
                        resourceId,
                        resourceName,
                        start,
                        end,
                        title = "New event you just created",
                        //item,  no idea what this is and why was it here
                        isApproved = false
                    ) => {
                        let event = {
                            //No idea why, but assigning values in this way works...
                            resourceId: resourceName,
                            resourceName: start,
                            start: end,
                            end: title,
                            title: "",
                            isApproved: isApproved,
                        };
                        this.setState({
                            confirmEditModalOpen: true,
                            eventToEdit: { event },
                        });
                    }}
                    updateEventStart={(schedulerData, event, start) => {
                        this.setState({
                            notificationOpen: true,
                            notificationMessage: "Event updated",
                            notificationSeverity: "success",
                        });
                        const eventEdited = _.cloneDeep(event);
                        eventEdited.start = start;
                        this.props.onEventEdit(eventEdited);
                    }}
                    updateEventEnd={(schedulerData, event, end) => {
                        this.setState({
                            notificationOpen: true,
                            notificationMessage: "Event updated",
                            notificationSeverity: "success",
                        });
                        const eventEdited = _.cloneDeep(event);
                        eventEdited.end = end;
                        this.props.onEventEdit(eventEdited);
                    }}
                    moveEvent={(
                        schedulerData,
                        event,
                        resourceId,
                        resourceName,
                        start,
                        end
                    ) => {
                        this.setState({
                            notificationOpen: true,
                            notificationMessage: "Event updated",
                            notificationSeverity: "success",
                        });
                        const eventEdited = _.cloneDeep(event);
                        eventEdited.start = start;
                        eventEdited.end = end;
                        eventEdited.resourceId = resourceId;
                        eventEdited.resourceName = resourceName;
                        this.props.onEventEdit(eventEdited);
                    }}
                    schedulerData={getFilteredViewModel()}
                    prevClick={this.prevClick}
                    nextClick={this.nextClick}
                    onSelectDate={this.onSelectDate}
                    onViewChange={this.onViewChange}
                    //eventItemClick={this.state.isAdmin ? this.eventClicked : null}
                    onScrollLeft={this.onScrollLeft}
                    onScrollRight={this.onScrollRight}
                    onScrollTop={this.onScrollTop}
                    onScrollBottom={this.onScrollBottom}
                    nonAgendaCellHeaderTemplateResolver={
                        this.nonAgendaCellHeaderTemplateResolver
                    }
                    slotItemTemplateResolver={(
                        schedulerData,
                        slot,
                        slotClickedFunc,
                        width,
                        className
                    ) => (
                            <SlotItemTemplateResolver
                                schedulerData={schedulerData}
                                slot={slot}
                                slotClickedFunc={slotClickedFunc}
                                width={width}
                                className={className}
                                getSlotColor={this.getSlotColor}
                                toggleExpandFunc={this.toggleExpandFunc}
                            />
                        )}
                    eventItemPopoverTemplateResolver={(
                        schedulerData,
                        eventItem,
                        title,
                        start,
                        end,
                        statusColor,
                        isApproved
                    ) => (
                            <EventItemPopoverTemplateResolver
                                schedulerData={schedulerData}
                                eventItem={eventItem}
                                title={title}
                                start={start}
                                end={end}
                                statusColor={statusColor}
                                isApproved={eventItem.isApproved} //isApproved is undefined or sth
                                viewEventText={this.state.isAdmin ? "Edit" : null}
                                viewEvent2Text={
                                    this.state.isAdmin ? "Delete" : null
                                }
                                viewEventClick={(schedulerData, event) => {
                                    event.resourceName = this.state.viewModel.resources.find(
                                        (resource) =>
                                            resource.id === event.resourceId
                                    ).name;
                                    this.setState({
                                        confirmEditModalOpen: true,
                                        eventToEdit: { event },
                                    });
                                }}
                                viewEvent2Click={(schedulerData, event) =>
                                    this.setState({
                                        confirmDeleteModalOpen: true,
                                        eventToDelete: event,
                                    })
                                }
                            />
                        )}
                />

                {this.state.confirmDeleteModalOpen ? (
                    <ConfirmDialog
                        text={`Are you sure that you want to delete  "${this.state.eventToDelete.title}" ?`}
                        isOpen={this.state.confirmDeleteModalOpen}
                        handleClose={() =>
                            this.setState({
                                confirmDeleteModalOpen: false,
                                eventToDelete: {},
                            })
                        }
                        handleAgree={() => {
                            this.setState({
                                notificationOpen: true,
                                notificationMessage: "Event deleted",
                                notificationSeverity: "error",
                            });
                            let schedulerData = this.state.viewModel;
                            let event = this.state.eventToDelete;
                            this.props.onEventDelete({ schedulerData, event });
                            this.setState({
                                confirmDeleteModalOpen: false,
                                eventToDelete: {},
                            });
                        }}
                    />
                ) : null}

                {this.state.confirmEditModalOpen ? (
                    <ModalScheduledItems
                        categories={this.state.viewModel.resources.filter(
                            (resource) => resource.groupOnly === false
                        )}
                        open={true}
                        handleClose={() =>
                            this.setState({
                                confirmEditModalOpen: false,
                                eventToEdit: {},
                            })
                        }
                        handleCreate={this.props.onNewEvent}
                        handleEdit={this.props.onEventEdit}
                        event={this.state.eventToEdit.event}
                        onEditNotification={() =>
                            this.setState({
                                notificationOpen: true,
                                notificationMessage: "Event updated",
                                notificationSeverity: "success",
                            })
                        }
                        onCreateNotification={() =>
                            this.setState({
                                notificationOpen: true,
                                notificationMessage: "Event created",
                                notificationSeverity: "success",
                            })
                        }
                    />
                ) : null}
            </div>
        );
    }

    prevClick = (schedulerData) => {
        schedulerData.prev();
        //schedulerData.setEvents(events);
        this.setState({
            viewModel: schedulerData,
        });
    };

    nextClick = (schedulerData) => {
        schedulerData.next();
        //schedulerData.setEvents(events);
        this.setState({
            viewModel: schedulerData,
        });
    };

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(
            view.viewType,
            view.showAgenda,
            view.isEventPerspective
        );
        //schedulerData.setEvents(events);
        this.setState({
            viewModel: schedulerData,
        });
    };

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        //schedulerData.setEvents(events);
        this.setState({
            viewModel: schedulerData,
        });
    };

    /* eventClicked = (schedulerData, event) => {
		alert(`Event "eventClicked". You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
	}; */

    onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
        if (schedulerData.ViewTypes === ViewTypes.Day) {
            schedulerData.next();
            //schedulerData.setEvents(events);
            this.setState({
                viewModel: schedulerData,
            });

            schedulerContent.scrollLeft = maxScrollLeft - 10;
        }
    };

    onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
        if (schedulerData.ViewTypes === ViewTypes.Day) {
            schedulerData.prev();
            //schedulerData.setEvents(events);
            this.setState({
                viewModel: schedulerData,
            });

            schedulerContent.scrollLeft = 10;
        }
    };

    onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
        console.log("onScrollTop");
    };

    onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
        console.log("onScrollBottom");
    };

    toggleExpandFunc = (schedulerData, slotId) => {
        schedulerData.toggleExpandStatus(slotId);
        this.setState({
            viewModel: schedulerData,
        });
    };

    toggleAdminRights = () => {
        const isAdmin = this.state.isAdmin;
        let schedulerData = this.state.viewModel;
        if (isAdmin) {
            schedulerData.config.creatable = true;
            schedulerData.config.movable = true;
            schedulerData.config.crossResourceMove = true;
            schedulerData.config.startResizable = true;
            schedulerData.config.endResizable = true;
        } else {
            schedulerData.config.creatable = false;
            schedulerData.config.movable = false;
            schedulerData.config.crossResourceMove = false;
            schedulerData.config.startResizable = false;
            schedulerData.config.endResizable = false;
        }
        this.setState({
            viewModel: schedulerData,
            isAdmin,
        });
    };

    setTodayDate = () => {
        let schedulerData = this.state.viewModel;
        schedulerData.setDate();

        if (schedulerData.viewType === ViewTypes.Week) {
            let schedulerStartDateMonth = new Date(
                schedulerData.startDate
            ).getMonth();
            let schedulerSelectDateMonth = new Date(
                schedulerData.selectDate
            ).getMonth();

            if (schedulerStartDateMonth !== schedulerSelectDateMonth) {
                let oldStartDate = new Date(schedulerData.startDate);
                let newStartDate = new Date(
                    oldStartDate.setMonth(schedulerSelectDateMonth)
                );
                schedulerData.startDate =
                    newStartDate.getFullYear() +
                    "-" +
                    newStartDate.getMonth() +
                    "-" +
                    newStartDate.getDate();
            }
        }

        let view = {
            viewType: ViewTypes.Month,
            showAgenda: false,
            isEventPerspective: false,
        };

        schedulerData.setScrollToSpecialMoment(true);

        this.setState({
            viewModel: schedulerData,
        });

        this.onViewChange(schedulerData, view);

        // View select buttons are radio buttons
        let viewButtons = document.getElementsByClassName(
            "ant-radio-button-input"
        );
        // Month view with index 1
        viewButtons[1].click();
    };

    getSlotColor = (schedulerData, slot) => {
        const res = schedulerData.resources.find((r) => {
            return r.id === slot.slotId;
        });
        return res.color; // set backgroundColor
    };
}

export default DragDropContext(HTML5Backend)(SchedulerComponent);
