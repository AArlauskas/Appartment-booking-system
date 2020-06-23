import React from "react";
import Button from "@material-ui/core/Button";

export default function AddCategoryButton(props) {
  return (
    <Button variant="outlined" color="primary" onClick={props.clicked}>
      Add Category
    </Button>
  );
}
