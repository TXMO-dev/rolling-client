import { from } from '@apollo/client/core';
import React from 'react';
import {cartItemsVar} from './cache/cart.cache';
import {IconButton} from '@material-ui/core';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';


const CartButton = ({cart_post:{id,price,Images,name}}) => {
    const first_image = Images[0];      
    let qty = 1 ;        
    return (
        <IconButton onClick = {() => {
            if(cartItemsVar().find(cartObj => cartObj.id === id)){
                
                return cartItemsVar().forEach(cart => {
                    if(cart.id === id){
                        return cart.qty +=1;
                    }
                    }); 
            } else{
                return cartItemsVar([...cartItemsVar(),{id,price,first_image,name,qty}])        
                }        
            }
            } aria-label="shopping cart">
                <AddShoppingCartOutlinedIcon/>   
        </IconButton>     
    )
}

export default CartButton;