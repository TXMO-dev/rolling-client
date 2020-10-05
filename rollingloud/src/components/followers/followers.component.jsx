import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {Grid,Container,makeStyles, Typography,Button} from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import gql from 'graphql-tag'
import jwtdecode from 'jwt-decode';
import classname from 'classname';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
      },
      media: {
        height: 140,
      },
      centerGrid:{
        margin:'5% auto',
        width:'70%',
    },
    dialogPos:{
        margin:'20% 20%'
    }
});

//const decoded_token = jwtdecode(localStorage.getItem('token'));
const FollowersPage = () => {
    const classes = useStyles();
    const {data} = useQuery(GET_FOLLOWERS,{
        pollInterval:200  
    });  
    const follow = {...data};
    const followMain = {...follow};
    const {followers} = followMain;
    //const followArray = [{following}]
    //const the_following = [...followArray]
  
    //console.log(the_following)
    return (
        <div className = {classes.centerGrid}>
           <Container maxWidth='lg'>
               <Grid container spacing={2}>
                 {      
                    followers ?
                        (followers.map(followObj =>  
                            <Grid item xs={12} sm={6} md={3} lg={4}>
                        <Card className={classname(classes.root,classes.centerGrid)}>
                            <CardActionArea>
                              <CardMedia
                                className={classes.media}
                                image={followObj.user_image}                  
                                title={followObj.username}
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                  {followObj.username}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                  {followObj.description}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                            <CardActions>
                              <Button size="small" color="primary">
                                Follow
                              </Button>
                            </CardActions>
                          </Card>
                          </Grid>
                          
                          )):
                        (
                        <Typography className = {classes.centerGrid}>
                            you currently do not have any followers
                        </Typography>
                        )
                 }    
               </Grid>
           </Container>
        </div>
   )
}

const GET_FOLLOWERS = gql`
    {
        followers{
            username
            user_image{
                path
            }
            description
        }     
        
    }

`



export default FollowersPage;   