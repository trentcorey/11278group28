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
                    <h2>File Upload</h2>

                    <Cropper />
                    {/* <UploadButton />
                    <DisplayTable />
                    <Button variant="outlined" color = "warning">
                        Cancel
                    </Button>
                   
                    <Button variant="outlined" color = "primary">
                        Submit
                    </Button> */}
                </Paper>
            </div>
        )
    }
}

export default UploadItems;