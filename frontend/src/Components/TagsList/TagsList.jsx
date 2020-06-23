import * as React from "react";

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@material-ui/core";
import IconButtons from "./AdditionalElements/IconButtons.jsx";
import TagChip from "./AdditionalElements/TagChip.jsx";
import "./TagsList.scss";
import TagsCreateEditModal from "../TagsCreateEditModal";
import Notification from "../Notification/Notification.jsx";

let columns = [];

const TagsList = (props) => {
    props.isReadOnly //Won't show action label if true
        ? (columns = [
            { id: "tag", label: "Tag", align: "left", width: "30%" },
            {
                id: "categories",
                label: "Categories",
                align: "left",
                width: "70%",
            },
        ])
        : (columns = [
            { id: "tag", label: "Tag", align: "left", width: "30%" },
            {
                id: "categories",
                label: "Categories",
                align: "left",
                width: "60%",
            },
            { id: "actions", label: "Actions", align: "left", width: "5%" },
        ]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [filterInput, setFilterInput] = React.useState("");
    const [NotificationOpen, setNotificationOpen] = React.useState(false);
    const [NotificationMessage, setNotificationMessage] = React.useState("");
    const [notificationSeverity, setNotificationSeverity] = React.useState("");

    const filteredTags =
        filterInput === ""
            ? props.existingTags
            : props.existingTags.filter((tag) =>
                tag.name.toLowerCase().startsWith(filterInput.toLowerCase())
            );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getNamesFromTag = (Tag) => {
        let names = [];
        Tag.categoryTags.forEach((category) =>
            names.push(category.category.name)
        );
        return names.join(", ");
    };

    return (
        <div className="root">
            <Notification
                open={NotificationOpen}
                onClose={() => {
                    setNotificationOpen(false);
                    setNotificationMessage("");
                    setNotificationSeverity("");
                }}
                message={NotificationMessage}
                severity={notificationSeverity}
            />
            {window.localStorage.getItem("role") === "Admin" ? <TagsCreateEditModal
                title="Create tag"
                showEditIcon={0}
                existingTags={props.existingTags}
                existingCategories={props.existingCategories}
                CreateTag={props.CreateTag}
                EditTag={props.EditTag}
                checkTag={props.checkTag}
                onChangedFilterInput={(e) => setFilterInput(e.target.value)}
                tag={null}
                onCreateTagNotification={() => {
                    setNotificationOpen(true);
                    setNotificationMessage("Tag created");
                    setNotificationSeverity("success");
                }} /> : null}
            {filteredTags.length !== 0 ? (
                <Paper>
                    <TableContainer className="container">
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            width={column.width}
                                            max-height={column.height}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredTags
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((Tag) => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={Tag.id}
                                            >
                                                <TableCell>
                                                    <div className={"cell-tag"}>
                                                        <TagChip
                                                            label={Tag.name}
                                                        />
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <div
                                                        className={
                                                            "cell-categories"
                                                        }
                                                    >
                                                        {getNamesFromTag(Tag)}
                                                    </div>
                                                </TableCell>

                                                {props.isReadOnly ? null : ( //Won't show action buttons label if true
                                                    <TableCell>
                                                        {window.localStorage.getItem(
                                                            "role"
                                                        ) === "Admin" ? (
                                                                <div
                                                                    className={
                                                                        "cell-actions"
                                                                    }
                                                                    align="center"
                                                                >
                                                                    <IconButtons
                                                                        page={page}
                                                                        emptyPage={
                                                                            props
                                                                                .existingTags
                                                                                .length <=
                                                                            page *
                                                                            rowsPerPage +
                                                                            1
                                                                        }
                                                                        onChangePage={
                                                                            setPage
                                                                        }
                                                                        existingTags={
                                                                            props.existingTags
                                                                        }
                                                                        CreateTag={
                                                                            props.CreateTag
                                                                        }
                                                                        EditTag={
                                                                            props.EditTag
                                                                        }
                                                                        DeleteTag={
                                                                            props.DeleteTag
                                                                        }
                                                                        checkTag={
                                                                            props.checkTag
                                                                        }
                                                                        existingCategories={
                                                                            props.existingCategories
                                                                        }
                                                                        onDeleteTagNotification={() => {
                                                                            setNotificationOpen(
                                                                                true
                                                                            );
                                                                            setNotificationMessage(
                                                                                "Tag deleted"
                                                                            );
                                                                            setNotificationSeverity(
                                                                                "error"
                                                                            );
                                                                        }}
                                                                        onCreateTagNotification={() => {
                                                                            setNotificationOpen(
                                                                                true
                                                                            );
                                                                            setNotificationMessage(
                                                                                "Tag created"
                                                                            );
                                                                            setNotificationSeverity(
                                                                                "success"
                                                                            );
                                                                        }}
                                                                        onEditTagNotification={() => {
                                                                            setNotificationOpen(
                                                                                true
                                                                            );
                                                                            setNotificationMessage(
                                                                                "Tag updated"
                                                                            );
                                                                            setNotificationSeverity(
                                                                                "success"
                                                                            );
                                                                        }}
                                                                        tag={Tag}
                                                                    />
                                                                </div>
                                                            ) : null}
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={props.existingTags.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            ) : (
                    <div style={{ textAlign: "center", fontFamily: "roboto" }}>
                        <h2>There are no tags that match the input</h2>{" "}
                    </div>
                )}
        </div>
    );
};

export default TagsList;
