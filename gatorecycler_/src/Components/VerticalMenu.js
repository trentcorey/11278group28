import React from 'react'
import {Box, Tab} from '@mui/material';
import { Link } from "react-router-dom";
import {TabContext, TabList} from '@mui/lab';

function VerticalMenu() {
    // Value var for tabs
    const[val,setVal] = React.useState('1');

    //  Change Val var
    const forChange = (event, newVal) =>{
        setVal(newVal);
    };
    
    return (
        <div>
            <Box sx={{ height: '100%', flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
                <TabContext value={val}>
                    <Box sx={{ borderColor: 'divider' }}>
                    <TabList 
                        onChange={forChange} 
                        aria-label="Vertical menu"
                        orientation="vertical"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab 
                            label="About" 
                            component={Link} to= "/about"
                            val="1" 
                        />
                        <Tab 
                            label="Resources"
                            component={Link} to="/resources" 
                            val="2" 
                        />
                        <Tab 
                            label="Help Section"
                            component={Link} to="/help" 
                            val="3" 
                        />
                    </TabList>
                    </Box>
                </TabContext>
            </Box>
        </div>
    )
}

export default VerticalMenu