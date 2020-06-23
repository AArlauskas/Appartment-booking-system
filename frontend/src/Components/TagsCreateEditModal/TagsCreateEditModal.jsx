import React from "react";
import UnifiedModal from "../UnifiedModal/index.js";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import TagsCreateEditForm from "./FormComponent/TagsCreateEditForm";
import DefaultButton from "../Core-Components/DefaultButton/DefaultButton";
import "./TagsCreateEditModal.scss";
import DefaultTextField from "../Core-Components/DefaultTextField/index.js";

class TagsCreateEditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            showEditIcon: false,
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen = () => this.setState({ open: true });
    handleClose = () => this.setState({ open: false });

    render() {
        return (
            <div>
                {this.props.showEditIcon ? (
                    <IconButton
                        edge="start"
                        aria-label="edit"
                        onClick={this.handleOpen}
                    >
                        <EditIcon />
                    </IconButton>
                ) : (
                        <div>
                            <div
                                style={{
                                    float: "left",
                                    paddingRight: 15,
                                    paddingTop: 15,
                                    marginBottom: 10,
                                }}
                            >
                                <DefaultButton
                                    // disabled={!this.state.isAdmin}
                                    onClick={this.handleOpen}
                                    label="New tag"
                                />
                            </div>
                            <div>
                                <DefaultTextField
                                    style={{ width: 275 }}
                                    onChange={(e) =>
                                        this.props.onChangedFilterInput(e)
                                    }
                                    label="Filter tags"
                                    isRequired={false}
                                />
                            </div>
                        </div>
                    )}

                <UnifiedModal
                    open={this.state.open}
                    title={this.props.title}
                    onSave={this.saveClicked}
                    onCancel={this.cancelClicked}
                >
                    <TagsCreateEditForm
                        closeForm={this.handleClose}
                        tag={this.props.tag}
                        onClose={this.handleClose}
                        existingTags={this.props.existingTags}
                        CreateTag={this.props.CreateTag}
                        EditTag={this.props.EditTag}
                        checkTag={this.props.checkTag}
                        existingCategories={this.props.existingCategories}
                        onCreateTagNotification={
                            this.props.onCreateTagNotification
                        }
                        onEditTagNotification={this.props.onEditTagNotification}
                    />
                </UnifiedModal>
            </div>
        );
    }
}

export default TagsCreateEditModal;
