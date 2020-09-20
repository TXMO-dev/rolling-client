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



const CreatePostComponent = (props) => {
  const classes = useStyles();
  const [createcar,setcreatecar] = useState({
      name:"",
      description:"",
      condition:"",
      category:"",
      deal:"",
      price:"" * 1
    })

    const {name,condition,description,category,deal,price} = createcar;
    const client = useApolloClient();

    const [createpostDispatch,{loading}] = useMutation(CREATE_POST,{
        update(_,{data:{createCar}}){
            
            if(createCar){   
                props.history.push('/dashboard');     
            }

        },
        onError(e){
                alert(`${e}`);  
        },
        onCompleted({createCar}){   
                
                alert('you have successfully created a post');   
        },
        variables:createcar
    });

    const handleChange = e => {
        const {name,value} = e.target;
        setcreatecar({...createcar,[name]:value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        createpostDispatch();
        setcreatecar({});
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
            label="Car Name"
            name="name"
            value={name}
            onChange={handleChange}
            autoComplete="current-car-name"
            autoFocus
          />     
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            type="text"
            value={description}
            onChange={handleChange}
            autoComplete="current-description"     
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="price"
            type="number"
            label="Price"
            onChange={handleChange}
            value={price}
            autoComplete="current-price"
          />
          
          <FormControl fullWidth className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">Condition</InputLabel>
                <Select
                name="condition"
                value={condition}
                onChange={handleChange}
                >
                    <MenuItem value={'New'}>New</MenuItem>
                    <MenuItem value={'Used'}>Used</MenuItem>
                </Select>
                <FormHelperText>choose any of these options</FormHelperText>
        </FormControl> 
        <FormControl fullWidth className={classes.formControl}>
                <InputLabel>Category</InputLabel>
                <Select
                name="category"
                value={category}
                onChange={handleChange}
                >
                    <MenuItem value={'SUV'}>SUV</MenuItem>
                    <MenuItem value={'Sedan'}>Sedan</MenuItem>
                    <MenuItem value={'Hatchback'}>Hatchback</MenuItem>
                    <MenuItem value={'Sports Car'}>Sports Car</MenuItem>
                    <MenuItem value={'Coupe'}>Coupe</MenuItem>
                    <MenuItem value={'Compact Car'}>Compact Car</MenuItem>
                    <MenuItem value={'Convertible'}>COnvertible</MenuItem>
                    <MenuItem value={'Minivan'}>Minivan</MenuItem>
                    <MenuItem value={'Truck'}>Truck</MenuItem>
                    <MenuItem value={'Station Wagon'}>Station Wagon</MenuItem>
                    <MenuItem value={'Crossover'}>Crossover</MenuItem>
                    <MenuItem value={'Utility Vehicle'}>Utility Vehicle</MenuItem>
                    <MenuItem value={'Hybrid'}>Hybrid</MenuItem>
                    <MenuItem value={'Electric'}>Electric</MenuItem>
                    <MenuItem value={'Luxury Vehicle'}>Luxury Vehicle</MenuItem>
                    <MenuItem value={'Van'}>Van</MenuItem>
                    <MenuItem value={'Pickup'}>Pickup</MenuItem>
                    <MenuItem value={'Off-road'}>Off Road</MenuItem>
                    <MenuItem value={'Mid-size'}>Mid Size</MenuItem>
                    <MenuItem value={'Full-size'}>Full Size</MenuItem>
                    <MenuItem value={'Roadstar'}>Roadstar</MenuItem>
                    <MenuItem value={'Other'}>Other</MenuItem>
                </Select>
                <FormHelperText>choose any of these options</FormHelperText>
        </FormControl>  
        <FormControl fullWidth className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">Deal</InputLabel>
                <Select
                name="deal"
                value={deal}
                onChange={handleChange}
                >
                    <MenuItem value={'Negotiable'}>Negotiable</MenuItem>
                    <MenuItem value={'Non-Negotiable'}>Non-Negotiable</MenuItem>
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
        </form>
      </div>
    </Container>
  );
}

const CREATE_POST = gql`
    mutation(
        $name:String!
        $description:String!
        $price:String!
        $condition:String!
        $category:String!
        $deal:String!
    ){  
        createCar(carDetails:{
            name:$name,
            description:$description,
            price:$price,
            category:$category,
            condition:$condition,
            deal:$deal
        }){
            id
            name
            description
            category
            price
            condition
            deal
            dealer
            dealer_id
            dealer_image     
            Images{
             path 
            }   
        }
    }
 `;
export default CreatePostComponent;   