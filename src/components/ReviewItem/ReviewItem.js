import React from 'react';


const ReviewItem = (props) => {
    const{name,quantity,key,price}=props.product;
    const revieItemStyle={
        borderBottom:'1px solid lightgrey',
        marginBottom:'5px',
        paddingBottom:'5px',
        marginLeft:'200px'

    };
    return (
        <div style={revieItemStyle} className='review-item'>
            <h4 className='product-name'>{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>Price: ${price}</small></p>
            <br />
            <button
             className="cart-button" 
             onClick={()=>props.removeProduct(key)}>Remove Item
             </button>
        </div>
    );
};

export default ReviewItem;