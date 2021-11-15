import React, { Component } from 'react'
import { Accordion, AccordionSummary, AccordionDetails} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

class AccordionHelp extends Component {
    render() {
        return (
            <div>
                <Accordion>
                    {/* Question 1 */}
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <typography>How do I create an account?</typography>
                    </AccordionSummary>
                
                    <AccordionDetails>
                        <typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    {/* Question 2 */}
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <typography>How can I upload photos?</typography>
                    </AccordionSummary>
                
                    <AccordionDetails>
                        <typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    {/* Question 3 */}
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <typography>How does the upload image page work?</typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    {/* Question 4 */}
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <typography>How do I download the Image database?</typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        
        )
    }
}

export default AccordionHelp
