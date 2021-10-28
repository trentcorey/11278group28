import React, {Component} from 'react'
import ReactCrop from 'react-image-crop';

class SectionOff extends Component {
    state = {
        src: null,
        crop: null
    };

    handler_FileChange = (e) => {
        const reader = new FileReader();
        reader.addEventListener('load', () =>
            this.setState({src: reader.result })
        );
        reader.readAsDataURL(e.target.files[0]);
    };

    onCropChange = (crop) => {
        this.setState({crop});
    };

    onImageLoad = (image) => {
        this.imageRef = image;
    }

    render() {
        return (
            <div className="sectionOff">
                <div>
                    <input type="file" accept="image/*" onChange={this.onSelectFile} />
                </div>
                {src && (<ReactCrop src={src} crop={crop} onImageLoaded={this.onImageLoad} onChange={this.onCropChange} />)}
            </div>
        )
    }
}

export default SectionOff