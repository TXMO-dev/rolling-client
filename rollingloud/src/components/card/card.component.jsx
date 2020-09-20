import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
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
import FavoriteIcon from '@material-ui/icons/Favorite';
//import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import classname from 'classname';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';
import {withRouter} from 'react-router-dom'

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

  avatarCursor:{
    cursor:'pointer'
  }
}));

const CardComponent = ({id,name,price,deal,dealer,dealer_id,dealer_image,description,condition,category,likeCount,reviewCount,Images,history}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
  
        avatar={
          <Avatar  onClick ={() => {
            history.push(`dashboard/profile/${dealer_id}`)
          }} src={`${dealer_image}`} aria-label="recipe" className={classname(classes.avatar,classes.avatarCursor)}>
            
          </Avatar>
        }
        action={
          <IconButton onClick = {() => {
            history.push(`dashboard/car/${id}`)
          }} aria-label="settings">
            <VisibilitySharpIcon/>   
          </IconButton>
        }
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
            <IconButton aria-label="add to favorites">
                <FavoriteIcon /><Typography>{likeCount}</Typography>
            </IconButton>
            
            <IconButton aria-label="share">
                <CommentOutlinedIcon/><Typography>{reviewCount}</Typography>
            </IconButton>
            <IconButton aria-label="shopping cart">
                <AddShoppingCartOutlinedIcon/>
            </IconButton> 
            
                <Button variant='contained' color='primary'>Buy Now</Button>     
            
      </CardActions>  
     
    </Card>
  );
}

export default withRouter(CardComponent);
