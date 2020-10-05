import React from 'react';
import {Container,Grid,makeStyles} from '@material-ui/core';
import CardComponent from  './../card/card.component';
import {useQuery,useApolloClient} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import CircularProgress from '@material-ui/core/CircularProgress';
import classname from 'classname';
import jwtdecode from 'jwt-decode';



const usestyles = makeStyles({
   centerGrid:{
       margin:'5% auto',
       width:'70%',
   },
   dialogPos:{
       margin:'20% 20%'
   }
})

const GET_CARS = gql`
{
    getCars @client  
}
`

const PostComponent = () => {
    const client = useApolloClient();
    const classes = usestyles();
    const decoded_token = jwtdecode(localStorage.getItem('token'));
    const {loading,error,data,networkStatus} = useQuery(GET_CAR_QUERY,{
        pollInterval:1200000,
        notifyOnNetworkStatusChange:true
    });
    if(error){alert('there was an error fetching the data!')};
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
    const {getCars} = data;    
    const getCarsFilter = getCars.filter(carObj => carObj.dealer === decoded_token.username)
    return (
         <div className = {classes.centerGrid}>
            <Container maxWidth='lg'>
                
                <Grid container spacing={2}>
                    {getCarsFilter.map((props) => (  
                   <Grid item xs={12} sm={6} md={3} lg={4}>
                       <CardComponent key={props.id} {...props} />
                   </Grid>   
                    )) 
                }
                
                </Grid>
            </Container>
         </div>
    )
}

export default PostComponent;      


const GET_CAR_QUERY = gql`
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
            reviews{
                review_id
                username
                user_image
                body
                createdAt
            }
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
`;