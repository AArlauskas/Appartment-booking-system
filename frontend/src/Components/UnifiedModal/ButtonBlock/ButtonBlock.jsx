import * as React from "react";
import DefaultButton from "../../Core-Components/DefaultButton";
import "./ButtonBlock.scss";

const ButtonBlock = (props) => {

    return (
        <div className="buttonBlock">
            <div className="innerButton">
                <DefaultButton
                    purpose="save"
                    label="Save"
                    type={props.saveType}
                    onClick={props.onSave}
                />
            </div>
            <div className="innerButton">
                <DefaultButton
                    purpose="cancel"
                    label="Cancel"
                    type={props.cancelType}
                    onClick={props.onCancel}
                />
            </div>
        </div>

    );
}

export default ButtonBlock