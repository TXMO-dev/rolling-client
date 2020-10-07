import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation,useApolloClient } from "@apollo/react-hooks";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import gql from "graphql-tag";
//import classname from 'classname';
import {makeStyles} from '@material-ui/core';  
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const USER_UPLOAD = gql`
    mutation updatePhoto($file:Upload!){
        updatePhoto(file:$file,){
            filename
            mimetype
            path 
        }
    }

`;

const GET_MY_PROFILE = gql`
    query getMe @client {
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
`;


const usestyles = makeStyles({

})

const UserUploadComponent = ({upload:{id,history}}) => {
    const classes = usestyles();       
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);  
    };
    const client = useApolloClient();
    const [uploadUser] = useMutation(USER_UPLOAD,{
        update(_,__){
           
           history.push('/dashboard/profile')   
        },
        onError(e){
            alert(`${e.message}`);
        },
        refetchQueries:[{query:GET_MY_PROFILE}],
        onCompleted({updatePhoto}){
            const {getMe} = client.readQuery({
                query:GET_MY_PROFILE   
            });
            client.writeQuery({
                query:GET_MY_PROFILE,
                data:{getMe:{...updatePhoto,...getMe}}
            });
            alert('user image uploaded successfully...');
        }
    });

    const onDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];
            uploadUser({
                variables:{file,id},
                update(cache,{data:{updatePhoto}}){
                   const {getMe} =  cache.readQuery({
                        query:GET_MY_PROFILE
                    })
                    cache.writeQuery({
                        query:GET_MY_PROFILE,   
                        data:{getMe:[{...updatePhoto,...getMe}]}
                    })
                    if(updatePhoto){
                        history.push('/dashboard')
                    }
                },   
            })
        }
    ,[uploadUser]);

    const {getRootProps,getInputProps,isDragActive} = useDropzone({
        onDrop,
    })

    return(
        <div>
        <Button className={classes.cloudPos} color="primary" onClick={handleClickOpen}>
            <CloudUploadIcon/>  
        </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle>
        <DialogContent {...getRootProps()} className={`dropzone ${isDragActive && "isActive"}`}>
            <input {...getInputProps()} />
            { isDragActive ?
                <DialogContentText>
                    Drop Image to Update Photo
                </DialogContentText>:
                <DialogContentText>Drag 'n' drop Image here to Update User Photo</DialogContentText>
            }
          
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>    
        </DialogActions>
      </Dialog>
        </div>
        
    )

}

export default UserUploadComponent;