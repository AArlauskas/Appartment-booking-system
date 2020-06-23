import "./CategoryList.scss";
import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import SubCategoriesModal from "../SubCategoriesModal";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";

class SubCategory extends Component {
    state = {
        modalEdit: false,
        confirmModalOpen: false,
    };
    render() {
        return (
            <ListItem classes={{ gutters: "padding" }}>
                <Button classes={{ root: "subcategory-button" }}>
                    <StopRoundedIcon style={{ color: this.props.color }} />
                    <ListItemText
                        primary={this.props.name}
                        secondary={this.props.description}
                        align="left"
                    />
                </Button>
                {window.localStorage.getItem("role") === "Admin" ? (
                    <React.Fragment>
                        <IconButton
                            aria-label="Edit"
                            className={"icon-box"}
                            size="small"
                            onClick={() => this.setState({ modalEdit: true })}
                        >
                            <EditIcon />
                        </IconButton>

                        <IconButton
                            aria-label="Delete"
                            size="small"
                            className={"icon-box"}
                            onClick={() =>
                                this.setState({ confirmModalOpen: true })
                            }
                        >
                            <DeleteIcon />
                        </IconButton>
                    </React.Fragment>
                ) : null}
                {this.state.modalEdit ? (
                    <SubCategoriesModal
                        modalName="Edit subcategory"
                        isOpen={this.state.modalEdit}
                        closeModal={() => this.setState({ modalEdit: false })}
                        id={this.props.id}
                        name={this.props.name}
                        description={this.props.description}
                        color={this.props.color}
                        CategoryData={this.props.CategoryData}
                        parentCategory={this.props.parentCategory}
                        parentId={this.props.parentId}
                        onAddSubCategory={this.props.onAddSubCategory}
                        onEditSubCategory={this.props.onEditSubCategory}
                        onDeleteSubCategory={this.props.onDeleteSubCategory}
                        onCreateNotificationSubcategory={
                            this.props.onCreateNotificationSubcategory
                        }
                        onEditNotificationSubcategory={
                            this.props.onEditNotificationSubcategory
                        }
                    />
                ) : null}
                {this.state.confirmModalOpen ? (
                    <ConfirmDialog
                        text={"Are you sure you want to delete \"" + this.props.name + "\"?"}
                        warning={this.props.hasEvents}
                        isOpen={this.state.confirmModalOpen}
                        handleClose={() =>
                            this.setState({ confirmModalOpen: false })
                        }
                        handleAgree={() => {
                            this.props.onDeleteSubCategory(this.props.id);
                            this.props.onDeleteNotificationSubcategory();
                        }}
                    />
                ) : null}
            </ListItem>
        );
    }
}

export default SubCategory;
