import React, {Component} from "react";
import VerticalMenu from "../Components/VerticalMenu";
import About from "./About";
import {HashRouter as Router, Route} from 'react-router-dom';

class Home extends Component{
    render(){
        return(
            <div>
                <Router>
                    {/* The Vertical Menu */}
                    <VerticalMenu />

                    {/* Link to About */}
                    <Route exact path= '/about'><About/></Route>
                    
                    {/* Link to Resources -- Download Neural Network/Database */}

                    {/* Link to Help Section */}

                </Router>
            </div>
        )
    }
}

export default Home;