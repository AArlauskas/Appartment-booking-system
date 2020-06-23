import React, { Component } from "react";
import "./CategoryList.scss";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Subcategory from "./Subcategory.js";
import List from "@material-ui/core/List";
import CategoriesModal from "../CategoriesModal";
import SubCategoriesModal from "../SubCategoriesModal";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";

class Category extends Component {
    state = {
        expanded: true,
        SubCategoryModalOpen: false,
        editCategory: false,
        confirmModalOpen: false,
    };
    render() {
        return (
            <div>
                <ListItem classes={{ gutters: "padding" }}>
                    <Button
                        classes={{
                            root: "category-button",
                        }}
                    >
                        <ListItemText
                            primary={
                                <div className="spacing-between-lines">
                                    <label>{this.props.name}</label>

                                    {this.props.tags.map((tag) => {
                                        return (
                                            <Chip
                                                key={tag}
                                                label={tag}
                                                size="small"
                                                className="tag"
                                            />
                                        );
                                    })}
                                </div>
                            }
                            secondary={this.props.description}
                            align="left"
                        />
                        {this.state.expanded ? (
                            <ExpandLess
                                className={"icon-box-expand"}
                                onClick={() =>
                                    this.setState({ expanded: false })
                                }
                            />
                        ) : (
                                <ExpandMore
                                    className={"icon-box-less"}
                                    onClick={() =>
                                        this.setState({ expanded: true })
                                    }
                                />
                            )}
                    </Button>
                    {window.localStorage.getItem("role") === "Admin" ? (
                        <React.Fragment>
                            {" "}
                            <IconButton
                                aria-label="Add"
                                size="small"
                                className={"icon-box"}
                                onClick={() =>
                                    this.setState({
                                        SubCategoryModalOpen: true,
                                    })
                                }
                            >
                                <AddIcon />
                            </IconButton>
                            <IconButton
                                aria-label="Edit"
                                size="small"
                                className={"icon-box"}
                                onClick={() => {
                                    this.setState({ editCategory: true });
                                }}
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
                </ListItem>

                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <List className="CategoryList">
                        {this.props.SubCategoryData.map((SubCategory) => {
                            return (
                                <Subcategory
                                    key={SubCategory.id}
                                    id={SubCategory.id}
                                    name={SubCategory.name}
                                    description={SubCategory.description}
                                    color={SubCategory.color}
                                    CategoryData={this.props.CategoryData}
                                    parentId={SubCategory.parentId}
                                    onAddSubCategory={
                                        this.props.onAddSubCategory
                                    }
                                    onEditSubCategory={
                                        this.props.onEditSubCategory
                                    }
                                    onDeleteSubCategory={
                                        this.props.onDeleteSubCategory
                                    }
                                    hasEvents={
                                        SubCategory.schedulerEvents.length !== 0
                                    }
                                    onCreateNotificationSubcategory={
                                        this.props
                                            .onCreateNotificationSubcategory
                                    }
                                    onEditNotificationSubcategory={
                                        this.props.onEditNotificationSubcategory
                                    }
                                    onDeleteNotificationSubcategory={
                                        this.props
                                            .onDeleteNotificationSubcategory
                                    }
                                />
                            );
                        })}
                    </List>
                </Collapse>
                {this.state.editCategory ? (
                    <CategoriesModal
                        modalName="Edit category"
                        isOpen={this.state.editCategory}
                        closeModal={() =>
                            this.setState({ editCategory: false })
                        }
                        id={this.props.id}
                        name={this.props.name}
                        TagNames={this.props.TagNames}
                        description={this.props.description}
                        tags={this.props.tags}
                        onEditCategory={this.props.onEditCategory}
                        CategoryData={this.props.CategoryData}
                        onEditNotificationCategory={
                            this.props.onEditNotificationCategory
                        }
                        onCreateNotificationCategory={
                            this.props.onCreateNotificationCategory
                        }
                    />
                ) : null}

                {this.state.SubCategoryModalOpen ? (
                    <SubCategoriesModal
                        modalName="Create subcategory"
                        closeModal={() =>
                            this.setState({
                                SubCategoryModalOpen: false,
                            })
                        }
                        parentId={this.props.id}
                        CategoryData={this.props.CategoryData}
                        isOpen={this.state.SubCategoryModalOpen}
                        onAddSubCategory={this.props.onAddSubCategory}
                        onEditSubCategory={this.props.onEditSubCategory}
                        onDeleteSubCategory={this.props.onDeleteSubCategory}
                        onCreateNotificationSubcategory={
                            this.props.onCreateNotificationSubcategory
                        }
                        onEditNotificationSubcategory={
                            this.props.onEditNotificationSubcategory
                        }
                        onDeleteNotificationSubcategory={
                            this.props.onDeleteNotificationSubcategory
                        }
                    />
                ) : null}

                {this.state.confirmModalOpen ? (
                    <ConfirmDialog
                        text={
                            "Are you sure that you want to delete \"" + this.props.name + "\" and all it's subcategories?"
                        }
                        isOpen={this.state.confirmModalOpen}
                        handleClose={() =>
                            this.setState({ confirmModalOpen: false })
                        }
                        handleAgree={() => {
                            this.props.onDeleteCategory(this.props.id);
                            this.props.onDeleteNotificationCategory();
                        }}
                    />
                ) : null}
            </div>
        );
    }
}

export default Category;
