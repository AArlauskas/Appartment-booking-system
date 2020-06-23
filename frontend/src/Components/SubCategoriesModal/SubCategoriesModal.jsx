import * as React from "react";
import MyColors from "./MyColors";
import { useFormik } from "formik";
import "./SubCategoriesModal.scss";
import DefaultTextField from "../Core-Components/DefaultTextField";
import DefaultTextArea from "../Core-Components/DefaultTextArea";
import DefaultColorSelect from "../Core-Components/DefaultColorSelect";
import DefaultAutoComplete from "../Core-Components/DefaultAutoComplete/DefaultAutoComplete";
import UnifiedModal from "../UnifiedModal/index.js";
import ButtonBlock from "../UnifiedModal/ButtonBlock";

const validate = (values) => {
    const errors = {};
    if (!values.name_for_category) {
        errors.name_for_category = <div className={"errStyle"}>Required!</div>;
    }

    if (values.category_selected === "") {
        errors.category_selected = (
            <font className={"errStyle"}>Category must be selected</font>
        );
    }

    if (values.color_selected === "") {
        errors.color_selected = (
            <div className={"errStyle"}>Color must be selected</div>
        );
    }
    return errors;
};

const SubCategoriesModal = (props) => {
    const isCustomColor = () => {
        if (props.color === undefined) {
            return false;
        }
        return !MyColors.some((color) => color.Value === props.color);
    };

    const handleClose = () => {
        formik.resetForm();
        props.closeModal();
    };

    const cancelClicked = () => {
        props.closeModal();
        formik.resetForm();
    };

    const formik = useFormik({
        initialValues: {
            name_for_category: props.name === undefined ? "" : props.name,
            description_for_category:
                props.description === undefined ? "" : props.description,
            color_selected: props.color === undefined ? "" : props.color,
            category_selected:
                props.parentId === undefined
                    ? ""
                    : props.CategoryData.find(
                          (category) => category.id === props.parentId
                      ).name,
        },
        validate,
        onSubmit: (values) => {
            let data = {
                id: props.id,
                name: values.name_for_category,
                description: values.description_for_category,
                color: values.color_selected,
                parentId: props.CategoryData.find(
                    (category) => category.name === values.category_selected
                ).id,
            };
            if (props.name === undefined) {
                props.onAddSubCategory(data);
                props.onCreateNotificationSubcategory();
            } else {
                props.onEditSubCategory(data);
                props.onEditNotificationSubcategory();
            }

            handleClose();
        },
    });

    const entryForName = () => {
        return (
            <div>
                <DefaultTextField
                    defaultValue={props.name}
                    label="Name"
                    name="name_for_category"
                    isRequired={true}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    maxLength={50}
                />
                {formik.errors.name_for_category ? (
                    <div>{formik.errors.name_for_category}</div>
                ) : null}
            </div>
        );
    };

    const entryForDescription = () => {
        return (
            <div className="TextAreaBlock">
                <DefaultTextArea
                    defaultValue={props.description}
                    name="description_for_category"
                    label="Description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    maxLength={120}
                />
            </div>
        );
    };

    const entryForColorPicker = () => {
        return (
            <div className="ColorSelectBlock">
                <DefaultColorSelect
                    isCustomColor={isCustomColor()}
                    defaultValue={props.color}
                    name="color_selected"
                    label="*Select color"
                    onChange={(e) => formik.setFieldValue("color_selected", e)}
                    onBlur={formik.handleBlur}
                    options={MyColors}
                />
                {formik.errors.color_selected ? (
                    <div>{formik.errors.color_selected}</div>
                ) : null}
            </div>
        );
    };

    const entryForCategorySelect = () => {
        return (
            <div className="CategorySelectBlock">
                <DefaultAutoComplete
                    defaultValue={props.CategoryData.find(
                        (category) => category.id === props.parentId
                    )}
                    name="category_selected"
                    options={props.CategoryData}
                    getOptionLabel={(option) => option.name}
                    isRequired={true}
                    label="Select category"
                    onSelect={(e) =>
                        formik.setFieldValue(
                            "category_selected",
                            e.target.value
                        )
                    }
                />
                {formik.errors.category_selected ? (
                    <div>{formik.errors.category_selected}</div>
                ) : null}
            </div>
        );
    };

    return (
        <div>
            <UnifiedModal
                open={props.isOpen === undefined ? false : props.isOpen}
                title={props.modalName}
            >
                <form onSubmit={formik.handleSubmit}>
                    {entryForName()}
                    {entryForDescription()}
                    {entryForColorPicker()}
                    {entryForCategorySelect()}
                    <ButtonBlock
                        onCancel={cancelClicked}
                        saveType="submit"
                        cancelType="button"
                    />
                </form>
            </UnifiedModal>
        </div>
    );
};

export default SubCategoriesModal;
