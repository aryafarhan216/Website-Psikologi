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
