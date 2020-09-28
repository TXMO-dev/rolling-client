import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import Avatar from '@material-ui/core/Avatar';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import FeaturedPlayListSharpIcon from '@material-ui/icons/FeaturedPlayListSharp';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import { useQuery,useApolloClient} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import Badge from '@material-ui/core/Badge';
import {cartItemsVar} from './../button/cartbutton/cache/cart.cache';




const IS_LOGGED_IN = gql`
  query IsUserLoggedIn{
    isLoggedin @client
  }
`

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
        margin: theme.spacing(1),
    },
  },
  colorChange:{
    //just incase
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  small: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
}));

        
const MiniDrawer = (props) => {
    {/*const decoded_user = jwtdecode(stored_token,{header:true});*/}
    const client = useApolloClient();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  {/*const {loading,error,data,networkStatus} = useQuery(GET_USER,{
      pollInterval:120000,
      notifyOnNetworkStatusChange:true,
      variables:{
          userId:decoded_user.id
      }
  });*/}

  const {data} = useQuery(IS_LOGGED_IN);

  
//console.log(data)   
 
  

  const menuListChoice = [
      {
          name:'Profile',
          icon:<Avatar src = '' className={classes.small} alt="Remy Sharp" />,  
          path:`${props.match.url}/profile`

      },
      {
          name:'Add Post',
          icon:<AddCircleOutlineSharpIcon/>,
          path:`${props.match.url}/createPost`
      },
      {
        name:'Feed',
        icon:<DynamicFeedIcon/>,
        path:`${props.match.url}`
      },
      {
          name:'Settings',
          icon: <SettingsIcon/>,
          path:`${props.match.url}/settings`
      },
      {
        name:'Likes',
        icon:<FavoriteSharpIcon/>,
        path:`${props.match.url}/likes`
    },
      {
          name:'Following',
          icon: <PersonIcon/>,
          path: `${props.match.url}/following`

      },
      {
          name:'Followers',
          icon:<PeopleIcon/>,
          path:`${props.match.url}/followers`
      },
      {
          name:'My Cars',
          icon:<DirectionsCarIcon/>,
          path:`${props.match.url}/mycars`
      },
      {
          name:'recommendations',
          icon:<FeaturedPlayListSharpIcon/>,
          path:`${props.match.url}/recommendations`
      },
      {
          name:'Cart',
          icon: <Badge badgeContent={cartItemsVar().reduce((accumulator,currentValue) => {
            return accumulator+currentValue.qty;
          },0)} color="primary"><ShoppingBasketOutlinedIcon/></Badge>,
          path: `${props.match.url}/cart`
      },
      {
          name:'logout',
          icon:<ExitToAppSharpIcon/>,
          path:`${props.match.url}/logout`
      }
  ]

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar,classes.colorChange, {
          [classes.appBarShift]: open,
        })}

      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {props.location.pathname.split('/')[props.location.pathname.split('/').length - 1].toUpperCase()}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,  
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuListChoice.map((text) => (
            <ListItem onClick = {async () => {
                if(text.path === `${props.match.url}/logout`){
                        client.writeQuery({
                            query:IS_LOGGED_IN,
                            data:{isLoggedin:false}
                        })
                        localStorage.removeItem('token');
                        await client.clearStore();
                        client.writeQuery({
                            query:IS_LOGGED_IN,
                            data:{isLoggedin:!!localStorage.getItem('token')}
                        })
                        return props.history.push('/login');
                    
                }
                return props.history.push(text.path)
                }
                } button key={text.id}>
              <ListItemIcon>{text.icon}</ListItemIcon>
              <ListItemText primary={text.name} />  
            </ListItem>  
          ))}
        </List>
      </Drawer>

    </div>
  );
}

/*const GET_USER = gql`
    query getUserById($userId:String!){
        getUser(userId:$userId){
            user_image{
                path   
            }
        }
}
`*/
export default MiniDrawer;