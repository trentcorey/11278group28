import React from 'react'
import {Box, Tab, Tabs, Typography} from '@mui/material';
import { Link } from "react-router-dom";


function TabPanel(props) {
    const { children, value, index } = props;
  
    return (
      <div
        id={`nav-bar-${index}`}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function menu(index) {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `nav-bar-${index}`,
      };
  }

function VerticalMenu() {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box
        sx={{ flexGrow: 1, bgcolor: 'white', display: 'flex', height: 250}}
      >
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Sub-navbar in home"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="About" {...menu(0)} containerElement={<Link to="/about"/>} />
          <Tab label="Resources" {...menu(1)} containerElement={<Link to="/resources"/>} />
          <Tab label="Help Section" {...menu(2)} containerElement={<Link to="/help"/>} />
        </Tabs>
        
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    );
  }
  
  export default VerticalMenu;