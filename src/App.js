import React from 'react';
import Home from './screens/Home';
import Login from './screens/Login';

import {
  BrowserRouter as  Router,
  Routes,
  Route,
  
} from "react-router-dom"
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Signup from './screens/Signup.js';
import { CartProvider } from './components/ContextReducer.js';
import MyOrder from './screens/MyOrders.js';


function App() {
  return (
<CartProvider>

  <Router>
    <div >
      <Routes>
        <Route excat path='/' element ={ <Home />}/>
        <Route excat path='/login' element ={ <Login />}/>
        <Route excat path='/createuser' element ={ <Signup />}/>
        <Route excat path='/myOrder' element ={ <MyOrder />}/>
      </Routes>

    </div>
    
    </Router>
  </CartProvider>
  )
}

export default App;
