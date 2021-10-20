/* 
This is the Resources of the Menu tab
This section has
    - Download Neural Network
    - Download Image Database
*/

import React, {Component} from 'react'
import VerticalMenu from "../Components/VerticalMenu";


class Resources extends Component{
    render(){
        return (
            <div>
                {/* The Vertical Menu */}
                <VerticalMenu /> 
            </div>
        )
    }
}

export default Resources;