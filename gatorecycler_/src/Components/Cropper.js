import ReactCrop from 'react-image-crop';
import React, { useEffect, useState } from 'react'
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from '@mui/material';
import DisplayTable from './DisplayTable';
import axios from 'axios';
// import axios from 'axios';

const Cropper = () => {
    // These are states. Functionality was discovered using the module homepage at:
    // https://www.npmjs.com/package/react-image-crop
    const [src, selectFile] = useState(null);
    const [image, setImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [crop, setCrop] = useState(null);
    const [infoDisplayed, setInfoDisplayed] = useState(0);
    const [responseImage, setResponse] = useState(0);
    
    // This is called to handle a file load when it occurs.
    const handleFileChange = e => {
        selectFile(URL.createObjectURL(e.target.files[0]))
        setSelectedImage(e.target.files[0]);

        // Clears section information.
        var clearData = [];
        sessionStorage.setItem('sectionInfo', JSON.stringify(clearData));
        axios.delete("/delete_result", {

        })
        .then (res => {
            console.log(res.data)
            setInfoDisplayed(infoDisplayed + 1);
        })
        // Force an re-render.
        setInfoDisplayed(infoDisplayed + 1);
        setResponse(null);
        console.log(image);
        console.log(src);
    };

    const handleFileUpload = () => {
        const data = new FormData()
        data.append('file', selectedImage)
        axios.post("/upload", data, {
            responseType: 'blob'
        })
        .then (res => {
            console.log(res.data)
            setResponse(URL.createObjectURL(new Blob([res.data])))
        })

    }


    function saveSection(class_menu) {
        var class_id = parseInt((document.getElementById(class_menu)).value);
        
        var sectionData = {'SectionID': 0, 'x_min': crop.x, 'y_min': crop.y, 
                        'x_max': crop.x + crop.width, 'y_max': crop.y + crop.height, 'class_id': class_id}

        var preExistingData = JSON.parse(sessionStorage.getItem('sectionInfo'))
        if (preExistingData == null) {
            preExistingData = [];
        }

        // Also doubles as a counter. Two birds with one stone!
        sectionData.SectionID = preExistingData.length;
        preExistingData.push(sectionData);
        
        // Put the object into storage
        sessionStorage.setItem('sectionInfo', JSON.stringify(preExistingData));

        // Force the table to update
            // I could have easily updated this with preExistingData.length, but it keeps giving me warnings,
            // and I don't like warnings
        setInfoDisplayed(infoDisplayed + 1)
    }
    
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-6'>
                    <input type='file' accept='image/jpeg' onChange={handleFileChange} />
                </div>
                
                {src && <div className='col-6'>
                    <ReactCrop src={src} onImageLoaded={setImage} crop={crop} onChange={setCrop} />
                </div>}
            </div>
            {src && <div> 
                <label htmlFor="classification">What's in the section?</label>
                <select defaultValue="3" name ="classification" id="classification">
                    <option disabled = "disabled" value = "3" hidden="hidden">Select Option ...</option>
                    <option value="0">Cardboard</option>
                    <option value="1">Glass</option>
                    <option value="2">Plastic</option>
                </select>
                </div>}
            
            {src && 
                <Button 
                    className='save_Section'
                    variant="outlined" 
                    color ="primary"
                    size = "small"
                    onClick={() => {saveSection('classification')}}
                >
                    Save Section
                </Button>
            }

            <br/>
            {src && <DisplayTable />}
            <br/>
            
            {src &&
                <Button
                    className='upload_Button'
                    variant = "outlined"
                    color = "primary"
                    size = "small"
                    onClick={() => {handleFileUpload()}}>
                Upload File
                </Button>
            }

            {src && <img id='DetectResult' src={responseImage} key={src} alt="Not found"/> }
        </div>

    )
};

export default Cropper