import React, { useState } from 'react'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

window.SomeDeleteRowFunction = function SomeDeleteRowFunction(o) {
  var p=o.parentNode.parentNode;
  p.parentNode.removeChild(p);
}

function App() {
  const [src, selectFile] = useState(null)
  var im = 0;
  const handleFileChange = e => {
      selectFile(URL.createObjectURL(e.target.files[0]))
      im = 1
  }

  const [image, setImage] = useState(null)
  const [crop, setCrop] = useState(null);
  
  function cropImageFunc(table, class_menu) {
    var tableRef = document.getElementById(table);
    var newRow   = tableRef.insertRow(-1);

    var menuRef = document.getElementById(class_menu);
  
    var newCell  = newRow.insertCell(0);
    var newElem = document.createElement( 'input' );
    newCell.innerHTML = crop.x;

    newCell  = newRow.insertCell(1);
    newElem = document.createElement( 'input' );
    newCell.innerHTML = crop.y;

    newCell  = newRow.insertCell(2);
    newElem = document.createElement( 'input' );
    newCell.innerHTML = crop.x + crop.width;

    newCell  = newRow.insertCell(3);
    newElem = document.createElement( 'input' );
    newCell.innerHTML = crop.y + crop.height;

    newCell  = newRow.insertCell(4);
    newElem = document.createElement( 'input' );
    newCell.innerHTML = menuRef.value;

    newCell = newRow.insertCell(5);
    newElem = document.createElement( 'input' );
    newElem.setAttribute("type", "button");
    newElem.setAttribute("value", "Delete Row");
    newElem.setAttribute("onclick", 'SomeDeleteRowFunction(this)')
    newCell.appendChild(newElem);

    console.log("Hi!")
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

            <label for="classification">What's in the section?</label>
            <select name ="classification" id="classification">
              <option value="0">Apple</option>
              <option value="1">Pear</option>
              <option value="2">Orange</option>
            </select>
            <button className='crop_button' onClick={() => {cropImageFunc('position_table', 'classification')}}>Crop Image</button>

            <table id="position_table">
              <tr>
                <td>x_min</td>
                <td>y_min</td>
                <td>x_max</td>
                <td>y_min</td>
                <td type='select'>class_id</td>
              </tr>
            </table>
        </div>
    )
}

export default App;
