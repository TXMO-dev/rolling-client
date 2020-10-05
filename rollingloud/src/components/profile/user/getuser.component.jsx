import React from 'react';
import {Grid,makeStyles,Container,Avatar, Typography,Button} from '@material-ui/core'
import gql from 'graphql-tag';
import {useQuery,useApolloClient} from '@apollo/react-hooks'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import CircularProgress from '@material-ui/core/CircularProgress'; 
import classname from 'classname';
import FollowerButton from '../../following/button/following.button'
import jwt_decode from 'jwt-decode';   



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
const UserProfileComponent = ({match,history}) => {
    const classes = useStyles();
    const {data,networkStatus,loading} = useQuery(GET_MY_PROFILE,{
        pollInterval:15000,
        notifyOnNetworkStatusChange:true,
        variables:{
            userId:`${match.params.userId}`  
        }
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
    const decoded_token  = jwt_decode(localStorage.getItem('token'))
    const the_data = {...data};   
    const {getUser} = the_data;
    const ind_data = {...getUser};
    const {full_name,user_image,description,followingCount,followerCount,username,verified,roles,following} = ind_data;
    const pic = {...user_image};
    const {path} = pic;
    if(ind_data){
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
                        <Grid item>
                            <FollowerButton follow_post = {{decoded_token,match,following}}/>
                        </Grid>
                    </Grid>
                    
                </Grid>
            </Container>
            )
    }
    
   
     
}

export default UserProfileComponent;

const GET_MY_PROFILE = gql`
query getUserById($userId:String!){
    getUser(userId:$userId){     
        id
        full_name
        email    
        user_image{
            path
        }
        description
        username
        email
        description 
        followingCount
        following{
            username
            description
            user_image{
                path
            }
        }
        followerCount    
        roles     
  }
}
`