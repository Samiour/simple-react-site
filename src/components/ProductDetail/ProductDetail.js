import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';
import './ProductDetail.css';


const ProductDetail = () => {
    // const{productKey}=useParams();
    // const [loading,setLoading]=useState(true);
    // const[product,setProduct]=useState({});
    // const productK=fakeData.find(pd=>pd.key===productKey);

    // useEffect(()=>{
    //     fetch('/fakeData/'+productKey)
    //     .then(res => res.json())
    //     .then(data =>{
    //         setProduct(data);
    //         setLoading(false);
    //     })
    // })



    const {productKey}=useParams();
    
    const [product,setProduct]=useState({});

    useEffect(()=>{

        fetch('http://localhost:5000/product/'+productKey)
        .then(res=>res.json())
        .then(data=>setProduct(data))
        
    },[productKey])
    // const product=fakeData.find(pd=>pd.key===productKey);
    console.log(product);
    return (
        <div>
            <h2>Your Product Detail</h2>
          {
                
               <Product showAddToCart={false} product={product}></Product>
          }
        </div>
    );
};

export default ProductDetail;