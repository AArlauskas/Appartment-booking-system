import React from "react";
import { connect } from "react-redux";
import {
    fetchSchedulerResources,
    fetchSchedulerEvents,
    addNewSchedulerEvent,
    editSchedulerEvent,
    deleteSchedulerEvent,
} from "../../Actions/SchedulerActions";
import { fetchTagListData } from "../../Actions/TagListActions";
import Scheduler from "../../Components/Scheduler";
import ModalScheduledItems from "../../Components/ModalScheduledItems";
import LoadingScreen from "../LoadingDisplay/LoadingScreen";

class SchedulerDisplay extends React.Component {
    componentDidMount() {
        this.props.fetchSchedulerResources();
        this.props.fetchSchedulerEvents();
        this.props.fetchTagListData();
    }

    render() {
        return (
            <div>
                {this.props.schedulerResources.length === 0 ||
                this.props.schedulerEvents.length === 0 ? (
                    <LoadingScreen />
                ) : (
                    <React.Fragment>
                        <ModalScheduledItems
                            categories={this.props.schedulerResources}
                        />
                        <Scheduler
                            resources={this.props.schedulerResources}
                            events={this.props.schedulerEvents}
                            tags={this.props.tags}
                            onNewEvent={this.props.addNewSchedulerEvent}
                            onEventEdit={this.props.editSchedulerEvent}
                            onEventDelete={this.props.deleteSchedulerEvent}
                        />
                    </React.Fragment>
                )}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchSchedulerResources: () => dispatch(fetchSchedulerResources()),
    fetchSchedulerEvents: () => dispatch(fetchSchedulerEvents()),
    fetchTagListData: () => dispatch(fetchTagListData()),
    addNewSchedulerEvent: (data) => dispatch(addNewSchedulerEvent(data)),
    editSchedulerEvent: (data) => dispatch(editSchedulerEvent(data)),
    deleteSchedulerEvent: (data) => dispatch(deleteSchedulerEvent(data)),
});

const mapStateToProps = (state) => ({
    schedulerResources: state.schedulerResources,
    schedulerEvents: state.schedulerEvents,
    tags: state.tagListData,
    loadingStatus: state.loadingStatus,
});

export default connect(mapStateToProps, mapDispatchToProps)(SchedulerDisplay);
