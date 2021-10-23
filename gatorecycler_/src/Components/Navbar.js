import React from "react";
import {Box, Tab, Tabs, Typography} from '@mui/material';
import { Link } from "react-router-dom";
import VerticalMenu from '../Components/VerticalMenu';

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


export default function Navbar() {
  const [val, setVal] = React.useState(0);

  const forChange = (event, newVal) => {
    setVal(newVal);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={val} 
          onChange={forChange} 
          aria-label="Navbar" >
            <Tab label="Home" {...menu(0)} containerElement={<Link to="/"/>} />
            <Tab label="Upload Images" {...menu(1)} containerElement={<Link to="/upload"/>}/>
        </Tabs>
      </Box>

      <TabPanel value={val} index={0} >
        <VerticalMenu />
      </TabPanel>
      <TabPanel value={val} index={1}>
        Item Two
      </TabPanel>
    </Box>
  );
}