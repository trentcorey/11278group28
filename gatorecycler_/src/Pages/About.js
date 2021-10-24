// This is the About Section of the Menu tab
import React, {Component} from 'react'
import {Card, CardActionArea, CardMedia} from '@mui/material';

class About extends Component{
    render(){
        return (
            <div>
                <h1> About</h1>

                {/* The "article" that will display on main */}
                <Card sx={{ display: '240' }}>
                    <CardActionArea>
                        <CardMedia
                            image = "../Misc/Gatorecycler.png"
                        />
                    </CardActionArea>
                </Card>
            </div>
        )
    }
}

export default About;
