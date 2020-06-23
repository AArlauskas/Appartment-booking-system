import React from "react";
import { Formik, useField } from "formik";
import ButtonBlock from "../../UnifiedModal/ButtonBlock";
import DefaultTextField from "../../Core-Components/DefaultTextField";
import DefaultMultiSelect from "../../Core-Components/DefaultMultiSelect/DefaultMultiSelect";

const TagsCreateEditForm = React.forwardRef((props, ref) => {
    const existingCategories = props.existingCategories;
    const existingTags = props.existingTags;
    const edit = props.tag;
    let selectedCategories = [];

    const existingCategoriesToArray = () => {
        let categoryArray = [];

        existingCategories.forEach((category) => {
            categoryArray.push(category);
        });
        return categoryArray;
    };

    const setValidation = (values) => {
        const errors = {};
        if (!values.tag) {
            errors.tag = <div className={"errStyle"}>Required!</div>;
        } else if (edit && values.tag !== edit.name) {
            existingTags.forEach((existingTag) => {
                if (values.tag === existingTag.name) {
                    errors.tag = (
                        <div className={"errStyle"}>
                            {values.tag} already exists!
                        </div>
                    );
                }
            });
        } else if (!edit) {
            existingTags.forEach((existingTag) => {
                if (values.tag === existingTag.name) {
                    errors.tag = (
                        <div className={"errStyle"}>
                            {values.tag} already exists!
                        </div>
                    );
                }
            });
        }
        return errors;
    };

    const initialiseValues = () => {
        if (edit) {
            if (edit.categoryTags !== undefined) {
                selectedCategories = [];
                edit.categoryTags.forEach((category) =>
                    selectedCategories.push(category.category.name)
                );
            }
            return {
                tag: edit.name,
                selectedCategories: selectedCategories,
                id: edit.id,
            };
        } else {
            return {
                tag: "",
                selectedCategories: "",
                id: "",
            };
        }
    };

    const InputField = ({ label, ...props }) => {
        const [field] = useField(props);
        return (
            <>
                <DefaultTextField
                    {...field}
                    {...props}
                    label={"Name"}
                    isRequired={true}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    maxLength={20}
                />
            </>
        );
    };

    return (
        <div>
            {console.log(props)}
            <Formik
                initialValues={initialiseValues()}
                validateOnChange={true}
                validate={setValidation}
                onSubmit={(values) => {
                    if (edit) {
                        props.EditTag(values);
                        props.onEditTagNotification();
                    } else {
                        props.CreateTag(values);
                        props.onCreateTagNotification();
                    }
                    props.closeForm();
                }}
            >
                {(formik) => (
                    <div>
                        <form
                            className="tags-create-edit-modal-form"
                            onSubmit={formik.handleSubmit}
                        >
                            <InputField
                                name="tag"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.tag ? (
                                <div>{formik.errors.tag}</div>
                            ) : null}
                            <div className="tag-create-edit-modal-multiselect">
                                <DefaultMultiSelect
                                    selectionsCount={10}
                                    defaultValue={selectedCategories}
                                    onClose={formik.handleBlur}
                                    label="Select category"
                                    options={existingCategoriesToArray()}
                                    onChange={(value, type) => {
                                        formik.values.selectedCategories = value;
                                        formik.validateForm();
                                    }}
                                    id="categories_select"
                                    name="categories_select"
                                />
                            </div>

                            <ButtonBlock
                                onCancel={() => {
                                    props.onClose();
                                    formik.resetForm();
                                }}
                                saveType="submit"
                                cancelType="button"
                            />
                        </form>
                    </div>
                )}
            </Formik>
        </div>
    );
});
export default TagsCreateEditForm;
