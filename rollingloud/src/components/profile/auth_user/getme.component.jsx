import React from 'react';
import {Grid,makeStyles,Container,Avatar, Typography} from '@material-ui/core'
import gql from 'graphql-tag';
import {useQuery,useApolloClient} from '@apollo/react-hooks'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import CircularProgress from '@material-ui/core/CircularProgress'; 
import classname from 'classname'



const useStyles = makeStyles({
    centerprof:{
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',
        
    },
    childGrid:{
        padding:'1rem',
        width:'60%',
        margin:'0 20% 0 20%'
    },
    txtEdit:{
        textAlign:'center',
        width:'80%',
        margin:'0 10% 0 10%'
    },
    avatarSet:{
        width:'15rem',
        height:'15rem',
        margin:'0 5%'
    },
    typesOnclick:{
        cursor:'pointer'
    }
})
const MyProfileComponent = ({history}) => {
    const classes = useStyles();
    const {data,networkStatus,loading} = useQuery(GET_MY_PROFILE,{
        pollInterval:12000,
        notifyOnNetworkStatusChange:true 
    });  
    if(networkStatus === networkStatus.poll){
        return (   
            <div className={classname(classes.root,classes.circularCntr)}>
              <CircularProgress />
            </div>
         );
    }
    if(loading){
        return (   
            <div className={classname(classes.root,classes.circularCntr)}>
              <CircularProgress />
            </div>
         );
    }
    const the_data = {...data};
    const {getMe} = the_data;
    const ind_data = {...getMe};
    const {full_name,user_image,description,followingCount,followerCount,username,verified,roles} = ind_data;
    const pic = {...user_image};
    const {path} = pic;
    return(
        <Container className={classes.centerprof} maxWidth="md">
            <Grid className = {classes.childGrid} container spacing={4} justify="center" alignItems="center">
                <Grid item>
                    <Avatar src={path}  className={classes.avatarSet}/>
                </Grid>
                <Grid item>
                    <Typography >{full_name}({roles}){verified ? <VerifiedUserIcon/>: ''}</Typography>
                </Grid>
                    <Typography>username - {username}</Typography>
                <Grid item>
                    <Typography className={classes.txtEdit}>
                        {description ? description : 'no description available.please provide it in the settings tab'}
                    </Typography>
                </Grid>   
                <Grid item container direction="row" spacing={2} justify="center" alignItems="center">
                    <Grid item>
                        <Typography className={classes.typesOnclick} onClick = {() => history.push('/dashboard/mycars')}>40 Posts</Typography>   
                    </Grid>
                    <Grid item>
                        <Typography className={classes.typesOnclick} onClick = {() => history.push('/dashboard/following')}>{followingCount ? followingCount : 0} Following</Typography>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.typesOnclick} onClick = {() => history.push('/dashboard/followers')}>{followerCount ? followerCount : 0} Followers</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
   
     )
}

export default MyProfileComponent;

const GET_MY_PROFILE = gql`
    {
	getMe{
    id
    full_name
    username
    description
    user_image{
        path
    }
    followingCount
    followerCount
    verified
    roles
    
  }

} 
`