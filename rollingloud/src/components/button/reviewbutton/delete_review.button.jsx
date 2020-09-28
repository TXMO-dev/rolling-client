import React from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
const GET_CAR_REVIEWS = gql`
    query getCarReviews($carId:String!) @client{
    getCarReviews(carId:$carId){
      username
      body
      createdAt
    }
  }

`
const DeleteReview = ({delete_post:{id,review_id}}) => {
    const [deleteReview,{loading}] = useMutation(DELETE_REVIEW_MUTATION,{
        onError(e){
            alert(`${e}`)
        },
        variables:{
            carId:id,
            reviewId:review_id
        }, 
        refetchQueries:[{query:GET_CAR_REVIEWS,variables:{carId:id}}]
    })
    
        
         return (
        <>
        <IconButton onClick = {() => deleteReview()}>
            <DeleteIcon color = 'secondary'/>
        </IconButton>
        </>
        )

    
    
};

const DELETE_REVIEW_MUTATION = gql`
    mutation deleteReview(
        $carId:String!,
        $reviewId:String!){
            deleteReview(
                carId:$carId,
                reviewId:$reviewId){
                    username,
                    user_image,
                    body,
                    createdAt
                }
        }

`

export default DeleteReview;