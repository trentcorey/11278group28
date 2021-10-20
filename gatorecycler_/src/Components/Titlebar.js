import React from 'react';
import { AppBar, Button, Toolbar, Typography} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

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
          <Button variant = "contained">Sign-In</Button>
          {/* Need to move it over from the Account circle */}
          {(
            <div>
              <AccountCircle />
            </div>
          )}
        </Toolbar>
      </AppBar>
      
    );
}

export default Titlebar;