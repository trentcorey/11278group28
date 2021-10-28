import React, {Component, useState} from "react";
import {InputLabel, Button } from '@mui/material';

class UploadButton extends Component {

    render(){
        return (
            <div>
                <input
                        accept="image/*"
                        // className={classes.input}
                        style={{ display: 'none' }}
                        id="upload-button"
                        multiple
                        type="file"
                        onChange={this.handleFileSelect}
                    />
                    <InputLabel htmlFor="upload-button">
                        <Button variant="raised" component="span">
                            Upload
                        </Button>
                    </InputLabel> 

                    <h5>Selected Files: </h5>
                    {/* <p>{handleFileSelect.name}</p> */}
            </div>
        )
    }
}

export default UploadButton
