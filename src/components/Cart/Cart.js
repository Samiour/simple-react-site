import React from 'react';
import { Link } from 'react-router-dom';
import Product from '../Product/Product';
import './Cart.css';
const Cart = (props) => {
    const cart=props.cart
    const total=cart.reduce((total,prd)=>total+prd.price,0);

    // let total=0;
    // for(let i=0;i<cart.length;i++){
    //     const product=cart[i];
    //     total=total+product.price;
    // }
 
    let shippingCost=0;
    if(total>35){
        shippingCost=0;
    }
    else if(total>15){
        shippingCost=4.99;
    }
    else if(total>0){
        shippingCost=12.99;
    }

  const tax=(total/10);
  const grandTotal=(total+shippingCost+Number(tax)).toFixed(2);

  const numberFormat=(num)=>{
      const precision=num.toFixed(2);
      return Number(precision);
  }

    return (
        <div>
          <h2>Order Summary</h2>
          <p>Items Ordered :{cart.length}</p>
          <p>Product Price: ${numberFormat(total)}</p>
          <p><small>Shipping Cost: ${shippingCost}</small></p>
          <p><small>Tax+Vat: ${numberFormat(tax)}</small></p>
          <p>Total Price: ${grandTotal}</p>
          <br />
          <Link to="/review"><button className='cart-button'>Review Order</button>
          </Link>
          
        </div>
    );
};

export default Cart;