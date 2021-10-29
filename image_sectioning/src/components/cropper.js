import ReactCrop from 'react-image-crop';
import React, { useState } from 'react'
import 'react-image-crop/dist/ReactCrop.css';
import DisplayTable from './displaytable';


const Cropper = () => {
    const [src, selectFile] = useState(null);
    const [image, setImage] = useState(null)
    const [crop, setCrop] = useState(null);
    const [infoDisplayed, setInfoDisplayed] = useState(0);
    

    const handleFileChange = e => {
        selectFile(URL.createObjectURL(e.target.files[0]))
        var clearData = [];
        sessionStorage.setItem('sectionInfo', JSON.stringify(clearData));
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

        // Also doubles as a counter. Two birds with one stone! - Ruo
        sectionData.SectionID = preExistingData.length;
        preExistingData.push(sectionData);
        
        // Put the object into storage - Ruo
        sessionStorage.setItem('sectionInfo', JSON.stringify(preExistingData));

        // Force the table to update - Ruo
            // I could have easily updated this with preExistingData.length, but it keeps giving me warnings,
            // and I don't like warnings - Ruo
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
        </div>

    )
};

export default Cropper