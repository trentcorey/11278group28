import ReactCrop from 'react-image-crop';
import React, { useState } from 'react'
import 'react-image-crop/dist/ReactCrop.css';

const Cropper = () => {
    const [src, selectFile] = useState(null);
  
    const handleFileChange = e => {
        selectFile(URL.createObjectURL(e.target.files[0]))
    }

    const [image, setImage] = useState(null)
    const [crop, setCrop] = useState(null);
    var testObject = [];
    var numSections = 0;
    function saveSection(class_menu) {
        var class_id = (document.getElementById(class_menu)).value;
        
        var testString = {'SectionID': numSections, 'x_min': crop.x, 'y_min': crop.y, 
                        'x_max': crop.x + crop.width, 'y_max': crop.y + crop.height, 'class_id': parseInt(class_id)}
        numSections = numSections + 1;
        testObject.push(testString);
        

        // Put the object into storage
        localStorage.setItem('testObject', JSON.stringify(testObject));

        // Retrieve the object from storage
        var retrievedObject = localStorage.getItem('testObject');

        console.log('retrievedObject: ', JSON.parse(retrievedObject));
    }
    
    window.SomeDeleteRowFunction = function SomeDeleteRowFunction(o) {
        var p=o.parentNode.parentNode;
        p.parentNode.removeChild(p);
        }

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-6'>
                        <input type='file' accept='image/*' onChange={handleFileChange} />
                    </div>
                    
                    {src && <div className='col-6'>
                        <ReactCrop src={src} onImageLoaded={setImage} crop={crop} onChange={setCrop} />
                    </div>}
                </div>

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
                <button className='save_Section' onClick={() => {saveSection('classification')}}>Save Section</button>

                <button className='save_Section'>Upload File</button>
            </div>
        )
};

export default Cropper
