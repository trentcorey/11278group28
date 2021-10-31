import ReactCrop from 'react-image-crop';
import React, { useState } from 'react'
import 'react-image-crop/dist/ReactCrop.css';
import DisplayTable from './displaytable';
import UploadFile from './uploadFile';
import axios from 'axios';

const Cropper = () => {
    // These are states. Functionality was discovered using the module homepage at:
    // https://www.npmjs.com/package/react-image-crop
    const [src, selectFile] = useState(null);
    const [image, setImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [crop, setCrop] = useState(null);
    const [infoDisplayed, setInfoDisplayed] = useState(0);
    
    // This is called to handle a file load when it occurs.
    const handleFileChange = e => {
        selectFile(URL.createObjectURL(e.target.files[0]))
        setSelectedImage(e.target.files[0]);

        // Clears section information.
        var clearData = [];
        sessionStorage.setItem('sectionInfo', JSON.stringify(clearData));

        // Force an re-render.
        setInfoDisplayed(0);
        console.log(image);
    };

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
                <select name ="classification" id="classification">
                    <option value="0">Red Apple</option>
                    <option value="1">Green Apple</option>
                    <option value="2">Pear</option>
                    <option value="3">Orange</option>
                    <option value="4">Red Grape</option>
                    <option value="5">Green Grape</option>
                    <option value="6">Banana</option>
                </select>
                </div>}
            
            {src && <button className='save_Section' onClick={() => {saveSection('classification')}}>Save Section</button>}
            {src && <DisplayTable />}
            {src && <UploadFile image={selectedImage}/>}
        </div>

    )
};

export default Cropper