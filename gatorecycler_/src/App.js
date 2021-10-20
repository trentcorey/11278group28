import { CssBaseline } from '@mui/material';
import * as React from 'react';
import Navbar from './Components/Navbar';
import Titlebar from './Components/Titlebar';
import Home from './Pages/Home';
import UploadItems from './Pages/UploadItem';
import {HashRouter as Router, Route} from 'react-router-dom';
import About from './Pages/About';
import Resources from './Pages/Resources';
import Help from './Pages/Help';


function App() {
  return (
    <div>
      <Router>
        <CssBaseline />
        <Titlebar/>
        <Navbar />
        <Route exact path= '/'><Home/></Route>
        <Route exact path='/upload-image'><UploadItems/></Route>
        <Route exact path= '/about'><About/></Route>
        <Route exact path= '/resources'><Resources/></Route>
        <Route exact path= '/help'><Help/></Route>
      </Router>
    </div>
  );
}

export default App;
