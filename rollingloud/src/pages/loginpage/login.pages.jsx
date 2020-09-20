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
import {useMutation,useApolloClient} from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import classname from 'classname';   

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

const IS_LOGGED_IN = gql`
{
    isLoggedin @client
}
`;

const LoginPage = (props) => {
  const classes = useStyles();
  const client = useApolloClient();

  const [login,setlogin] = useState({
      email:"",
      password:""
  })

  const [loginDispatch,{loading}] = useMutation(LOGIN_USER,{
      update(_,{data:{login}}){
            if(login){
                props.history.push('/dashboard')
            }
      },
      onError(e){
          alert(`${e.graphQLErrors[0].message}`);
      },
      onCompleted({login}){
          localStorage.setItem('token',login.token);
          const {isLoggedin}  = client.readQuery({
            query:IS_LOGGED_IN
        });

        client.writeQuery({
            query:IS_LOGGED_IN,
            data:{isLoggedin:!isLoggedin}
        })
        alert('you have successfully Logged In');
      }
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
      setlogin({...login,[name]:value});
  }

  const handleSubmit = e => {
      e.preventDefault();
      loginDispatch({variables:{...login}})

  }

  const {email,password} = login;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
            value={email}
            autoComplete="email"
            onChange={handleChange}
            autoFocus
          />     
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            type="password"
            label="Password"
            value={password}
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
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

const LOGIN_USER = gql`
mutation loginUser(
    $email:String!,
    $password:String!
  ){
  login(loginInput:{
    email:$email,
    password:$password
  }){
    id 
    full_name
    email
    username
    roles
    token
  }
}

`

export default LoginPage;   