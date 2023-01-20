import './App.css';
import React from "react";
import Login from './USER/Login.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SignUp from './USER/SignUp';
import WrapingUser from './USER/WrapingUser';
import WrapingAdmin from './ADMIN/WrapingAdmin';
import HomePage from "./USER/HomePage";
import LayananToko from "./USER/LayananToko";
import Pesanan from "./USER/Pesanan";
import FormPesanan from "./USER/FormPesanan";
import TransaksiSukses from "./USER/TransaksiSukses";

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/signUp' element={<SignUp />}/>
      <Route path='/user/:name' element={<WrapingUser />}/>
      <Route path='/admin/:page' element={<WrapingAdmin />}/>
      </Routes>
    </Router>
  );
}
export default App;
