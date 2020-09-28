import React,{useState} from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {TextField,Button,makeStyles,Typography} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
const useStyles = makeStyles({

})


const UpdatePassword = _ => {
    const [newpassword,setnewpassword] = useState({
        current_password:"",
        new_password:"",
        confirm_new_password:""
    
    })
    
    const classes = useStyles();
    
    const [updatePassword] = useMutation(UPDATE_PASSWORD,{
        update(){
    
        },
        onError(e){
            alert(`${e}`);
        },
        onCompleted(){
            alert('password updated successfully...')
        },
        variables:newpassword
    });
    
    const handleSubmit = e => {
        e.preventDefault();
        updatePassword();
        setnewpassword({});
    }
    const handleChange = e => {
    const {name,value} = e.target;
    setnewpassword({...newpassword,[name]:value});
    }
    const {current_password,new_password,confirm_new_password} = newpassword;
    
    return(
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Update Password
            </Typography>
            <form onSubmit = {handleSubmit}>
                <TextField
                    fullWidth
                    name="current_password"
                    type="password"
                    label="Enter Current Password"
                    value={current_password}
                    onChange={handleChange}
                    //value will come here after setting things up...
                />
                <TextField
                    fullWidth
                    name="new_password"
                    type="password"
                    label="Enter New Password"
                    value={new_password}
                    onChange={handleChange}
                    //value will come here after setting things up...
                />
                <TextField
                    fullWidth
                    name="confirm_new_password"
                    type="password"
                    label="Confirm New Password"
                    value={confirm_new_password}
                    onChange={handleChange}      
                    //value will come here after setting things up...
                />
                    <Button type = 'submit' size="small">Update</Button>
            </form>
            </CardContent>
    )
    
};

export default UpdatePassword; 

const UPDATE_PASSWORD = gql`
    mutation updateMyPassword(
        $current_password:String!
        $new_password:String!
        $confirm_new_password:String!
    ){
        updateMyPassword(updateInput:{
            current_password:$current_password,
            new_password:$new_password,
            confirm_new_password:$confirm_new_password
        }){
            full_name
            email
            username
        }
    }

`
