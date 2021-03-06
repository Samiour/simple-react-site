import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {

  const [loggedInUser,setLoggedInUser]=useContext(UserContext)

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
    const savedCart=getDatabaseCart();
    const orderDetails={...loggedInUser,products:savedCart,shipment:data,orderTime:new Date()};
     
    fetch('http://localhost:5000/addOrder',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(orderDetails)

    })
    .then(res=>res.json())
    .then(data=>{
      if(data){
        processOrder();
        alert('your order placed successfully');
      }
    })
  }

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>


     

  
       <input name='name' {...register("exampleRequired", { required: true })} placeholder="Your Name" />
      {errors.exampleRequired && <span className="error">Name is required</span>}


      <input name='email'  {...register("exampleRequired", { required: true })} placeholder="Your Email"/>
      {errors.exampleRequired && <span className="error">Email is required</span>}


      <input name='address' {...register("exampleRequired", { required: true })} placeholder="Your Address"/>
      {errors.exampleRequired && <span className="error">Address is required</span>}


      <input name='phone' {...register("exampleRequired", { required: true })} placeholder="Your Phone Number"/>
      {errors.exampleRequired && <span className="error">Phone Number is required</span>}

      
      <input type="submit" />
    </form>
  );
};

export default Shipment;