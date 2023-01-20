import "../../styleGlobal.css"
import 
{
    Container,
    Row,
    Col
} from 'react-bootstrap';
// images
import logo from "../../Images/User/Logo.png"

function FooterBot () {
    return(
        <>
        <footer>
            <Container>
                <Row className="pb-3 mb-4 mt-5">
                    <Col xs={2}>
                    <img 
                        src={logo}
                        style={{
                            width:"50%"
                        }}
                        alt="YSDM LOGO"
                    />
                    </Col>
                    <Col>
                    <h6>Alamat</h6>
                    <p className="fontNav">Jl. Setia Budi No 176 Medan.</p>
                    </Col>
                    <Col>
                    <h6>Pelajarin</h6>
                    <p className="fontNav mb-0"><a>Layanan Konseling</a></p>
                    <p className="fontNav mb-0"><a>Penjadwalan</a></p>
                    <p className="fontNav mb-0"><a>Pesanan</a></p>
                    <p className="fontNav mb-0"><a>Hasil Pelayanan</a></p>
                    
                    </Col>
                </Row>
            </Container>
        </footer>
        </>
    )
}

export default FooterBot