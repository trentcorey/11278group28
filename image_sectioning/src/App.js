import 'react-image-crop/dist/ReactCrop.css';
import React, {Component} from 'react';
import Cropper from './components/cropper'
import UploadFile from './components/uploadFile'

/*****************************************************SOME NOTES******************************************************/
// Some clarification: React works on "renders". A component is loaded, and does not change unless its state changes.
// So, if you change any information within a component, if the state DOES NOT CHANGE IT DOES NOT RERENDER. For example,
// a modification to a header will not be reflected on the website.

// If you're making modifications to this code and are wondering why I'm doing this in a certain way, hopefully this
// note explains it. If you find a better way to do something, please add it. (just don't modify my branch in case
// something breaks).

// There are several ways to force a rerender. One of the easiest ways, of which I made use of multiple times in my
// code, is to update a state with a counter. When a button is clicked, usually the function it runs does something
// like "state.data++" to update the state and thus cause a rerendering of the component.

// Feel free to change object IDs if it makes CSS easier.

// On that note, a lot of my code is pretty jank since this is my first time using React. But, if it works, it works.
// Good thing this is just supposed to be a prototype.

// Happy coding!
// - Ruo
/***************************************************END OF NOTES******************************************************/

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
    // Clear session storage when page is reloaded.
    window.onload = function() {
      sessionStorage.clear();
    }

    // Displays necessary information and components.
    return (
        <div className='App'>
          <p className="Intro">{this.state.data}</p>
          <Cropper />
          <UploadFile />     
        </div>
    );
  }
}

export default App;
