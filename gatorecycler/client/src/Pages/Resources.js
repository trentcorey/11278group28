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
    axios.get("/annotations", {responseType: 'arraybuffer'})
    .then (res => {
        console.log(res.data)
        download(res.data, 'annotations.txt')
        axios.delete("/delete_annotation")
    })
    
    axios.get("/image_zip_download", {responseType: 'arraybuffer'})
    .then (res => {
        console.log("Archive downloaded");
        download(res.data, 'image_set.zip');
    })
}

const WeightsDownload = () => {
    axios.get("/get_weights", {})
    .then (res => {
        console.log("Downloading weights")
        console.log(res.data);
        window.open(res.data);
    })
}


class Resources extends Component{
    render(){
        return (
            <div>
                <h1>Neural Network Weights</h1>
                <p> 
                    The neural networks stored are for the YoloV3 neural network architecture. These weights result from
                    training a neural network and can be directly imported to other similar neural networks for use in
                    detection.
                </p>
                <Button variant="outlined" color ="primary" onClick = {() => {WeightsDownload()}}>
                    Download Network
                </Button>

                <h1>Open Source Image Database</h1>
                <p> 
                The database is open source. Users are free to use the images Gatorecycler has collected for their own projects.
                </p>
                <Button variant="outlined" color = "primary" onClick = {() => {ImageDatabaseDownload()}}>
                    Download Database
                </Button>
            </div>
        )
    }
}

export default Resources;