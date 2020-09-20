import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import classname from 'classname'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Rolling Loud
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ResetPage = (props) => {
  const classes = useStyles();
    const [reset_new_password,set_new_reset_password] = useState({
        reset_token:`${props.match.params.resetToken}`,
        new_password:"",
        confirm_new_password:""
});
const {new_password,confirm_new_password} = reset_new_password;

const [reset_dispatch,{loading}] = useMutation(RESET_CHANGE_PASSWORD,{
    update(_,{data:{resetChangePassword}}){

             props.history.push('/login')
       
    },
    onError(e){
        alert(`${e.graphQLErrors[0].message}`)
    },
    onCompleted(){
        alert('password reset has been done successfully')
    },
    variables:reset_new_password
})
if(loading){
    return (
        <div className={classname(classes.root,classes.circularCntr)}>
          <CircularProgress />
        </div>
      );
}

const handleChange = e => {
    const {name,value} = e.target;
    set_new_reset_password({...reset_new_password,[name]:value})
}
const handleSubmit = e => {
    e.preventDefault();
    reset_dispatch();
    set_new_reset_password({});
}
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         Reset Password
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>   
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            label="New Password"
            name="new_password"
            value={new_password}
            onChange={handleChange}
            autoComplete="email"
            autoFocus
          />   
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            label="Confirm New password"
            name="confirm_new_password"
            autoComplete="email"
            value={confirm_new_password}
            onChange={handleChange}
            autoFocus
          />   
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Reset
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/login" variant="body2">
                Login?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}  
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
const RESET_CHANGE_PASSWORD = gql`
mutation ResetChangePassword(
    $reset_token:String!,
    $new_password:String!,
    $confirm_new_password:String!){
  resetChangePassword(resetChangeInput:{
    reset_token:$reset_token,
    new_password:$new_password,
    confirm_new_password:$confirm_new_password
  }){
    username
    description
  }
}
`
export default ResetPage;     