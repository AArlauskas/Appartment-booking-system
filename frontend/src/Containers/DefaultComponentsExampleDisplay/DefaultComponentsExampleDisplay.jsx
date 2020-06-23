import React, { Component } from "react";
import DefaultTextField from "../../Components/Core-Components/DefaultTextField";
import DefaultMultiSelect from "../../Components/Core-Components/DefaultMultiSelect";
import DefaultAutoComplete from "../../Components/Core-Components/DefaultAutoComplete";
import DefaultTextArea from "../../Components/Core-Components/DefaultTextArea/DefaultTextArea";
import DefaultColorSelect from "../../Components/Core-Components/DefaultColorSelect";
import DefaultDraftApprovedButton from "../../Components/Core-Components/DefaultDraftApprovedButton";

import "./DefaultComponentsExampleDisplay.scss";
import DefaultButton from "../../Components/Core-Components/DefaultButton/DefaultButton";
import DefaultDateSelect from "../../Components/Core-Components/DefaultDateSelect/DefaultDateSelect";
class DefaultComponentsExampleDisplay extends Component {
  state = {};

  render() {
    const names = [
      { name: "Tag 1", value: "tag1" },
      { name: "Tag 2", value: "tag2" },
      { name: "Tag 3", value: "tag3" },
      { name: "Tag 4", value: "tag4" },
      { name: "Tag 5", value: "tag5" },
      { name: "Tag 6", value: "tag6" },
      { name: "Tag 7", value: "tag7" },
      { name: "Tag 8", value: "tag8" },
      { name: "Tag 9", value: "tag9" },
      { name: "Tag 10", value: "tag10" },
      { name: "Tag 11", value: "tag11" },
    ];

    const MyData = [
      {
        CategoryName: "New York",
        SubCategories: ["House Downtwown", "House Uptown"],
      },
      {
        CategoryName: "Chicago",
        SubCategories: ["Villa Downtwown"],
      },
    ];

    const colors = [
      {
        Name: "Candy Apple Red",
        Value: "#FF0880",
      },
      {
        Name: "Capri",
        Value: "#00BFFF",
      },
      {
        Name: "Chartreuse",
        Value: "#7FFF00",
      },
      {
        Name: "Crimson",
        Value: "#DC143C",
      },
    ];

    return (
      <div>
        <h1>Example display of default components</h1>
        <div className="exampleComponent">
          <DefaultDateSelect label="Date Selector" value="2020-01-01" />
        </div>
        <div className="exampleComponent">
          <DefaultTextField
            label="Text Filed"
            onChange={(e) => console.log(e.target.value)}
            maxLength="10"
            isRequired={true}
          />
        </div>
        <div className="exampleComponent">
          <DefaultMultiSelect
            options={names}
            selectionsCount={10}
            label="Multi Select"
          />
        </div>
        <div className="exampleComponent">
          <DefaultAutoComplete
            isRequired={true}
            options={MyData}
            label="Select"
          />
        </div>
        <div className="exampleComponent">
          <DefaultTextArea
            isRequired={true}
            maxLength={150}
            label="Text Area"
          />
        </div>
        <div className="exampleComponent">
          <DefaultColorSelect options={colors} label="Color picker" />
        </div>
        <div className="exampleComponent">
          <DefaultDateSelect label="Date picker" />
        </div>
        <div className="exampleComponent">
          <DefaultDraftApprovedButton />
        </div>
        <div className="exampleComponent">
          <DefaultButton
            label="Save button"
            onClick={() => console.log("form saved")}
            type="submit"
          />
        </div>
        <div className="exampleComponent">
          <DefaultButton
            purpose="cancel"
            label="Cancel button"
            onClick={() => console.log("form canceled")}
          />
        </div>
      </div>
    );
  }
}

export default DefaultComponentsExampleDisplay;
