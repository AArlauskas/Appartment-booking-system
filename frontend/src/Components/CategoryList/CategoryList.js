import "./CategoryList.scss";
import React, { Component } from "react";
import List from "@material-ui/core/List";
import Category from "./Category.js";
import CategoriesModal from "../CategoriesModal";
import DefaultButton from "../Core-Components/DefaultButton/DefaultButton";
import DefaultTextField from "../Core-Components/DefaultTextField";

class CategoryList extends Component {
    state = {
        CategoryModalOpen: false,
        filterText: "",
    };
    render() {
        let FilteredCategoryData =
            this.state.filterText === ""
                ? this.props.CategoryData
                : this.props.CategoryData.filter((category) =>
                    category.name
                        .toLowerCase()
                        .startsWith(this.state.filterText.toLowerCase())
                );
        return (
            <div>
                <div>
                    {window.localStorage.getItem("role") === "Admin" ? (
                        <div
                            style={{
                                float: "left",
                                marginRight: 15,
                                paddingTop: 10,
                            }}
                        >
                            <DefaultButton
                                purpose="addCategory"
                                onClick={() =>
                                    this.setState({ CategoryModalOpen: true })
                                }
                                label="Add Category"
                            />
                        </div>
                    ) : null}
                    <div>
                        <DefaultTextField
                            style={{ width: 250 }}
                            onChange={(e) =>
                                this.setState({ filterText: e.target.value })
                            }
                            label="Filter categories"
                            isRequired={false}
                        />
                    </div>
                </div>
                <List className="category-list">
                    {FilteredCategoryData.length !== 0 ? (
                        FilteredCategoryData.map((category) => {
                            return (
                                <div key={category.id}>
                                    <Category
                                        id={category.id}
                                        key={category.id}
                                        name={category.name}
                                        description={category.description}
                                        tags={category.tags}
                                        TagNames={this.props.TagNames}
                                        CategoryData={this.props.CategoryData}
                                        SubCategoryData={this.props.SubCategoryData.filter(
                                            (SubCategory) =>
                                                SubCategory.parentId ===
                                                category.id
                                        )}
                                        onEditCategory={
                                            this.props.onEditCategory
                                        }
                                        onDeleteCategory={
                                            this.props.onDeleteCategory
                                        }
                                        onAddSubCategory={
                                            this.props.onAddSubCategory
                                        }
                                        onEditSubCategory={
                                            this.props.onEditSubCategory
                                        }
                                        onDeleteSubCategory={
                                            this.props.onDeleteSubCategory
                                        }
                                        onEditNotificationCategory={
                                            this.props
                                                .onEditNotificationCategory
                                        }
                                        onCreateNotificationCategory={
                                            this.props
                                                .onCreateNotificationCategory
                                        }
                                        onDeleteNotificationCategory={
                                            this.props
                                                .onDeleteNotificationCategory
                                        }
                                        onCreateNotificationSubcategory={
                                            this.props
                                                .onCreateNotificationSubcategory
                                        }
                                        onEditNotificationSubcategory={
                                            this.props
                                                .onEditNotificationSubcategory
                                        }
                                        onDeleteNotificationSubcategory={
                                            this.props
                                                .onDeleteNotificationSubcategory
                                        }
                                    />
                                </div>
                            );
                        })
                    ) : (
                            <div style={{ textAlign: "center", fontFamily: "Roboto" }}>
                                <h2>
                                    There are no categories that match the input
                            </h2>
                            </div>
                        )}
                </List>
                <CategoriesModal
                    modalName="Category creation"
                    isOpen={this.state.CategoryModalOpen}
                    closeModal={() =>
                        this.setState({ CategoryModalOpen: false })
                    }
                    onAddCategory={this.props.onAddCategory}
                    CategoryData={this.props.CategoryData}
                    TagNames={this.props.TagNames}
                    onCreateNotificationCategory={
                        this.props.onCreateNotificationCategory
                    }
                />
            </div>
        );
    }
}

export default CategoryList;
