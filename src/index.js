import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SideBarContextProvider from './Context/SideBarContext';
import CartContextProvider from './Context/CartContext';
import TokenContextProvider from './Context/TokenContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TokenContextProvider>


  <CartContextProvider>


  <SideBarContextProvider>

  
  <React.StrictMode>
    <App />
  </React.StrictMode>

  </SideBarContextProvider>

  </CartContextProvider>

  </TokenContextProvider>
);

