import React, { useState } from 'react';
import gql from 'graphql-tag';
import {Grid,makeStyles, TextField,IconButton} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classname from 'classname';
import UserUploadButton from './../uploads/user.uploads';
import CircularProgress from '@material-ui/core/CircularProgress';   
import jwtdecode from 'jwt-decode';
import { useMutation } from '@apollo/client';
import UpdatePasswordButton from './../card/update_password.card';
import DeleteButton from './../button/deletebutton/deleteaccount.button';

const GET_MY_PROFILE = gql`
    query getMe @client{
        getMe{
            id
            full_name
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

const useStyles = makeStyles({
    centerGrid:{
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',
        

    },
    root: {
        minWidth: 275,
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
      themarginRight:{
          marginRight:'2rem'
      }
})
// 
const SettingsComponent = ({history}) => {
const classes = useStyles();
const [updateSettings,setupdateSettings] = useState({
    full_name:"",
    email:"",
    username:"",
    description:"",

})
const {full_name,email,username,description} = updateSettings;
const decoded_token = jwtdecode(localStorage.getItem('token'));
const {id} = decoded_token;

const handleChange = e => {
    const {name,value} = e.target;
    setupdateSettings({...updateSettings,[name]:value})
}

const [updatesettingMutation,{loading}] = useMutation(UPDATE_PROFILE,{
    update(cache,{data:{updateMyProfile}}){
        const {getMe} = cache.readQuery({
            query:GET_MY_PROFILE
        })
        cache.writeQuery({
            query:GET_MY_PROFILE,
            data:{getMe:{...updateMyProfile,...getMe}}
        })

        history.push('/dashboard/profile')
    },
    onError(e){
        alert(`${e.message}`)
    },
    onCompleted(){
        alert('settings has been successfully updated...')
    },
    variables:{...updateSettings},
    refetchQueries:[{query:GET_MY_PROFILE}]
})

const handleSubmit = e => {
    e.preventDefault();
    updatesettingMutation();
    setupdateSettings({});
}

if(loading){
    return (   
        <div className={classname(classes.root,classes.circularCntr)}>
          <CircularProgress />
        </div>
     );
}

    return (
        <div className = {classes.centerGrid}>
            <Grid  container justify="center" alignItems="center" alignContent="center" spacing={2}>
                <Grid className={classes.themarginRight} item xs={12} sm={8} md={6} lg={4}>
                    <Card className={classname(classes.root,classes.themarginRight)}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Change Full Name
                            </Typography>
                            <form onSubmit = {handleSubmit}>
                            <TextField
                            fullWidth
                            name="full_name"
                            type="text"
                            value={full_name}
                            label="Enter New Full Name"
                            onChange={handleChange}
                            //value will come here after setting things up...
                            />
                            <Button type='submit' size="small">Update</Button>
                            </form>
                        </CardContent>
                        <CardActions>
                            
                        </CardActions>  
                    </Card>
                </Grid>
                <Grid className={classes.themarginRight} item xs={12} sm={8} md={6} lg={4}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Change Email
                            </Typography>
                            <form onSubmit = {handleSubmit}>
                            <TextField
                            fullWidth
                            name="email"
                            type="email"
                            label="Enter New Email"
                            value={email}
                            onChange = {handleChange}
                            //value will come here after setting things up...
                            />
                            <Button type = 'submit' size="small">Update</Button>
                            </form>
                        </CardContent>
                        
                    </Card>
                </Grid>
                <Grid className={classes.themarginRight} item xs={12} sm={8} md={6} lg={4}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Change Username
                            </Typography>
                            <form onSubmit = {handleSubmit}>
                            <TextField  
                            fullWidth
                            name="username"
                            type="text"
                            label="Enter New Username"
                            value={username}
                            onChange = {handleChange}
                            //value will come here after setting things up...
                            />
                            <Button type = 'submit' size="small">Update</Button>
                            </form>
                        </CardContent> 
                    </Card>
                </Grid>
                <Grid className={classes.themarginRight} item xs={12} sm={8} md={6} lg={4}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Description
                            </Typography>
                            <form onSubmit = {handleSubmit}>
                            <TextField
                            fullWidth
                            name="description"
                            type="text"
                            label="Enter or Change Description"
                            value={description}
                            onChange = {handleChange}  
                            //value will come here after setting things up...
                            />
                            <Button type = 'submit' size="small">Update</Button>
                            </form>
                        </CardContent> 
                    </Card>
                </Grid>
                <Grid className={classes.themarginRight} item xs={12} sm={8} md={6} lg={4}>
                    <Card className={classes.root}>
                        <UpdatePasswordButton/>
                    </Card>
                </Grid>
                <Grid className={classes.themarginRight} item xs={12} sm={8} md={6} lg={4}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Upload User Photo
                            </Typography>
                            <UserUploadButton upload={{history,id}}/>
                            
                        </CardContent> 
                    </Card>
                </Grid>
                <Grid className={classes.themarginRight} item xs={12} sm={8} md={6} lg={4}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Delete Account
                            </Typography>
                            {/* the delete icon will be here most definately */}
                            <DeleteButton delete_post = {{history}} />
                            
                        </CardContent> 
                    </Card>
                </Grid>
                
                
            </Grid>
        </div>
    )
}

export default SettingsComponent;

const UPDATE_PROFILE = gql`
    mutation updateMyProfile(
        $full_name:String
        $email:String
        $username:String
        $description:String
    ){
    updateMyProfile(profileUpdate:{
        full_name:$full_name,
        email:$email,
        username:$username,
        description:$description
    }){
        id
        full_name
        username
        email
        description
        
        
    }
}

`