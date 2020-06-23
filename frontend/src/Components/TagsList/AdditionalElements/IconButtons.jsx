import React from "react";
import { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmDialog from "../../ConfirmDialog/ConfirmDialog";
import TagsCreateEditModal from "../../../Components/TagsCreateEditModal";

class IconButtons extends Component {
    constructor(props) {
        super(props);

        this.state = {
            confirmDeleteModalOpen: false,
            editTag: false,
        };

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.DeleteTag(this.props.tag.id);
        if (this.props.emptyPage) {
            this.props.onChangePage(Math.max(this.props.page - 1, 0));
        }
    }

    render() {
        return (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <TagsCreateEditModal
                    title="Edit tag"
                    showEditIcon={1}
                    existingTags={this.props.existingTags}
                    existingCategories={this.props.existingCategories}
                    CreateTag={this.props.CreateTag}
                    onCreateTagNotification={this.props.onCreateTagNotification}
                    EditTag={this.props.EditTag}
                    onEditTagNotification={this.props.onEditTagNotification}
                    checkTag={this.props.checkTag}
                    tag={this.props.tag}
                />

                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() =>
                        this.setState({
                            confirmDeleteModalOpen: true,
                        })
                    }
                >
                    <DeleteIcon />
                </IconButton>

                {this.state.confirmDeleteModalOpen ? (
                    <ConfirmDialog
                        text={"Are you sure that you want to delete \"" + this.props.tag.name + "\"?"}
                        isOpen={this.state.confirmDeleteModalOpen}
                        handleClose={() =>
                            this.setState({
                                confirmDeleteModalOpen: false,
                            })
                        }
                        handleAgree={() => {
                            this.props.onDeleteTagNotification();
                            this.handleDelete();
                        }}
                    />
                ) : null}
            </div>
        );
    }
}

export default IconButtons;
