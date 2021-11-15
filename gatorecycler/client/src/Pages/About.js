// This is the About Section of the Menu tab
import React, {Component} from 'react'
import {Box, Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material';
import articleOne from '../Misc/Gatorecycler.png'
import articleTwo from '../Misc/MachineLearning.png'

class About extends Component{
    render(){
        return (
            <div>
                {/* The "article" that will display on main */}
                <Card sx={{ display: 'flex' }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            image = {articleOne}
                            alt="Gatorecycler"
                        />
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography
                                    variant = "h5"
                                    align = "center"
                                >
                                    Gatorecycler!
                                </Typography>
                                <Typography
                                    variant = "p"
                                >
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
                                    ut aliquip ex ea commodo consequat.
                                </Typography>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>

                <br />

                <Card sx={{ display: 'flex' }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            image = {articleTwo}
                            alt="Machine-Learning"
                        />
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography
                                    variant = "h5"
                                    align = "center"
                                >
                                    What is Machine Learning?
                                </Typography>
                                <Typography
                                    variant = "p"
                                >
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
                                    ut aliquip ex ea commodo consequat.
                                </Typography>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        )
    }
}

export default About;
