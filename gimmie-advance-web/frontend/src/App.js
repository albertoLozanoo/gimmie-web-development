import {BrowserRouter as Router,Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import Home from './screens/home/Home';
import Products from './screens/products/Products';
import Cart from './screens/cart/Cart';
import Login from './screens/login/Login';
import Register from './screens/register/Register';
import Bills from './screens/bills/Bills';
import Customers from './screens/customers/customers';
import Profile from './screens/profile/Profile';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={
            <ProtectedRouter>
              <Home />
            </ProtectedRouter>
          } />
          <Route path="/products" element=
          {
            <ProtectedRouter>
              <Products />
            </ProtectedRouter>
          } />
          <Route path="/cart" element={
            <ProtectedRouter>
              <Cart />
            </ProtectedRouter>
          } />
          <Route path="/bills" element={
            <ProtectedRouter>
              <Bills />
            </ProtectedRouter>
          } />
          <Route path="/customers" element={
            <ProtectedRouter>
              <Customers />
            </ProtectedRouter>
          } />
          <Route path="/users" element={
            <ProtectedRouter>
              <Profile />
            </ProtectedRouter>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;


export function ProtectedRouter({children}){
  if(localStorage.getItem("auth")){
    return children;
  }else{
    return <Navigate to="/login" />
  }
}