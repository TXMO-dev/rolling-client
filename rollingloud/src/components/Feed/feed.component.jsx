import React from 'react';
import {Container,Grid,makeStyles} from '@material-ui/core';
import CardComponent from  './../card/card.component';
import {useQuery,useApolloClient} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import CircularProgress from '@material-ui/core/CircularProgress';
import classname from 'classname';



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

const FeedComponent = () => {
    const client = useApolloClient();
    const classes = usestyles();
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
    
    return (
         <div className = {classes.centerGrid}>
            <Container maxWidth='lg'>
                <Grid container spacing={2}>
                    {getCars.map((props) => (  
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

export default FeedComponent;   


const GET_CAR_QUERY = gql`
    query getCars{
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