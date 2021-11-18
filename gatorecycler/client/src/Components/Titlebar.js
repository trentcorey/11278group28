import React from 'react';
import { AppBar, Toolbar, Typography} from '@mui/material';

function Titlebar() {
    return (
        <AppBar position="static">
        <Toolbar>
          <Typography 
            variant="h3" 
            component="div" 
            align = "center" 
            sx={{ flexGrow: 1 }}>
              Gatorecycler
          </Typography>
        </Toolbar>
      </AppBar>
      
    );
}

export default Titlebar;