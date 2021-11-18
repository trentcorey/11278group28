// This is the Help Section of the Menu tab

import React, {Component} from 'react'
import AccordionHelp from '../Components/AccordionHelp';

class Help extends Component{
    render(){
        return (
            <div>
                <h1>Help Section</h1>
                <p> 
                    Here are some recently asked questions from users.
                </p>
                <AccordionHelp/>
            </div>
        )
    }
}

export default Help;