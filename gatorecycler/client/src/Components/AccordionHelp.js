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
                        <typography>What are the photos I upload being used for?</typography>
                    </AccordionSummary>
                
                    <AccordionDetails>
                        <typography>
                            The images our users upload will be stored in a database. Objects are currently sorted between
                            plastic, glass, and cardboard. These photos help our team and others on a mission to find better
                            ways to dispose of waste and reduce waste!
                        </typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion class = "acc">
                    {/* Question 2 */}
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <typography>How does the upload image page work?</typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <typography>
                            To upload photos, users can use the Upload Image tab found on the navigation bar. 
                            In upload images users will be prompted to choose a file from their device.
                        </typography>
                        <br /> <br/>
                        <typography>

                            Once the user has imported an image, the image name will be displayed next to the 
                            upload button and then the image itself will be displayed directly underneath. The 
                            user can crop sections of the photo by clicking on a section of the photo and 
                            dragging the mouse over the intended image section. Next, under the photo the user 
                            needs to choose the material label presented in the section under the drop down menu 
                            next to the “What’s in the section?”.
                        </typography>
                        <br/> <br/>
                        <typography> 

                            Once the image section and label have been selected, save the sectioned image with 
                            the “save section” button. If the user wants to delete any of the saved sections, 
                            click the “delete” button on the right hand of the corresponding section. The user 
                            may make as many sections as needed.
                        </typography>
                        <br/> <br/>
                        <typography>
                
                            After the user has finished sectioning and labeling the photo, the user can hit
                            "Upload Image" to submit the image and the annotations to a database.
                        </typography>
                    </AccordionDetails>
                </Accordion>
                
                <Accordion>
                    {/* Question 3 */}
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <typography>How do I download the image database?</typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <typography>
                            The database is open source and available to all users to utilize for their own projects.
                            To download the Database go to the Menu Tab and click the Resources sub-Tab, then under 
                            “Open Source Image Database” select Export Database. Currently, this will export
                            the entire zip file and annotations, but we plan on making it so the user can choose
                            parameters to filter images that will be downloaded.

                        </typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        
        )
    }
}

export default AccordionHelp