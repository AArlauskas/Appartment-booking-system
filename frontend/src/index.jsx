import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "App";
import * as AuthenticationContext from "adal-vanilla/lib/adal";

window.adalConfig = {
    clientId: "b3cb31f4-43fb-4dcf-b6ff-f632d6d1cb99",
    tenant: "6077af2e-bfcc-47c1-be3c-915988b695c8",
    cacheLocation: "localStorage",
    popUp: false,
};

var authContext = new AuthenticationContext(window.adalConfig);

if (authContext.isCallback(window.location.hash)) {
    // this handles the redirect back from the AAD sign-in page.
    // it extracts the hash and processes the AAD token (or error) received.
    authContext.handleWindowCallback();
}

function startApplication(user, token) {
    // render the main application
    ReactDOM.render(<App />, document.getElementById("index"));
}

var user = authContext.getCachedUser();

if (user) {
    let clientId = window.adalConfig.clientId;
    authContext.acquireToken(clientId, function (errorDesc, token, error) {
        if (error) {
            // acquire token failure
            // In this case the callback passed in the Authentication request constructor will be called.
            authContext.acquireTokenRedirect(clientId, null, null);
        } else {
            window.localStorage.setItem("name", user.profile.name);
            window.localStorage.setItem("role", user.profile.roles[0]);
            //acquired token successfully
            startApplication(user, token);
        }
    });
} else {
    // Initiate login
    authContext.login();
}
