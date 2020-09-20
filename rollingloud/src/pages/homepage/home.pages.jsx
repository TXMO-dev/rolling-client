import React from 'react';
import {makeStyles,Grid,Typography,Container,Button} from '@material-ui/core'

const useStyles = makeStyles({
    parentDiv:{
        position:'absolute',
        top:0,
        left:0,
        width:'100vw',
        height:'100vh',
       // backgroundColor:'blue'
       zIndex:0
    },
    videoDiv:{
        position:'absolute',
        top:0,
        left:0,
        width:'100%',
        height:'100%',
        objectFit:'cover',
        zIndex:1
    },
    filterDiv:{
        position:'absolute',
        top:0,
        left:0,
        width:'100%',
        height:'100%',
        backgroundImage:'linear-gradient(to right bottom,rgba(0,121,107,.8),rgba(0,121,107,.6))',
        zIndex:2
    },
    textZindex:{
        position:'absolute',
        top:'20%',
        left:'50%',
        transform:'translate(-50%,-20%)',  
        zIndex:3,
        textAlign:'center',
        textTransform:'uppercase',
        color:'#FFFAFA'
    },
    paraIndex:{
        position:'absolute',
        top:'60%',
        left:'50%',
        transform:'translate(-50%,-60%)',
        zIndex:4,
        textAlign:'center',
        textTransform:'uppercase',
        color:'#FFFAFA'
    },
    BtnCheck:{
        position:'absolute',
        zIndex:4,
        border:'.1rem solid #FFFAFA',
        color:'#FFFAFA',
        top:'70%',
        left:'17%',
        padding:'1rem 3rem'
    },
    BtnCheckReg:{
        position:'absolute',
        zIndex:4,
        color:'#FFFAFA',
        border:'.1rem solid #FFFAFA',  
        top:'70%',
        right:'18%',
        padding:'1rem 3rem'

    },
    poweredText:{
        position:'absolute',
        zIndex:4,
        top:'94%',
        right:'5%',
        fontSize:'0.6rem',
        color:'#FFFAFA'
    }


})

const Homepage = (props) => {
    const classes = useStyles();
    return (
        <div className = {classes.parentDiv}>
            <div className = {classes.filterDiv}>&nbsp;</div>
            <video className={classes.videoDiv} autoPlay loop muted>
                <source src="https://firebasestorage.googleapis.com/v0/b/rolling-loud-2020.appspot.com/o/videos%2FArizona-Petrol-Break.mp4?alt=media" type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
                <Container maxWidth="md">
                    <Grid items container>
                        <Grid items>
                            <Typography >
                                <Typography className = {classes.textZindex} variant='h1' component='span'>ROLLING LOUD</Typography>
                                <Typography className = {classes.paraIndex} variant='h6' component='span'>  
                                    the best place to purchase the most affordable and quality cars.
                                </Typography>
                                <Button className={classes.BtnCheck} onClick = {() => {props.history.push('/login')}} variant='outline'>Login</Button>
                                <Button className={classes.BtnCheckReg}  onClick = {() => {props.history.push('/register')}} variant='outline'>Register</Button>
                                <Typography className={classes.poweredText} component='span'>Powered By TX WEBSERVICES GHANA</Typography>
                            </Typography>
                        </Grid>
                        <Grid items>
                        
                        </Grid>    
                          
                    </Grid>
                </Container>
                
    
        </div>
    )
}

export default Homepage;