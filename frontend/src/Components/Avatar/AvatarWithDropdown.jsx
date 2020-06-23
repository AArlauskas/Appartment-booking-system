import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Tooltip } from "@material-ui/core";
import "./AvatarWithDropdown.scss";

class AvatarWithDropdown extends Component {
    state = {};
    render() {
        return (
            <div>
                <Tooltip
                    interactive
                    arrow
                    title={
                        <div className="AvatarWithDropdown">
                            {window.localStorage.getItem("role")}
                            <br />
                            {window.localStorage.getItem("name")}
                            <br />
                            <a
                                className="LogoutLink"
                                href="https://login.windows.net/6077af2e-bfcc-47c1-be3c-915988b695c8/oauth2/logout?post_logout_redirect_uri=http://localhost:10001/"
                                onClick={() => window.localStorage.clear()}
                            >
                                Logout
                            </a>
                        </div>
                    }
                >
                    <Avatar
                        className="AvatarToken"
                        style={{
                            backgroundColor: "rgb(235, 64, 32)",
                            color: "white",
                        }}
                    >
                        {window.localStorage.getItem("name")[0]}
                    </Avatar>
                </Tooltip>
            </div>
        );
    }
}

export default AvatarWithDropdown;
