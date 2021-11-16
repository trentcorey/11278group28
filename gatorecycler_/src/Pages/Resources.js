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
                    The weight of a neural network is the parameter that transforms input data within the network's hidden layers. 
                    The neural network weights used in the Gatorecycler are avaliable for users to download to use for
                    recreational purposes.
                </p>
                <Button variant="outlined" color ="primary">
                    Export Network
                </Button>

                <h1>Open Source Image Database</h1>
                <p> 
                    The database is open source and users a free to use the images Gatorecycler has collected for their recreational purposes.
                </p>
                <Button variant="outlined" color = "primary">
                    Export Database
                </Button>
            </div>
        )
    }
}

export default Resources;