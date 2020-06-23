import * as React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./ModalScheduledItems.scss";
import subCats from "./DataSubCategory"

const MSIAutoComplete = (props) => {
    const onChange = (event, value) => {
        props.form.values.resourceId = value.selected; //gotta finish dis up
      props.form.validateForm();
    };
    return (
      <Autocomplete
        name="subcatlist"
        multiple
        className="rootSubCats"
        id="tags-outlined"
        options={subCats} //All good
        onChange={onChange}
        getOptionLabel={option => option.name}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            label="*Sub-category"
            placeholder=""
          />
        )}
      />
    )
}
export default MSIAutoComplete;