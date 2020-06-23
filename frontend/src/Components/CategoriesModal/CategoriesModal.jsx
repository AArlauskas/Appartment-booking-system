import * as React from "react";
import FormControl from "@material-ui/core/FormControl";
import UnifiedModal from "../UnifiedModal/index.js";
import ButtonBlock from "../UnifiedModal/ButtonBlock";
import { useFormik } from "formik";
import DefaultTextField from "../Core-Components/DefaultTextField";

import "./CategoriesModal.scss";
import DefaultTextArea from "../Core-Components/DefaultTextArea/index.js";
import DefaultMultiSelect from "../Core-Components/DefaultMultiSelect/DefaultMultiSelect.jsx";

const CategoriesModal = (props) => {
    const validate = (values) => {
        const errors = {};
        if (!values.categoryName) {
            errors.categoryName = <div className="errStyle">Required!</div>;
        }
        if (values.selectedTags.length > 10) {
            errors.selectedTags = (
                <div className="errStyle">Can't select more than 10!</div>
            );
        }
        if (values.selectedTags.length === 0) {
            errors.selectedTags = (
                <div className="errStyle">
                    At least one tag must be selected!
                </div>
            );
        }
        if (
            props.CategoryData.some(
                (data) =>
                    data.name === values.categoryName &&
                    props.name !== values.categoryName
            )
        ) {
            errors.categoryName = (
                <div className="errStyle">
                    Category with this name already exists!
                </div>
            );
        }
        return errors;
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
            categoryName: props.name === undefined ? "" : props.name,
            categoryDescription:
                props.description === undefined ? "" : props.description,
            selectedTags: props.tags === undefined ? [] : props.tags,
        },
        validate,
        onSubmit: (values) => {
            let data = {
                id: props.id,
                name: values.categoryName,
                description: values.categoryDescription,
                tags: values.selectedTags,
            };
            if (props.name === undefined) {
                props.onAddCategory(data);
                props.onCreateNotificationCategory();
            } else {
                props.onEditCategory(data);
                props.onEditNotificationCategory();
            }

            handleClose();
        },
    });

    return (
        <div>
            <UnifiedModal
                open={props.isOpen === undefined ? false : props.isOpen}
                onClose={handleClose}
                title={props.modalName}
            >
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="nameField">
                            <DefaultTextField
                                className="categoryName"
                                id="categoryName"
                                defaultValue={formik.values.categoryName}
                                label={"Name"}
                                isRequired={true}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                maxLength={50}
                            />
                        </div>
                        {formik.errors.categoryName ? (
                            <div>{formik.errors.categoryName}</div>
                        ) : null}
                        <div className="descriptionField">
                            <DefaultTextArea
                                id="categoryDescription"
                                name="categoryDescription"
                                defaultValue={formik.values.categoryDescription}
                                label="Description"
                                isRequired={false}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                maxLength={120}
                            />
                        </div>
                        <FormControl className="select"></FormControl>
                        <DefaultMultiSelect
                            selectionsCount={10}
                            options={props.TagNames}
                            defaultValue={props.tags}
                            onChange={(value, type) => {
                                formik.values.selectedTags = value;
                                formik.validateForm();
                            }}
                            onClose={formik.handleBlur}
                            label="*Tags"
                            isRequired={true}
                        />
                        {formik.errors.selectedTags ? (
                            <div>{formik.errors.selectedTags}</div>
                        ) : null}
                        <ButtonBlock
                            onCancel={cancelClicked}
                            saveType="submit"
                            cancelType="button"
                        />
                    </form>
                </div>
            </UnifiedModal>
        </div>
    );
};

export default CategoriesModal;
