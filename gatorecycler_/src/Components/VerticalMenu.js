import * as React from 'react'
import {Box, Tab, Tabs, Typography} from '@mui/material';
import { Link } from "react-router-dom";
import About from '../Pages/About';
import Resources from '../Pages/Resources';
import Help from '../Pages/Help';

function TabPanel(props) {
    const { children, value, index } = props;
  
    return (
      <div
        id={`nav-bar-${index}`}
        style={{width: 'fit-content'}}
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
        id: `menu-${index}`,
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
          sx={{ borderRight: 1, borderColor: 'divider',  }}
        >
          <Tab label="About" {...menu(0)} to='/about' component={Link}  />
          <Tab label="Resources" {...menu(1)} to='/resources' component={Link} />
          <Tab label="Help Section"  {...menu(2)} to='/help' component={Link} />
        </Tabs>
        
        <TabPanel value={value} index={0}>
          <About/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Resources/>
        </TabPanel>
        <TabPanel  value={value} index={2}>
          <Help/>
        </TabPanel>
      </Box>
    );
  }
  
  export default VerticalMenu;