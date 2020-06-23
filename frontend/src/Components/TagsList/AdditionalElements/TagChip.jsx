import * as React from "react";
import Chip from "@material-ui/core/Chip"

const TagChip = (props) => (
    <Chip label={props.label}  edge="start" clickable={false} />
)

export default TagChip;