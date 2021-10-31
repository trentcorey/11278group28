import React, {Component} from 'react'

// Process should go like this: uploadFile is pressed, image and its attached JSON file
// is sent to backend. (Image as a BLOB?)
// Page is refreshed to clear image and section info.
// Then, message saying "upload successful!" if it worked.

class UploadFile extends Component {


    handleFileUpload = () => {
        var sectionData = JSON.parse(sessionStorage.getItem('sectionInfo'));
        console.log(sectionData);

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