import React,{useState,useEffect} from 'react';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import jwtdecode from 'jwt-decode';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderSharpIcon from '@material-ui/icons/FavoriteBorderSharp';

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
            likes{
              username
            }
            reviewCount
            Images{
            id
            path
            }
            
        }
    }

`



const LikeButton = ({post:{decoded_token,id,likes,likeCount}}) => {
    const [liked,setliked] = useState(false);
    useEffect(() => {
        if(decoded_token && likes.find(likeObj => likeObj.username === decoded_token.username)){
            setliked(true);
        } else setliked(false);
    },[decoded_token,likes]);

    const [createLike] = useMutation(CREATE_LIKE,{
        onError(e){
            alert(`${e}`);
        },
        variables:{
            carId:id
        },
        refetchQueries:[{query:CAR_QUERY}]     
    })
 
    return (
        decoded_token ? (
            liked ? (
                <IconButton onClick = {() => createLike()}>
                    <FavoriteIcon /><Typography>{likeCount}</Typography>  
                </IconButton>
            ):(
                <IconButton onClick = {() => createLike()}>
                    <FavoriteBorderSharpIcon /><Typography>{likeCount}</Typography>
                </IconButton>
            )
        ):(
            <IconButton onClick = {() => createLike()}>
                <FavoriteIcon /><Typography>{likeCount}</Typography>     
            </IconButton>
        )
    )
    
}

export default LikeButton;

const CREATE_LIKE = gql`
    mutation createLike($carId:String!){
        createLike(carId:$carId){
            username
            createdAt
        }
    }

`