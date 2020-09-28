import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/react-hooks";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import gql from "graphql-tag";
import classname from 'classname';
import {makeStyles} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const CAR_UPLOAD = gql`
    mutation createCarPhoto($file:Upload!,$id:String!){
        createCarPhoto(Image:$file,id:$id){
            filename
            mimetype
            path 
        }
    }

`;

const CAR_QUERY = gql`
 query getCars @client{
        getCars{
            id
            name
            deal
            price
            dealer
            dealer_image
            dealer_id
            description
            condition
            category
            likeCount
            reviewCount
            Images{
            id
            path
            }
        }
    }

`
const usestyles = makeStyles({
    cloudPos:{
    }
})

 

const CarUploadComponent = ({id,history}) => {
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
    const [uploadCar] = useMutation(CAR_UPLOAD,{
        onError(e){
            alert(`${e}`);
        },
        refetchQueries:[{query:CAR_QUERY}]
    });
    
    const onDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];
            uploadCar({
                variables:{file,id},
                update(cache,{data:{createCarPhoto}}){
                   const {getCars} =  cache.readQuery({
                        query:CAR_QUERY
                    })
                    cache.writeQuery({
                        query:CAR_QUERY,
                        data:{getCars:[{...createCarPhoto,...getCars}]}
                    })
                    if(createCarPhoto){
                        history.push('/dashboard')
                    }
                },   
            })
        }
    ,[uploadCar]);

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
                    Drop The Files Here  (max: 5 uploads)
                </DialogContentText>:
                <DialogContentText>Drag 'n' drop some files here, or click to select files (max:5 uploads)</DialogContentText>
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

export default CarUploadComponent;