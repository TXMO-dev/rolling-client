import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import classname from 'classname';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';
import {withRouter} from 'react-router-dom';
import CarUploadComponent from './../uploads/car.uploads';
import jwtdecode from 'jwt-decode';
import gql from 'graphql-tag';
import {useMutation,useQuery,useApolloClient} from '@apollo/react-hooks';   
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import LikeButton from './../button/likebutton/like.button';
import ReviewComponent from './../button/reviewbutton/review.button';
import CartButton from '../button/cartbutton/cart_button.component';
import {cartItemsVar} from './../button/cartbutton/cache/cart.cache'



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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  marginBottom:{
    marginBottom:'.25rem',
    color:'#85bb65' ,
    display:'flex',
    justifyItems:'center',
    alignItems:'center',
    
  },
  margintoright:{
    marginRight:'.2rem',
  },
  negotiablecolor:{
      color:'#fdcf76'
  },
  categorycolor:{
    color:'#70543E'
},
  elementFont:{
    fontSize:'.8rem'
  },
  conditionStyle_1:{
      color:'#3CB371'
      
  },
  conditionStyle_2:{
    color:'#3CB371'
    
},
  avatar: {
    backgroundColor: red[500],
  },
  flexAlign:{
    display:'flex',
    justifyItems:'center',
    alignItems:'center'
  },

  avatarCursor:{
    cursor:'pointer'
  }
}));

const CardComponent = ({id,name,price,deal,dealer,dealer_id,dealer_image,description,condition,category,likes,reviews,likeCount,reviewCount,Images,history}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const [deleteCar,{loading}] = useMutation(DELETE_CAR,{
    onError(e){
      alert(`${e}`);
    },
    onCompleted(){
      alert(`${name} has been deleted successfully`)
    },
    variables:{carId:id},
    refetchQueries:[{query:CAR_QUERY}]
  });

  const client = useApolloClient();
 

if(loading){
    return (   
        <div className={classname(classes.root,classes.circularCntr)}>
          <CircularProgress />
        </div>
     );
}


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const token = localStorage.getItem('token');
  const decoded_token = jwtdecode(token);
  return (
    <Card className={classes.root}>
      <div className={classes.flexalign}>
        {
          decoded_token.username !== dealer ? '':<CarUploadComponent id={id} history={history}/>
        }
        {
          decoded_token.username !== dealer ? '':<Button onClick={() => {    
            return deleteCar();
          }}><DeleteIcon/></Button>
        }
      </div>
      <CardHeader
  
        avatar={
          <Avatar  onClick ={() => {
            history.push(`dashboard/profile/${dealer_id}`)
          }} src={`${dealer_image}`} aria-label="recipe" className={classname(classes.avatar,classes.avatarCursor)}>
            
          </Avatar>
        }
        /*action={
          <IconButton onClick = {() => {
            history.push(`dashboard/car/${id}`)
          }} aria-label="settings">
            <VisibilitySharpIcon/>   
          </IconButton>
        }*/
        
        title={dealer}
        subheader="September 14, 2016"
      />
      
      <CardMedia
        className={classes.media}
        image={`${Images[0].path}`}
        title={name}
      />
      <CardContent>
        <Typography className={classes.avatarCursor} onClick ={() => {
            history.push(`dashboard/car/${id}`)    
          }} variant='h6'>{name.toUpperCase()}</Typography>
          <Typography className = {classes.marginBottom}>
              <Typography className = {classname(classes.margintoright,classes.elementFont)}>${price}</Typography>
              <Typography className = {classname(classes.negotiablecolor,classes.elementFont,classes.margintoright)}>{deal}</Typography>
              <Typography className = {classname(classes.categorycolor,classes.elementFont,classes.margintoright)}>{category}</Typography>
              <Typography className = {classname(condition === 'New' ? classes.conditionStyle_1:classes.conditionStyle_2,classes.elementFont)}>{condition.toUpperCase()}</Typography>
          </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
            <LikeButton post = {{decoded_token,id,likeCount,likes}}/>        
            <ReviewComponent review_post={{id,reviews,reviewCount}}/>      

            <CartButton cart_post = {{id,price,Images,name}}/>
            
                <Button onClick = {() => {
                  const qty = 1;
                  const first_image = Images[0]
                  cartItemsVar([...cartItemsVar(),{id,price,first_image,name,qty}])   
                  return history.push('dashboard/cart')
                }} variant='contained' color='primary'>Buy Now</Button>     
            
      </CardActions>  
     
    </Card>
  );
}

const DELETE_CAR = gql`
  mutation deleteCar($carId:String!){
    deleteCar(carId:$carId){
      id
    }
  }
`



export default withRouter(CardComponent);
