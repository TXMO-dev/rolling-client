import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    circularCntr:{
        margin:'0 auto'
    }
  },
}));

const IS_LOGGED_IN = gql`
{
    isLoggedin @client   
}
`;


const RegisterPage = (props) => {
  const classes = useStyles();
  const [Register,setRegister] = useState({
      full_name:"",
      email:"",
      username:"",
      password:"",
      confirmPassword:"",
      roles:""
    })

    const {full_name,email,username,password,confirmPassword,roles} = Register;
    const client = useApolloClient();

    const [registerDispatch,{loading}] = useMutation(REGISTER_USER,{
        update(_,{data:{register}}){
            
            if(register){   
                props.history.push('/dashboard');     
            }

        },
        onError(e){
                alert(`${e}`);  
        },
        onCompleted({register}){   
                localStorage.setItem('token',register.token);
                const {isLoggedin}  = client.readQuery({
                    query:IS_LOGGED_IN
                })
                client.writeQuery({
                    query:IS_LOGGED_IN,
                    data:{isLoggedin:!isLoggedin}
                })
                alert('you have successfully registered');   
        },
        variables:Register
    });

    const handleChange = e => {
        const {name,value} = e.target;
        setRegister({...Register,[name]:value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        registerDispatch();
        setRegister({})
    }

    if(loading){
        return (
            <div className={classname(classes.root,classes.circularCntr)}>
              <CircularProgress />
            </div>
          );
    }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit = {handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="text"
            label="Full Name"
            name="full_name"
            value={full_name}
            onChange={handleChange}
            autoComplete="current-full-name"
            autoFocus
          />     
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            value={email}
            onChange={handleChange}
            autoComplete="current-email"     
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="username"
            type="text"
            label="Username"
            onChange={handleChange}
            value={username}
            autoComplete="current-username"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            type="password"
            label="Password"
            onChange={handleChange}
            value={password}
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            onChange={handleChange}
            value={confirmPassword}
            autoComplete="current-password-username"
          />
         {/*<TextField  
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="roles"
            type="text"
            label="Roles"
            onChange={handleChange}
            value={roles}
            autoComplete="current-roles"   
         /> */}
          
          <FormControl fullWidth className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">Roles</InputLabel>
                <Select
                name="roles"
                value={roles}
                onChange={handleChange}
                >
                    <MenuItem value={'User'}>User</MenuItem>
                    <MenuItem value={'Dealer'}>Dealer</MenuItem>
                </Select>
                <FormHelperText>choose any of these options</FormHelperText>
        </FormControl>        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign up
          </Button>   
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account? Sign In"}    
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

const REGISTER_USER = gql`
    mutation register(
        $full_name:String!,
        $email:String!,
        $username:String!,
        $password:String!,
        $confirmPassword:String!,
        $roles:String!
    ){
        register(registerInput:{
            full_name:$full_name,
            email:$email,
            username:$username,
            password:$password,
            confirmPassword:$confirmPassword,
            roles:$roles
        }){
            full_name
            username
            user_image{
              path
            }
            token   
        }
    } 
 `;
export default RegisterPage;   