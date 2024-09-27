import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// import App from './App';
import reportWebVitals from './reportWebVitals';
// import Login from './forms/login';
// import App from './router/app';
// import Product from './products/product';
// import Car from './cars/car';
// import Products from './store/products';
// import First  from './first/first';
// import TextField from './forms/textfield';
// import Fruits from './fruits/fruit';
// import Student from './students/student';
// import Employe from './employes/employe';
// import Counter from './counter/counter';
// import Event from './events/event';
// import Form from './forms/form';
import Store from './project/Store';
const root = ReactDOM.createRoot(document.getElementById('root'));
// const fruitsArray =[
//   "orange",
//         "apple",
//         "bannan",
//         "watermelon"
// ]
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <First lastname="adidi"/>
    
    <TextField inputName="firstname" label="firstname">
    enter your firstname 
    </TextField>
    <TextField inputName="lastname" label="lastname" >
       enter your lastname 
    </TextField> */}

    {/* <Fruits initialFruits={[]}/> */}
    {/* <Student initialStudent={[]}/> */}
    {/* <Employe initialEmolye={[]}/> */}
    {/* <Products/> */}
    {/* <Product initialProduct={[]}/> */}
    {/* <Car initialCars={[]}/> */}
    {/* <Counter initialValue={2} step={3}/> */}
    {/* <Counter /> */}
      {/* <Event/> */}
      {/* <Form/> */}
      {/* <Login/> */}
      {/* <App/> */}
      <Store/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
