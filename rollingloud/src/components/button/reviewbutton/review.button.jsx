import React,{useState,useRef,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import gql from 'graphql-tag';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery,useMutation } from '@apollo/react-hooks';
import classname from 'classname';
import {TextField} from '@material-ui/core';
import DeleteReview from './delete_review.button';
import UpdateReview from './update_review.button';   

const CAR_REVIEW_CLIENT = gql`
  query getCarReviews($carId:String!) @client{
    getCarReviews(carId:$carId){
      username
      body
      createdAt
    }
  }

`
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },

    flexIcons:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'flex-end',
      alignItems:'Center',
      justifyItems:'Center'
    }
  }));


const ReviewComponent = ({review_post:{id,reviewCount,reviews}}) => {
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');
    const [review,setreview] = useState({
      body:""
    });
    const {body} = review;
    const classes = useStyles();  
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = e => {
      const {name,value} = e.target;
      setreview({...review,[name]:value}); 
    }
    const [createReview] = useMutation(CREATE_CAR_REVIEW,{
      update(cache,{data:{createReview}}){
          const {getCarReviews} = cache.readQuery({
            query:CAR_REVIEW_CLIENT,
            variables:{
              carId:id
            }
          })
          cache.writeQuery({
            query:CAR_REVIEW_CLIENT,
            data:{getCarReviews:[{...createReview,...getCarReviews}]},
            variables:{
              carId:id    
            }
          })
      },
      onError(e){
        alert(`${e}`)
      },
      variables:{
        carId:id,
        body  
      },
      refetchQueries:[{query:CAR_REVIEW_CLIENT,variables:{carId:id}}]
    })

    const handleSubmit = e => {
      e.preventDefault();
      createReview()
      setreview({})
    }

   

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (open) {
          const { current: descriptionElement } = descriptionElementRef;
          if (descriptionElement !== null) {
            descriptionElement.focus();
          }
        }
      }, [open]);

      const {loading,error,data,networkStatus} = useQuery(GET_CAR_REVIEWS,{
        variables:{
          carId:id
        },
        pollInterval:1200000,
        notifyOnNetworkStatusChange:true
      })

      console.log(data)

      if(loading){
        return (   
            <div className={classname(classes.root,classes.circularCntr)}>
              <CircularProgress />
            </div>
         );
    }
    if(error){
      alert(`${error.message}`);
    }
    if(networkStatus === networkStatus.poll){
      return (   
        <div className={classname(classes.root,classes.circularCntr)}>
          <CircularProgress />
        </div>
     );
    }

    return (
        <>
            <IconButton onClick={handleClickOpen('paper')} aria-label="share">
                <CommentOutlinedIcon/><Typography>{reviewCount}</Typography>
            </IconButton>   
            <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            >
             <DialogTitle id="scroll-dialog-title">Reviews</DialogTitle>
             <DialogContent>
               
                 <List className={classes.root}>
                   {
                     reviews ? (
                      data.getCarReviews.map(reviewObj => {
                        const {review_id} = reviewObj;
                        return(
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                          <Avatar alt={reviewObj.username} src={reviewObj.user_image} />
                          </ListItemAvatar>
                          <ListItemText
                          primary=''   
                          secondary={
                              <React.Fragment>
                              <Typography
                                  component="span"
                                  variant="body2"
                                  className={classes.inline}
                                  color="textPrimary"
                              >
                                  {reviewObj.username}
                              </Typography>
                              {`-${reviewObj.body}`}  
                              </React.Fragment>
                          }
                          />
                          <div className = {classes.flexIcons}>
                          <DeleteReview delete_post = {{id,review_id}}/>  
                          <UpdateReview update_post = {{id,review_id}}/>
                          </div>
                          
                        </ListItem>)
                        
            
                        })
                 ):(   
                       <Typography> there are no reviews for this post</Typography>
                     )
                 
                 }
                 </List>
                
               
                 <form onSubmit = {handleSubmit}>
                  <TextField
                  fullWidth
                  name="body"
                  type="text"   
                  onChange = {handleChange}
                  value = {body}
                  />
                  <DialogActions>
                    <Button color='primary' type='submit'> Post</Button>
                  </DialogActions>
                 </form>
             </DialogContent>
            </Dialog>
        </>
        
    )
}

export default ReviewComponent;

const GET_CAR_REVIEWS = gql`
  query getCarReviews($carId:String!){
    getCarReviews(carId:$carId){
      review_id
      username
      user_image
      body
      createdAt
    }
  }
`

const CREATE_CAR_REVIEW = gql`
  mutation createReview(
    $carId:String!,
    $body:String!){
      createReview(
        carId:$carId,
        body:$body){
          review_id
          username
          user_image
          body
          createdAt
        }
      
    }
`