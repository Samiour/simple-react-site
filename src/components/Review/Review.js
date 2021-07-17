import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const[cart,setCart]=useState([]);
    const[orderPlaced,setOrderPlaced]=useState(false);
    const history=useHistory();

    const handleProceedCheckOut=()=>{
    //  setCart([]);
    //  setOrderPlaced(true);
    //  processOrder();
    
    history.push('/shipment');
    
    }
    
    const removeProduct=(productKey)=>{
        // console.log("removed clicked",productKey);
        const newCart=cart.filter(pd=>pd.key!==productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(()=>{
    const savedCart=getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    

    fetch('http://localhost:5000/productsByKeys',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(productKeys)
    })
    .then(res=>res.json())
    .then(data=>setCart(data))
  
    },[]);
   
    let thankyou;
    if(orderPlaced){
        thankyou=<img src={happyImage} alt=""/>
    }
    
    return (
        <div className="shop-container">
           
           <div className="product-container">
           {
               cart.map(pd =><ReviewItem 
                product={pd}
               key={pd.key}
               removeProduct={removeProduct}
               >
               </ReviewItem>)
           }
           {thankyou}
           </div>

           <div className="cart-container">
               <Cart cart={cart}>
                   <button onClick={handleProceedCheckOut} className='cart-button'>Proceed CheckOut</button>
               </Cart>

           </div>

        </div>
    );
};

export default Review;