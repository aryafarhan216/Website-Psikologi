import "../../styleGlobal.css"
import 
{
    Container,
    Navbar,
    Nav,
} from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
    Link,
  } from "react-router-dom";
import Avatar from 'react-avatar';
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
// images
import logo from "../../Images/User/Logo.png"
import FAvatar from "../../Images/User/FAvatar.png"

function NavbarTop() {
    const[user,setUser] =useState ([])
    const navigate = useNavigate()
    useEffect(() =>{
        const user = JSON.parse(localStorage.getItem('user'))
        if(user) setUser(user)
    }, [])

    const handleLogOut = () =>{ 
        localStorage.removeItem('user');
        navigate("/")

    }

    const isLoggedIn = user?.name
    console.log("test",isLoggedIn)
    return (
        <>
        <Navbar bg="white" expand="md" className='py-3'>
        <Container>
            <Navbar.Brand href="/user/homepage">
            <img
              src={logo}
              width="30"
              className="d-inline-block align-top mr-1"
              alt="YSDM LOGO"
            />
             <span className='mainColor'> <strong>YSDM</strong> </span>
            </Navbar.Brand>
            {
                isLoggedIn
                ?
                <div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className=' justify-content-end'>
                <Nav className="">
                    <Link to="/user/layananKonseling" className='fontNav align-self-center mx-3'>Layanan Konseling</Link>
                    <Link to="/user/jadwal" className='fontNav align-self-center mx-3'>Penjadwalan</Link>
                    <Link to="/user/pesanan" className='fontNav align-self-center mx-3'>Pesanan</Link>
                    <Link to="/user/hasilPelayanan" className='fontNav align-self-center mx-3'>Hasil Pelayanan</Link>
                    {/* user */}
                    <div style={{
                        borderLeft:"6px solid black",
                        height:"100%"

                    }}></div>
                    <Nav.Link href="#link" 
                    style={{
                        borderLeft:"1px solid black",
                    }}
                    className='align-self-center pr-0 d-none d-sm-none d-md-none d-lg-block'>

                    </Nav.Link>
                    
                {/* user */}
                <Nav.Link href="#" className='fontNav align-self-center p-0 mx-0'>{user?.name}</Nav.Link>
                        <div className=" d-flex align-self-center align-items-center"> 
                        <Avatar
                            src={FAvatar}
                            size={40} 
                            round={true} 
                            className="pt-1"/>
                        </div>
                        <NavDropdown  id="basic-nav-dropdown" className="py-0 d-none d-sm-none d-md-block">
                        <NavDropdown.Item onClick={handleLogOut}>LogOut</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#" className='fontNav align-self-center p-0 mx-0 d-block d-md-none' onClick={handleLogOut}>LogOut</Nav.Link>
                </Nav>
                </Navbar.Collapse>
                </div>
                :
                <div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className=' justify-content-end'>
                <Nav className="">
                    <Link to="/user/layananKonseling" className='fontNav align-self-center mx-3'>Layanan Konseling</Link>
                    <Link to="/user/jadwal" className='fontNav align-self-center mx-3'>Penjadwalan</Link>
                    {/* user */}
                    <div style={{
                        borderLeft:"6px solid black",
                        height:"100%"

                    }}></div>
                    <Nav.Link href="#link" 
                    style={{
                        borderLeft:"1px solid black",
                    }}
                    className='align-self-center pr-0 d-none d-sm-none d-md-none d-lg-block'>

                    </Nav.Link>
                    
                {/* user */}
                <Nav.Link href="/" className='fontNav align-self-center p-0 mx-0'>Sign In</Nav.Link>
                </Nav>
                </Navbar.Collapse>
                </div>
            }
            
        </Container>
        </Navbar>
        <br />
        </>
    );
  }
  
  export default NavbarTop;