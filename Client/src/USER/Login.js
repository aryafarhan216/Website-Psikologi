import 
{
    Container,
    Row,
    Col,
    Form,
    Button
} from 'react-bootstrap';
import '.././styleGlobal.css'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
// Images
import logo from "../Images/User/Logo.png"
import displayLogin from "../Images/User/Login.png";


function Login() {
    const navigate = useNavigate()
    const [userLogin, setUserLogin] = useState({
        email : "",
        password : ""
    });

    const handleChange = (e) => {
        setUserLogin((prev) => ({...prev, [e.target.name]: e.target.value}))
    };
    const handleClick = async e =>{
        e.preventDefault()
        try {
               const cek = await axios.post("http://localhost:8800/user", userLogin )
               if(cek.data[0].password === userLogin.password){
                navigate("/user/homepage")
                localStorage.setItem('user', JSON.stringify(cek.data[0]));
               }else{
                alert("Tidak Terdaftar")
               }
        }catch(err){
            console.log(err)
        }
        
    }
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
                    <h6 className=''><em>-”Deep breathing is our nervous <br />system's <span className='mainColor'>love language.</span> "</em></h6>

                </Col>
                
                {/* Form */}
                <Col className="align-self-center" md >
                
                <div>
                <img 
                 style={{
                    width:"20%"
                }} 
                src={logo}
                alt="logo"
                />
                <h5 className='mt-2'>Sign In to YSDM</h5>
                <hr/>
                <Form>
                <Form.Group className="mb-1" controlId="formBasicEmail" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleChange} name="email"/>
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicPassword" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleChange} name="password"/>
                </Form.Group>
                <Button variant="success" type="submit" className='mt-2' onClick={handleClick}>
                    Sign In
                </Button>
                <p className='mt-1'><small><em>not a member?<Link to="signUp" className='mainColor mx-1' >Sign Up</Link> </em></small>or a <Link to="/user/homepage" className='mainColor mx-1' >Guest</Link></p>
                </Form>
                </div>
                </Col>
            </Row>
        </Container>
        </>
    );
  }
  
  export default Login;