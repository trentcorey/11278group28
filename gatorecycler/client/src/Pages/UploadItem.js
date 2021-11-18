import React, {Component} from "react";
import {Paper } from "@mui/material";
import Cropper from "../Components/Cropper";

class UploadItems extends Component{
    render(){
        return(
            <div>
                <Paper 
                    //variant = "outlined"
                    elevation = {2}
                >
                    <h2>Image Upload</h2>

                    <Cropper />
                </Paper>
            </div>
        )
    }
}

export default UploadItems;