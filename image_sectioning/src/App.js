import 'react-image-crop/dist/ReactCrop.css';
import React, {Component} from 'react';
import Cropper from './components/cropper'
import DisplayTable from './components/displaytable'

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
    return (
      
        <div className='App'>
          
          <header className='Header'>
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="Intro">{this.state.data}</p>
          
          <Cropper />
          <DisplayTable />
          
        </div>
    );
  }
}

export default App;
