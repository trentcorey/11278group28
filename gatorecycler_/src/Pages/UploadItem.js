import React, {Component} from "react";
import {InputLabel, Button } from "@mui/material";
class UploadItems extends Component{
    render(){
        return(
            <div>
                <h2>File Upload</h2>

                {/* Make it a component,
                    Also, see if you can make the file name come out in selected.
                */}
                <input
                    accept="image/*"
                    // className={classes.input}
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                />
                <InputLabel htmlFor="raised-button-file">
                    <Button variant="raised" component="span">
                        Upload
                    </Button>
                </InputLabel> 

                <h5>Selected Files: </h5>

                <Button variant="raised" component="span">
                    Cancel
                </Button>

                <Button variant="raised" component="span">
                    Submit
                </Button>
            </div>
        )
    }
}

export default UploadItems;