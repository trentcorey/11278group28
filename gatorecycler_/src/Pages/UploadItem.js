import React, {Component} from "react";
import {Button, Paper } from "@mui/material";
import UploadButton from "../Components/UploadButton";

class UploadItems extends Component{
    render(){
        return(
            <div>
                <Paper 
                    //variant = "outlined"
                    elevation = {8}
                >
                    <h2>File Upload</h2>

                    <UploadButton />

                    <Button variant="raised" component="span">
                        Cancel
                    </Button>
                    <Button variant="raised" component="span">
                        Submit
                    </Button>
                </Paper>
            </div>
        )
    }
}

export default UploadItems;