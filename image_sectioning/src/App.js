import 'react-image-crop/dist/ReactCrop.css';
import React, {Component} from 'react';
// import SectionOff from './components/sectionOff'
import Cropper from './components/cropper'
import UploadFile from './components/uploadFile'

class App extends Component {
  state = {data: null};

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({data: res.express}))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {

    window.onload = function() {

      sessionStorage.clear();

    }
    return (
      
        <div className='App'>
          <p className="Intro">{this.state.data}</p>
          
          {/* <SectionOff /> */}
          <Cropper />
          <UploadFile />
          
        </div>
    );
  }
}

export default App;
