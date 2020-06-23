import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import DefaultButton from "../Core-Components/DefaultButton";
import WarningOutlinedIcon from "@material-ui/icons/WarningOutlined";
class ConfirmDialog extends Component {
    state = {};
    render() {
        const Transition = React.forwardRef(function Transition(props, ref) {
            return <Slide direction="up" ref={ref} {...props} />;
        });
        return (
            <div>
                <Dialog
                    open={this.props.isOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.props.handleClose}
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {this.props.alertTitle !== undefined
                            ? this.props.alertTitle
                            : "Delete Item"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {this.props.text}
                        </DialogContentText>
                        {this.props.warning ? (
                            <DialogContentText id="alert-dialog-slide-description">
                                <WarningOutlinedIcon
                                    style={{ color: "#CE2B27" }}
                                    fontSize="large"
                                />
                                This sub-category contains event(s). If you
                                decide to delete it, all of the events will also
                                be deleted!
                            </DialogContentText>
                        ) : null}
                    </DialogContent>
                    <DialogActions>
                        <DefaultButton
                            purpose="save"
                            label="Cancel"
                            type={this.props.cancel}
                            onClick={this.props.handleClose}
                        />
                        <DefaultButton
                            purpose="cancel"
                            label="Yes"
                            type={this.props.saveType}
                            onClick={this.props.handleAgree}
                        />
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default ConfirmDialog;
