import React,{useState,useEffect} from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {Button, Typography} from '@material-ui/core';


const GET_MY_PROFILE = gql`
    query getUserById($userId:String!) @client{
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
//ok so the follow button works but the issue is that once its not the authenticared user
//it doesnt toggle... 
const FollowerButton = ({follow_post:{decoded_token,match,following}}) => {
    const [follow,setfollow] = useState(false);
    useEffect(() => {
        if(decoded_token && following.find(followingObj => followingObj.username === decoded_token.username)){   
            return setfollow(true);                             
        } else setfollow(false);              
    },[decoded_token,following]);        

    const [followUser] = useMutation(CREATE_FOLLOW,{
        update(cache,{data:{createFollow}}){
            const {getUser} = cache.readQuery({        
                query:GET_MY_PROFILE,                      
                variables:{
                    userId:`${match.params.userId}`
                }   
            })
            //const {following} = getUser;
            cache.writeQuery({
                query:GET_MY_PROFILE,
                data:{getUser:[{...createFollow,...getUser}]},
                variables:{
                    userId:`${match.params.userId}`
                }          
            })   
        },
        variables:{
            userId:`${match.params.userId}`   
        },
        refetchQueries:[{
            query:GET_MY_PROFILE,
            variables:{
                userId:`${match.params.userId}`
                }
            }],      
        
    });

    console.log(follow);

    return (
        decoded_token  ? (
            follow ? (  
                <Button variant="contained" color="primary" onClick = {() =>  followUser()}>      
                    Following          
                </Button>
            ):(
                <Button variant="contained" color="primary" onClick = {() => followUser()}>
                    Follow   
                </Button>
            )
        ):(
                <Button variant="contained" color="primary" onClick = {() => followUser()}>   
                    Follow    
                </Button>
            )    
    )
}


export default FollowerButton;

const CREATE_FOLLOW = gql`
    mutation createFollow($userId:String!){
        createFollow(userId:$userId){
            following{
                username
                user_image{
                    path
                }
                description
            }
        }
    }

`