/* 
This is the Resources of the Menu tab
This section has
    - Download Neural Network
    - Download Image Database
*/

import React, {Component} from 'react'
import { Button } from '@mui/material';
import axios from 'axios';
import download from 'downloadjs'

const ImageDatabaseDownload = () => {
    axios.get("/annotations", {})
    .then (res => {
        console.log(res.data)
        download(res.data, 'annotations.txt')
        axios.delete("/delete_annotation")
    })
}


class Resources extends Component{
    render(){
        return (
            <div>
                <h1>Neural Network Weights</h1>
                <p> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <Button variant="outlined" color ="primary">
                    Export Network
                </Button>

                <h1>Open Source Image Database</h1>
                <p> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <Button variant="outlined" color = "primary" onClick = {() => {ImageDatabaseDownload()}}>
                    Export Database
                </Button>
            </div>
        )
    }
}

export default Resources;