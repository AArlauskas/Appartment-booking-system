import * as React from "react";
import { FormControlLabel, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField as formikTextField, RadioGroup } from "formik-material-ui";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import * as Yup from "yup";
import "./ModalScheduledItems.scss";
import MSIRedRadio from "./MSIRedRadio";
import UnifiedModal from "../UnifiedModal/index.js";
import ButtonBlock from "../UnifiedModal/ButtonBlock";
import Autocomplete from "@material-ui/lab/Autocomplete";

const ModalScheduledItems = (props) => {
    const [dateStart, handleStartDateChange] = React.useState(
        props.event === undefined ? new Date() : props.event.start
    );
    const [dateEnd, handleEndDateChange] = React.useState(
        props.event === undefined ? new Date() : props.event.end
    );
    const [Category, setValue] = React.useState(
        props.event === undefined
            ? null
            : { id: props.event.resourceId, name: props.event.resourceName }
    );
    const [isApproved, setApproved] = React.useState(
        props.event === undefined ? false : props.event.isApproved
    );
    const [isMultiSelectValid, setValid] = React.useState(Category !== null);

    const ValidationSchema = Yup.object().shape({
        dateStart: Yup.date().required(),
        dateEnd: Yup.date().when(
            "dateStart",
            (dateStart, ValidationSchema) =>
                dateStart && ValidationSchema.min(dateStart)
        ),
        name: Yup.string()
            .min(2, "Must be longer than 2 characters")
            .max(50, "Name too long")
            .required("Required"),
        activity: Yup.boolean().required("Required"),
    });
    return (
        <UnifiedModal
            open={props.open === undefined ? false : props.open}
            title="Room scheduling"
            className="scheduledModal"
        >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Formik
                    initialValues={{
                        id: props.event === undefined ? null : props.event.id,
                        dateStart:
                            props.event === undefined
                                ? new Date()
                                : props.event.start,
                        dateEnd:
                            props.event === undefined
                                ? new Date()
                                : props.event.end,
                        name:
                            props.event === undefined ? "" : props.event.title,
                        activity:
                            props.event === undefined
                                ? false
                                : props.event.isApproved
                                ? true
                                : false,
                        //resource: props.event ===undefined ? {} : {id: props.event.resourceId, name: props.event.resourceName}, //was trying to implement validation with this
                        resourceId:
                            props.event === undefined
                                ? 123
                                : props.event.resourceId,
                        resourceName:
                            props.event === undefined
                                ? ""
                                : props.event.resourceName,
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        let data = {
                            id: values.id,
                            start: dateStart,
                            end: dateEnd,
                            resourceId: Category.id,
                            resourceName: Category.name,
                            title: values.name,
                            isApproved: isApproved,
                        };
                        if (props.event === undefined) {
                            props.handleCreate(data);
                            props.onCreateNotification();
                        } else if (props.event.title === "") {
                            props.handleCreate(data);
                            props.onCreateNotification();
                        } else {
                            props.handleEdit(data);
                            props.onEditNotification();
                        }
                        setSubmitting(false);
                        props.handleClose();
                    }}
                >
                    {({ submitForm, isSubmitting, isValid }) => (
                        <div>
                            <Form>
                                <div className="textContainers">
                                    <Field
                                        component={formikTextField}
                                        id="standard-basic"
                                        label="*Name"
                                        name="name"
                                        className="nameTextField"
                                    />
                                </div>
                                <section>
                                    <div className="statusLabel">*Status:</div>
                                    <Field
                                        component={RadioGroup}
                                        name="activity"
                                        color="default"
                                    >
                                        {" "}
                                        {/*Formik.activity doesnt have a value no idea why it works a bit */}
                                        <FormControlLabel
                                            value={false}
                                            control={
                                                <MSIRedRadio
                                                    disabled={isSubmitting}
                                                />
                                            }
                                            label="Draft"
                                            checked={!isApproved}
                                            onChange={(event, newValue) => {
                                                setApproved(!newValue);
                                            }}
                                            disabled={isSubmitting}
                                        />
                                        <FormControlLabel
                                            value={true}
                                            control={
                                                <MSIRedRadio
                                                    disabled={isSubmitting}
                                                />
                                            }
                                            label="Approved"
                                            color="#CE2B27"
                                            checked={isApproved}
                                            onChange={(event, newValue) => {
                                                setApproved(newValue);
                                            }}
                                            disabled={isSubmitting}
                                        />
                                        {submitForm.activity &&
                                        isSubmitting.activity ? (
                                            <div>{submitForm.activity}</div>
                                        ) : null}
                                        <ErrorMessage name="activity">
                                            {(msg) => (
                                                <div className="errStyle">
                                                    {msg}
                                                </div>
                                            )}
                                        </ErrorMessage>
                                    </Field>
                                </section>
                                <aside>
                                    <div className="dateContainer">
                                        <Field
                                            component={DatePicker}
                                            value={dateStart}
                                            onChange={handleStartDateChange}
                                            animateYearScrolling
                                            maxDate={dateEnd}
                                            format={"yyyy/MM/dd"}
                                            name="dateStart"
                                            id="dateStart"
                                            label="Start date"
                                        />
                                        {submitForm.dateStart &&
                                        isSubmitting.dateStart ? (
                                            <div>{submitForm.dateStart}</div>
                                        ) : null}
                                        <ErrorMessage name="dateStart">
                                            {(msg) => (
                                                <div className="errStyle">
                                                    {msg}
                                                </div>
                                            )}
                                        </ErrorMessage>
                                    </div>
                                    <div className="dateContainer">
                                        <Field
                                            component={DatePicker}
                                            value={dateEnd}
                                            onChange={handleEndDateChange}
                                            animateYearScrolling
                                            format={"yyyy/MM/dd"}
                                            minDate={dateStart}
                                            name="dateEnd"
                                            id="dateEnd"
                                            label="End date"
                                        />
                                        {submitForm.dateEnd &&
                                        isSubmitting.dateEnd ? (
                                            <div>{submitForm.dateEnd}</div>
                                        ) : null}
                                        <ErrorMessage name="dateEnd">
                                            {(msg) => (
                                                <div className="errStyle">
                                                    {msg}
                                                </div>
                                            )}
                                        </ErrorMessage>
                                    </div>
                                </aside>
                                <div className="subCatsContainer">
                                    <Autocomplete
                                        name="resource"
                                        options={props.categories}
                                        getOptionLabel={(option) => option.name}
                                        getOptionSelected={(option) =>
                                            option.name
                                        }
                                        value={Category}
                                        onChange={(event, newValue) => {
                                            if (newValue === null)
                                                setValid(false);
                                            else setValid(true);
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                label="*Sub-category"
                                            />
                                        )}
                                    />
                                    {isMultiSelectValid === false ? (
                                        <p className="errStyle">Required!</p>
                                    ) : null}
                                </div>
                            </Form>
                            <ButtonBlock
                                onSave={() => {
                                    if (isMultiSelectValid) {
                                        submitForm.apply();
                                    }
                                }}
                                onCancel={() => {
                                    props.handleClose();
                                }}
                            />
                        </div>
                    )}
                </Formik>
            </MuiPickersUtilsProvider>
        </UnifiedModal>
    );
};
export default ModalScheduledItems;
