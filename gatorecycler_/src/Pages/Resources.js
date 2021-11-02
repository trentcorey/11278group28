/* 
This is the Resources of the Menu tab
This section has
    - Download Neural Network
    - Download Image Database
*/

import React, {Component} from 'react'
import { Button } from '@mui/material';

class Resources extends Component{
    render(){
        return (
            <div>
                <h1>Neural Network Weights</h1>
                <p> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <Button variant="raised" component="span">
                    Export Network
                </Button>

                <h1>Open Source Image Database</h1>
                <p> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <Button variant="raised" component="span">
                    Export Database
                </Button>
            </div>
        )
    }
}

export default Resources;