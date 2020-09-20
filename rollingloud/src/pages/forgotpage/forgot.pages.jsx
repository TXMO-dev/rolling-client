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
import {useMutation} from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import gql from 'graphql-tag';
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

const ForgotPage = (props) => {
  const classes = useStyles();
  const [reset,setreset] = useState({email:""});

  const {email} = reset;
  const [forgotDispatch,{loading}]=useMutation(SEND_RESET_EMAIL,{
      update(_,{data:{resetPassword}}){
          props.history.push('/login')
      },
      onError(e){
          alert(`${e.graphQLErrors[0].message}`);
      },
      onCompleted(){
          alert('an email has been sent to your email, to reset your password');
      },
      variables:reset  
  })

  const handleChange = e => {
      const {name,value} = e.target;
      setreset({...reset,[name]:value});
  }
  if(loading){
    return (
        <div className={classname(classes.root,classes.circularCntr)}>
          <CircularProgress />
        </div>
      );
}

  const handleSubmit = e => {
      e.preventDefault();
      forgotDispatch();
      setreset({});
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Enter Email To Reset Password
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>   
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            label="Email Address"
            name="email"
            onChange={handleChange}
            value={email}
            autoComplete="email"
            autoFocus
          />     
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            SEND
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

const SEND_RESET_EMAIL = gql`
 mutation resetpassword($email:String!){
  resetPassword(email:$email){
    full_name
  }
}
`

export default ForgotPage;     