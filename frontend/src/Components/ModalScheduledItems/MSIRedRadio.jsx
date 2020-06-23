import * as React from "react";
import {
  withStyles,
  Radio,
} from "@material-ui/core";

const RedRadio = withStyles({
    root: {
      color: "#757575",
      "&$checked": {
        color: "#CE2B27",
      },
    },
    checked: {},
  })(props => <Radio color="default" {...props} />);
  
  export default RedRadio