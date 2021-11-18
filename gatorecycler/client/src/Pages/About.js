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
                                    Gatorecycler is a project dedicated to help train neural networks to distinguish between recyclable materials
                                    for effective handling of waste. Tons of recyclable material are thrown away everyday and Gatorecycler
                                    aims to reduce waste by automatically sorting and locating recyclable material. This website serves as
                                    a way for individuals to contribute images to train neural networks and be part of the change!
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
                                    Machine learning is the study of algorithms that imitate intelligent human
                                    behavior and improve automatically through experience and collecting data.
                                    It is a subsection of artificial intelligence.
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
