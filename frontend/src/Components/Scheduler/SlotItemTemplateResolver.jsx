import React, { Component } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import "./SlotItemTemplateResolver.scss"

class SlotItemTemplateResolver extends Component {
  render() {
    let indents = [];
    for (let i = 0; i < this.props.slot.indent; i++) {
      indents.push(<span key={`es${i}`} className="expander-space"></span>);
    }
    let indent = (
      <span
        key={`es${this.props.slot.indent}`}
        className="expander-space"
      />
    );
    if (this.props.slot.hasChildren) {
      indent = this.props.slot.expanded ? (
        <ExpandMoreIcon

          key={this.props.slot.slotId}
          className="expand-icon"
          fontSize="small"
          onClick={() => {
            this.props.toggleExpandFunc(
              this.props.schedulerData,
              this.props.slot.slotId
            )
          }
          }
        />
      ) : (
          <ExpandLessIcon
            key={this.props.slot.slotId}
            className="expand-less"
            fontSize="small"
            onClick={() => {
              this.props.toggleExpandFunc(
                this.props.schedulerData,
                this.props.slot.slotId
              )
            }
            }
          />
        );
    }
    indents.push(indent);
    let slotItem = (
      <div className={
        this.props.slot.hasChildren
          ? "parent-slot"
          : "child-slot"
      } >
        <div
          title={this.props.slot.slotName}
          className="overflow-text header2-text"
        >
          <div className="slot-cell">
            <div>
              <StopRoundedIcon style={
                this.props.slot.hasChildren
                  ? { display: "none" }
                  : { float: "left", color: this.props.getSlotColor(this.props.schedulerData, this.props.slot) }
              } />
            </div>
            <div style={
              this.props.slot.hasChildren
                ? { display: "block" }
                : { display: "none" }}>
              {indents}
            </div>

            <div className={this.props.slot.hasChildren ? "parent-slot-text" : "child-slot-text"}>{this.props.slot.slotName}</div>
          </div>
        </div>
      </div>
    );

    return slotItem;
  }
}

export default SlotItemTemplateResolver;
