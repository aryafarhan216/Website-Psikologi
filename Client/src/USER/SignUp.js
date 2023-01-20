import 
{
    Container,
    Row,
    Col,
    Form,
    Button
} from 'react-bootstrap';
import '.././styleGlobal.css'
import {useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import validator from 'validator';
// Images
import logo from "../Images/User/Logo.png"
import displayLogin from "../Images/User/Login.png";


function SignUp() {

    const [users, setUsers] = useState({
        name : "",
        email : "",
        password : ""
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUsers((prev) => ({...prev, [e.target.name]: e.target.value}))
    };
    const emailValid = validator.isEmail(users.email)
    console.log(emailValid)

    const handleClick = async e =>{
        e.preventDefault()
        try {
            if(emailValid){
                await axios.post("http://localhost:8800/signUp", users)
                navigate("/")
            }else{
                alert("Email not Valid")
            }
            //
        }catch(err){
            console.log(err)
        }
    }
    console.log(users)

    return (
        <>
        <Container>
            <Row className="vh-100 py-2">
                <Col className="displayLogin align-self-center d-sm-none d-none d-md-block" md>
                    <h3 className="mb-0" style={{
                        color :"#01A553"
                    }}>YSDM</h3>
                    <h6 className="my-0"><em>SDM CONSULTING</em></h6>
                    {/* Images */}
                    <img 
                    src={displayLogin} 
                    alt="displayLogin"
                    style={{
                        width:"100%"
                        
                    }} 
                    />
                    {/* Qoutes */}
                    <h6 className='mb-3'><em>-”Deep breathing is our nervous <br />system's <span className='mainColor'>love language.</span> "</em></h6>

                </Col>
                
                {/* Form */}
                <Col className="align-self-center" md >
                
                <div>
                <img 
                 style={{
                    width:"15%"
                }} 
                src={logo}
                alt="logo"
                />
                <h5 className='mt-1'>Sign Up to YSDM</h5>
                <hr/>
                <Form>
                <Form.Group className="mb-1" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Your name" onChange={handleChange} name="name"/>
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleChange} name="email"/>
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleChange} name="password"/>
                </Form.Group>
                <div className="mt-3"> 
                <label><input type="radio" className="radio-group " value="Male"  onChange={handleChange} name="gender"/> Male</ label>
                <span className="mx-2"/>
                <label><input type="radio" className="radio-group" value="Female" onChange={handleChange} name="gender"/> Female </ label>
                <Button variant="success" type="submit" className='mx-3' size="sm" onClick={handleClick}>
                    Sign Up
                </Button>
                </ div>

                </Form>
                </div>
                </Col>
            </Row>
        </Container>
        </>
    );
  }
  
  export default SignUp;