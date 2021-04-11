import {useEffect , useState} from "react"
import {BrowserRouter as Router , Route} from 'react-router-dom';

import './App.css';

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/Product/ProductDetails";


//Auth imports
import Login from "./components/user/Login";
import Register from "./components/user/register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/updateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

//Cart Imports
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import OrderSuccess from "./components/Cart/OrderSuccess";

//Order Imports
import ListOrders from "./components/orders/ListOrders";
import OrderDetails from "./components/orders/OrderDetails";

// Admin Imports
import Dashboard from "./components/admin/Dashboard";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";

import ProtectedRoute from "./components/Route/ProtectedRoute";
import {loadUser} from "./actions/userActions";
import {useSelector} from "react-redux";
import store from "./Store";
import axios from "axios";

//Payment
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import ProductsList from "./components/admin/ProductsList";

function App() {

  const [stripeApiKey , setStripeApiKey] = useState('');

  useEffect(() =>{
   store.dispatch(loadUser())

   async function getStripeApiKey(){
     const {data} = await axios.get('/api/v1/stripeapi');
     setStripeApiKey(data.stripeApiKey)
   }

   getStripeApiKey();
   
  } ,[])

  const {user ,isAuthenticated, loading} = useSelector(state => state.auth)


  return (
    <Router>
    <div className="App">
     <Header />
     <div className="container container-fluid">
     <Route path="/" component={Home} exact />
     <Route path="/search/:keyword" component={Home} />
     <Route path="/product/:id" component={ProductDetails} exact />

     <Route path="/cart" component={Cart} exact />
     <ProtectedRoute path="/shipping" component={Shipping} />
     <ProtectedRoute path="/order/confirm" component={ConfirmOrder} />
     <ProtectedRoute path="/success" component={OrderSuccess} />

     <ProtectedRoute path="/orders/me" component={ListOrders} exact/>
     <ProtectedRoute path="/order/:id" component={OrderDetails} exact/>

    

     {stripeApiKey && 
       <Elements stripe={loadStripe(stripeApiKey)}>
         <ProtectedRoute path="/payment" component={Payment} />
       </Elements>
     }

     <Route path="/login" component={Login}  />
     <Route path="/register" component={Register}  />
     <ProtectedRoute path="/me" component={Profile} exact/>
     <ProtectedRoute path="/me/update" component={UpdateProfile} exact/>
     <ProtectedRoute path="/password/update" component={UpdatePassword} exact/>
     <Route path="/password/forgot" component={ForgotPassword} exact />
     <Route path="/password/reset/:token" component={NewPassword} exact />

     </div>

     <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact />
     <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductsList} exact />
     <ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct} exact />  
     <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact />  
    <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProcessOrder} exact /> 
     <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrdersList} exact />   

      <ProtectedRoute path="/admin/users" isAdmin={true} component={UsersList} exact /> 
      <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser} exact /> 
      <ProtectedRoute path="/admin/reviews" isAdmin={true} component={ProductReviews} exact />    

      {!loading && (!isAuthenticated || user.role !== 'admin') && (
          <Footer />
        )}
    
    </div>
    </Router>
  );
}

export default App;
