import React,{useState} from 'react';    
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import {useMutation} from '@apollo/react-hooks';
import  gql  from 'graphql-tag';
import UpdateIcon from '@material-ui/icons/Update';

const GET_CAR_REVIEWS = gql`
query getCarReviews($carId:String!) @client{
getCarReviews(carId:$carId){
  review_id
  user_image
  username
  body
  createdAt
}
}

`
const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

  
  const UpdateReview = ({update_post:{id,review_id}}) => {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const [updateTheReview,setupdateReview] = useState({body:""});
    const {body} = updateTheReview;
    const [update] = useMutation(UPDATE_REVIEW,{
        update(cache,{data:{updateReview}}){
            const {getCarReviews} = cache.readQuery({
                query:GET_CAR_REVIEWS
            })

            cache.writeQuery({
                query:GET_CAR_REVIEWS,
                data:{getCarReviews:[{...updateReview,...getCarReviews}]}
            })
        },
        variables:{
          carId:id,
          reviewId:review_id,
          body
      },
        refetchQueries:[
          {query:GET_CAR_REVIEWS,variables:{carId:id}
        }
        ],
        onCompleted(){
            alert('post has been updated successfully')
        }
        
    })
    const handleChange = e => {
        const {name,value} = e.target;
        setupdateReview({...updateTheReview,[name]:value})  
    }

    

    const handleSubmit = e => {
        e.preventDefault();
        update()
       setupdateReview({})
    }

    return (
        <div>
          <IconButton onClick = {handleClickOpen}>
                <UpdateIcon/>
            </IconButton>
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Update Review
            </DialogTitle>
            <form onSubmit = {handleSubmit}>
            <DialogContent>
                  <TextField
                    fullWidth
                    name="body"
                    type="text" 
                    label="Update Body..."  
                    onChange = {handleChange}
                    value = {body}    
                  />
            </DialogContent>
            <DialogActions>
              <Button type = 'submit' autoFocus onClick={handleClose} color="primary">
                Update
              </Button>
            </DialogActions>
            </form>
          </Dialog>
        </div>
      );
    }

    const UPDATE_REVIEW = gql`
        mutation updateReview(
            $carId:String!
            $reviewId:String!
            $body:String!
            ){
                updateReview(
                    carId:$carId,
                    reviewId:$reviewId,
                    body:$body
                    ){
                        review_id
                        username
                        user_image
                        body
                    }
            }
    `

    export default UpdateReview;