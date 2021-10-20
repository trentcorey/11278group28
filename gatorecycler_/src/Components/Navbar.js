import React from "react";
import {Box, Tab} from '@mui/material';
import { Link } from "react-router-dom";
import {TabContext, TabList} from '@mui/lab';

function Navbar() {
    // Value var for tabs
    const[val,setVal] = React.useState('1');

    //  Change Val var
    const forChange = (event, newVal) =>{
        setVal(newVal);
    };

    return (
        <div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={val}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={forChange} aria-label="Tab menu">
                            <Tab 
                                label="Home" 
                                component={Link} to= "/"
                                val="1" 
                            />
                        <Tab 
                            label="Upload Image"
                            component={Link} to="/upload-image" 
                            val="2" 
                        />
                    </TabList>
                    </Box>
                </TabContext>
            </Box>
        </div>
    );
}

export default Navbar



// import React from 'react';
// import { AppBar, Button, Toolbar, Typography } from '@mui/material';
// import AccountCircle from '@mui/icons-material/AccountCircle';

// function Navbar() {
//     return (
//         <AppBar position="static">
//         <Toolbar>
//           <Typography 
//             variant="h3" 
//             component="div" 
//             align = "center" 
//             sx={{ flexGrow: 1 }}>
//               Gatorecycler
//           </Typography>
//           <Button variant = "contained">Sign-In</Button>
//           {/* Need to move it over from the Account circle */}
//           {(
//             <div>
//               <AccountCircle />
//             </div>
//           )}
//         </Toolbar>
//       </AppBar>
//     );
// }

// export default Navbar;