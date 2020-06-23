import * as React from "react";
import {List, ListItemText, ListItem, Button } from "@material-ui/core"

import "./ExampleList.scss";

const ExampleList = (props) => {
        const {options, onCreate, onDelete} = props;
        return (
            <React.Fragment>
                <Button variant="contained" onClick={onCreate}>Create</Button>
                <Button variant="contained" onClick={onDelete}>Delete</Button>
                <List className="my-list" >
                    {options.map((option) => {
                        return (
                            <ListItem divider key={option.id}> 
                                <ListItemText primary={option.text} />
                            </ListItem>
                        )
                    })}
                </List> 
            </React.Fragment>
              
        );
    
};

export default ExampleList;
