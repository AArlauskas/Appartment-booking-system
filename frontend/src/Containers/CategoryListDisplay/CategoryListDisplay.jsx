import React, { Component } from "react";
import { connect } from "react-redux";
import {
    fetchCategoryData,
    fetchSubCategoryData,
    addCategory,
    editCategory,
    deleteCategory,
    addSubCategory,
    editSubCategory,
    deleteSubCategory,
    getTags,
} from "../../Actions/CategoryListActions";
import CategoryList from "../../Components/CategoryList/CategoryList";
import LoadingScreen from "../LoadingDisplay/LoadingScreen";
import Notification from "../../Components/Notification/Notification";

class CategoryListDisplay extends Component {
    state = {
        notificationOpen: false,
        notificationMessage: "",
        notificationSeverity: "",
    };
    componentDidMount() {
        this.props.fetchCategoryData();
        this.props.fetchSubCategoryData();
        this.props.getTags();
    }
    render() {
        return (
            <div>
                {this.props.CategoryData.length === 0 ||
                this.props.SubCategoryData.length === 0 ||
                this.props.TagData.length === 0 ? (
                    <LoadingScreen />
                ) : (
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
                        <CategoryList
                            CategoryData={this.props.CategoryData}
                            SubCategoryData={this.props.SubCategoryData}
                            TagNames={this.props.TagData}
                            onAddCategory={this.props.addCategory}
                            onEditCategory={this.props.editCategory}
                            onDeleteCategory={this.props.deleteCategory}
                            onAddSubCategory={this.props.addSubCategory}
                            onEditSubCategory={this.props.editSubCategory}
                            onDeleteSubCategory={this.props.deleteSubCategory}
                            onEditNotificationCategory={() =>
                                this.setState({
                                    notificationOpen: true,
                                    notificationMessage: "Category updated",
                                    notificationSeverity: "success",
                                })
                            }
                            onCreateNotificationCategory={() =>
                                this.setState({
                                    notificationOpen: true,
                                    notificationMessage: "Category created",
                                    notificationSeverity: "success",
                                })
                            }
                            onDeleteNotificationCategory={() =>
                                this.setState({
                                    notificationOpen: true,
                                    notificationMessage: "Category deleted",
                                    notificationSeverity: "error",
                                })
                            }
                            onEditNotificationSubcategory={() =>
                                this.setState({
                                    notificationOpen: true,
                                    notificationMessage: "Subcategory updated",
                                    notificationSeverity: "success",
                                })
                            }
                            onCreateNotificationSubcategory={() =>
                                this.setState({
                                    notificationOpen: true,
                                    notificationMessage: "Subcategory created",
                                    notificationSeverity: "success",
                                })
                            }
                            onDeleteNotificationSubcategory={() =>
                                this.setState({
                                    notificationOpen: true,
                                    notificationMessage: "Subcategory deleted",
                                    notificationSeverity: "error",
                                })
                            }
                        />
                    </div>
                )}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchCategoryData: () => dispatch(fetchCategoryData()),
    fetchSubCategoryData: () => dispatch(fetchSubCategoryData()),
    addCategory: (data) => dispatch(addCategory(data)),
    editCategory: (data) => dispatch(editCategory(data)),
    deleteCategory: (id) => dispatch(deleteCategory(id)),
    addSubCategory: (data) => dispatch(addSubCategory(data)),
    editSubCategory: (data) => dispatch(editSubCategory(data)),
    deleteSubCategory: (id) => dispatch(deleteSubCategory(id)),
    getTags: () => dispatch(getTags()),
});

const mapStateToProps = (state) => ({
    CategoryData: state.categoryData,
    SubCategoryData: state.subCategoryData,
    TagData: state.tagListData,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryListDisplay);
