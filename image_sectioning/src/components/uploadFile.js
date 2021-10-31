import React, {Component} from 'react'
import axios from 'axios';

// Process should go like this: uploadFile is pressed, image and its attached JSON file
// is sent to backend. (Image as a BLOB?)
// Page is refreshed to clear image and section info.
// Then, message saying "upload successful!" if it worked.

class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.state = {image: this.props.image}
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

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(sectionData)
        };

        var response = fetch('/send_data', requestOptions)
            .then(response => response.json())

        console.log(response)
    }

    render() {
        return (
            <div className="displayTable">
                <button className='uploadFile' onClick={() => {this.handleFileUpload()}}>Upload File</button>
            </div>
        )
    } 
}

export default UploadFile