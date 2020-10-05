import React from 'react';
import {useReactiveVar} from '@apollo/client'
import { cartItemsVar } from '../button/cartbutton/cache/cart.cache';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button, makeStyles, Typography} from '@material-ui/core';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import HighlightOffSharpIcon from '@material-ui/icons/HighlightOffSharp';
import { usePaystackPayment } from 'react-paystack';
import {IconButton} from '@material-ui/core';
import jwt_decode from 'jwt-decode';
import configPub from './../../utils/paystack.utils';
    
//the tax rate will depend on your location so for now its just the default one working
const TAX_RATE = 0.07;
const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
    centerTable:{
        width:'60%',
        height:'60%',
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)'
    },
    posAndCol:{
      display:'flex',
      //backgroundColor:'blue',
      //color:'white',
      justifyItems:'center',
      alignItems:'center'   
           
    }
});

const CartComponent = ({history}) => {
    const ccyFormat = (num) => {
        return `${num.toFixed(2)}`;
      }
      
      const priceRow = (qty, unit) => {
        return qty * unit;
      }
      
      const createRow = (desc, qty, unit,id) => {
        const price = priceRow(qty, unit);
        return { desc, qty, unit, price,id};
      }
      
      const subtotal = (items) => {
        return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
      }
      const cartItems = useReactiveVar(cartItemsVar);
      const rows = cartItems.map(cartObj => createRow(`${cartObj.name}`,`${cartObj.qty}` * 1,`${cartObj.price} ` * 1,`${cartObj.id}`))
        /*createRow('Paperclips (Box)', 100, 1.15),
        createRow('Paper (Case)', 10, 45.99),
        createRow('Waste Basket', 2, 17.99),*/
        
      
      const invoiceSubtotal = subtotal(rows);
      const invoiceTaxes = TAX_RATE * invoiceSubtotal;
      const invoiceTotal = invoiceTaxes + invoiceSubtotal;
      const classes = useStyles();
      const decoded_token = jwt_decode(localStorage.getItem('token'))
      const config = {
        reference: (new Date()).getTime(),
        email: decoded_token.email,
        amount: ccyFormat(invoiceTotal) * 100,  
        publicKey: configPub.publicKey,
        channels:['card','bank','bank_transfer'],
        currency:'GHS',  
        label:decoded_token.username,
        text:"checkout",
        onSuccess:() => alert('the transaction has been successful'),
        onClose:() => alert('sorry but we could not proceed with the transaction')     
    };

    const initializePayment = usePaystackPayment(config);



     
  
    

        return (cartItems.length === 0 ? 
        <Typography className = {classes.centerTable} variant="h5">You have no Items in your cart. 
                                click on <AddShoppingCartOutlinedIcon onClick = { () => history.push('/dashboard') }/> icon in your feeds section to add to cart</Typography>      
        :
        <div className = {classes.centerTable}>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">        
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price($)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit($)</TableCell>
            <TableCell align="right">Sum($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { 
          rows.map((row) => {
            return(
              <TableRow key={row.desc}>
                <TableCell>{row.desc}<IconButton onClick = {() => {
                  if(cartItems.find(cartObj => cartObj.id === row.id)){
                    return cartItemsVar(cartItems.filter(cart => cart.id !== row.id));
                   
                  }
                }}><HighlightOffSharpIcon/></IconButton></TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right">{row.unit}</TableCell>
                <TableCell align="right">{ccyFormat(row.price)}</TableCell>
              </TableRow>      
            )
            })}

          <TableRow>
            <TableCell rowSpan={3} />   
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>  
      
        
          <Button className={classes.posAndCol} color='primary' onClick = {() => initializePayment()} >{config.text}</Button>
        
          
      
      
    </TableContainer>
    </div>
    )
    
    
        
}

export default CartComponent;