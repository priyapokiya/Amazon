import './App.css';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from './Screens/Home';
import ProducctScreens from './Screens/ProductScreens';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from './Screens/LoginScreen';
import RegisterUser from './Screens/RegisterUser';
import { useState } from 'react';
import CartScreen from './Screens/CartScreen';
import ShippingScreen from './Screens/ShippingScreen';
import Payment from './Screens/Payment';
import OrderScreen from './Screens/OrderScreen';

function App() {

  const [appState, setappState] = useState({})
  const [cartItems, setcartItems] = useState(JSON.parse(localStorage.getItem("cartItems") || "[]"))

  return (
    <BrowserRouter>
      <div className='app'>
        <Header appState={appState} setappState={setappState} setcartItems={setcartItems} cartItems={cartItems}/>
        <main className="p-2" style={{ minHeight: "86.9vh" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterUser />} />
            <Route path='/cart' element={<CartScreen cartItems={cartItems} setcartItems={setcartItems} />} />
            <Route path="/product/:id" element={<ProducctScreens setappState={setappState} cartItems={cartItems} setcartItems={setcartItems}/>} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<Payment/>} />
            <Route path='/order' element={<OrderScreen cartItems={cartItems} setcartItems={setcartItems}/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;
