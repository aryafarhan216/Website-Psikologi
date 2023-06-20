import{
    Row,
    Col,
    Nav,
    Button,
    Offcanvas
} from 'react-bootstrap';
import React, { useState } from 'react';
import {
    Link,
  } from "react-router-dom";
import '../styleGlobal.css'

// Icons
import {MdDateRange, MdOutlineSpaceDashboard, MdAttachMoney, MdOutlineSupervisedUserCircle, MdOutlineVerifiedUser, MdOutlineChat, MdMenu, MdCompress} from 'react-icons/md'
import {GoSignOut} from 'react-icons/go'
// images
import logo from "../Images/User/Logo.png"
import Dashboard from './PAGES/Dashboard';
import Jadwal from './PAGES/Jadwal';
import Hasil from './PAGES/Hasil';
import Keuangan from './PAGES/Keuangan';
import Penjadwalan from './PAGES/Penjadwalan';
import { useParams } from 'react-router-dom';
import ChatSupport from './PAGES/ChatSupport';
import Voucher from './PAGES/Voucher';


function WrapingAdmin () {
    const { page } = useParams()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const adminPage = () =>{
        switch(page){
          case "dashboard":
            return <Dashboard />
            break
          case "penjadwalanPsikolog":
            return <Penjadwalan />
            break
          case "dataKeuangan":
            return <Keuangan />
            break
            case "dataJadwal":
                return <Jadwal />
                break
            case "dataHasil":
                return <Hasil />
                break
            case"chat":
                return <ChatSupport />
                break
            case"voucher":
                return <Voucher />
                break
    
    
          default: return <h1 className="text-center my-5">404</h1>
        }
      }
    return(
    <>
    {/* Menu MD */}
    <Offcanvas show={show} onHide={handleClose} className="backColor">
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <seciton >
            <div className='d-flex justify-content-center'>
                <img 
                src={logo}
                style={{
                    width:"30%"
                }}
                alt="YSDM LOGO"
            />
            </div>
            <p className='text-center mb-0 mt-3'><strong>Admin</strong></p>
            <p className='text-center mb-0'><em>02/Januari/2023</em></p>
            <p className='text-center '><em>09:00 PM</em></p>
            <div className='px-3'>
            <hr />
            </div>
        </seciton>
        <div className=''>
        <Nav className="flex-column">
        <Link to="/admin/dashboard" className='d-flex align-items-center'><MdOutlineSpaceDashboard /> <span className='px-1'>Dashboard</span></Link>
        <Link to="/admin/penjadwalanPsikolog" className='d-flex align-items-center'><MdDateRange /> <span className='px-1'>Penjadwalan Psikolog</span></Link>
        <Link to="/admin/dataKeuangan" className='d-flex align-items-center'><MdAttachMoney /> <span className='px-1'>Data Keuangan</span></Link>
        <Link to="/admin/dataJadwal" className='d-flex align-items-center'><MdOutlineSupervisedUserCircle /> <span className='px-1'>Data Jadwal</span></Link>
        <Link to="/admin/dataHasil" className='d-flex align-items-center'><MdOutlineVerifiedUser /> <span className='px-1'>Data Hasil</span></Link>
        <Link to="/admin/voucher" className='d-flex align-items-center'><MdCompress /> <span className='px-1'>Voucher</span></Link>
        <Link to="/admin/chat" className='d-flex align-items-center'><MdOutlineChat /> <span className='px-1'>Chat</span></Link>
        <div className='px-3'>
            <hr />
            </div>
            <Link to="#" className='d-flex align-items-center'><GoSignOut /> <span className='px-1'>Leave</span></Link>
        </Nav>
        </div>
        </Offcanvas.Body>
    </Offcanvas>

    <Button className="d-lg-none backColor1 border-0 mt-3 mx-3 " onClick={handleShow}>
            <span><MdMenu /></span>
        </Button>
    {/* End oF Menu MD */}

    <Row>
        {/* SideBar */}
        <Col className='sidebar mr-0 backColor ' xs={0} lg={2}>
            <div className='d-lg-block vh-100 pt-4 d-none'>
            <seciton className="">
                <div className='d-flex justify-content-center'>
                    <img 
                    src={logo}
                    style={{
                        width:"30%"
                    }}
                    alt="YSDM LOGO"
                />
                </div>
             <p className='text-center mb-0 mt-3'><strong>Admin</strong></p>
             <p className='text-center mb-0'><em>02/Januari/2023</em></p>
             <p className='text-center '><em>09:00 PM</em></p>
             <div className='px-3'>
                <hr />
             </div>
            </seciton>
            <div className=''>
            <Nav className="flex-column">
            <Link Link to="/admin/dashboard" className='d-flex align-items-center'><MdOutlineSpaceDashboard /> <span className='px-1'>Dashboard</span></Link>
            <Link Link to="/admin/penjadwalanPsikolog" className='d-flex align-items-center'><MdDateRange /> <span className='px-1'>Penjadwalan Psikolog</span></Link>
            <Link Link to="/admin/dataKeuangan" className='d-flex align-items-center'><MdAttachMoney /> <span className='px-1'>Data Keuangan</span></Link>
            <Link Link to="/admin/dataJadwal" className='d-flex align-items-center'><MdOutlineSupervisedUserCircle /> <span className='px-1'>Data Jadwal</span></Link>
            <Link Link to="/admin/dataHasil" className='d-flex align-items-center'><MdOutlineVerifiedUser /> <span className='px-1'>Data Hasil</span></Link>
            <Link to="/admin/voucher" className='d-flex align-items-center'><MdCompress /> <span className='px-1'>Voucher</span></Link>
            <Link Link to="/admin/chat" className='d-flex align-items-center'><MdOutlineChat /> <span className='px-1'>Chat</span></Link>
            <div className='px-3'>
                <hr />
             </div>
            </Nav>
            </div>
            </div>
        </Col>
        {/* End of Sidebar */}
        {/* Pages */}
        <Col className='px-4' >
            {adminPage()}
        </Col>
        {/* End oF Pages */}
    </Row>
        
    </>
    )
}

export default WrapingAdmin