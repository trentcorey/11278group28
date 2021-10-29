import React, {Component} from 'react'

// Process should go like this: uploadFile is pressed, image and its attached JSON file
// is sent to backend. (Image as a BLOB?)
// Page is refreshed to clear image and section info.
// Then, message saying "upload successful!" if it worked.

class UploadFile extends Component {

    handleFileUpload = async () => {
        var sectionData = JSON.parse(sessionStorage.getItem('sectionInfo'));
        const response = postMessage('/send_data', sectionData);
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