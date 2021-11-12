import React, {Component} from 'react'
import { Button } from '@mui/material';
import axios from 'axios';

// Process should go like this: uploadFile is pressed, image and its attached JSON file
// is sent to backend. (Image as a BLOB?)
// Page is refreshed to clear image and section info.
// Then, message saying "upload successful!" if it worked.

class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.state = {image: this.props.image,
                      image_result: null}
    }

    handleFileUpload = () => {
        var sectionData = JSON.parse(sessionStorage.getItem('sectionInfo'));

        const data = new FormData()
        data.append('file', this.state.image)
        axios.post("/upload", data, {

        })
        .then (res => {
            console.log(res.statusText)
        })
    }

    render() {
        return (
            <div className="displayTable">
                <Button 
                    className='uploadFile' 
                    variant="outlined" 
                    color ="primary"
                    onClick={() => {this.handleFileUpload()}
                }>
                    Upload File
                </Button>
                
                <img id='DetectResult' src="http://localhost:5000/uploads/result.jpg"/>
            </div>
        )
    } 
}

export default UploadFile

// import React, {Component} from "react";
// import {InputLabel, Button } from '@mui/material';

// class UploadButton extends Component {

//     render(){
//         return (
//             <div>
//                 <input
//                         accept="image/*"
//                         // className={classes.input}
//                         style={{ display: 'none' }}
//                         id="upload-button"
//                         multiple
//                         type="file"
//                         onChange={this.handleFileSelect}
//                     />
//                     <InputLabel htmlFor="upload-button">
//                         <Button variant="outlined" color = "inherit">
//                             Upload
//                         </Button>
//                     </InputLabel> 

//                     <h5>Selected Files: </h5>
//                     {/* <p>{handleFileSelect.name}</p> */}
//             </div>
//         )
//     }
// }

// export default UploadButton
