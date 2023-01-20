import "../styleGlobal.css"
import{
    Button, 
    Row,
    Col,
    Card,
    Container
} from "react-bootstrap"
import { Link } from "react-router-dom"
// images
import section1Img from "../Images/User/section1IMG.png"
import section2Img from "../Images/User/section2IMG.png"
import section3Img from "../Images/User/section3IMG.png"
import alur1 from "../Images/User/alur1.png"
import alur2 from "../Images/User/alur2.png"
import alur3 from "../Images/User/alur3.png"
import alur4 from "../Images/User/alur4.png"
// images psikolog
import psikolog1 from "../Images/User/psikolog/1.png"
import psikolog2 from "../Images/User/psikolog/2.png"
import psikolog3 from "../Images/User/psikolog/3.png"
import psikolog4 from "../Images/User/psikolog/4.png"


function HomePage (){
    return(
        <>
        {/* Section 1 */}
        <section className="section1 h-100 py-5">
        <h1 className="text-center">
            Bicarakan <span className="mainColor"><em>isi hatimu</em></span>, <br />
            temukan jalan<br />
            keluar atas masalahmu
        </h1> 
        <div className="d-flex justify-content-center">
        <Link to="/user/jadwal"><Button  className="align-self-center my-2 buttons px-5 fontNav">Penjadwalan</Button></Link>
        </div>
        <div className="d-flex justify-content-center">
            <img
                src={section1Img}
                alt="section1"
                style={{
                    width:"25%"
                }}

            />
        </div>
        </section>
        {/* End of Section 1 */}
        {/* Section 2 */}
        <section className="section2 backColor px-3 py-2">
            <Container>
        <Row className="h-100 mx-5" md>
            <Col className="align-self-center mb-2" >
            <h1 className="mb-0  text-md-left">
            Sehat <span className="mainColor">Mental</span>,
            </h1> 
            <h3 className="">Kerja Maksimal Kemudian</h3>
            <div className="text-md-left  ">
                <p className="mb-0">Yuk ngobrol dengan psikolog tersertifikasi. <br />
                    Kamu bisa ngobrol soal asmara, pendidikan, <br />
                    urusan kantor, hingga masalah pribadi. <br />
                    Semua obrolan dijamin kerahasiaannya.</p>
            </div>
            </Col>
            <Col md>
                <img 
                src={section2Img}
                alt="section2"
                style={{
                    width:"80%"
                }}
                />
            </Col>
        </Row>
        </Container>
        </section>
        {/* End of Section 2 */}
        {/* Section 2 */}
        <section className="section3 px-3 py-2">
            <Container>
        <Row className="h-100 mx-5" md>
            <Col md className="py-3">
            <img 
                src={section3Img}
                alt="section3"
                style={{
                    width:"70%"
                }}
                />
            </Col>
            <Col md className="align-self-center mb-2">
            <h1 className="mb-0  text-md-left">
            Layanan Konsultasi
            </h1> 
            <h3 className="">di <span className="mainColor">YSDM</span></h3>
            <div className="text-md-left  ">
                <p className="mb-0">
                PSIKOTES, ASSESSMENT CENTER,<br />
                CERAMAH, KONSELING,<br />
                TRAINING / <br />
                PELATIHAN SDM <br />
                </p>
            </div>
            <Link to="/user/layananKonseling"><Button  className="align-self-center my-2 buttons px-5 fontNav">Lebih Lanjut</Button></Link>
            </Col>
        </Row>
        </Container>
        </section>
        {/* End of Section 3 */}
        {/* Section 3.5 */}
        <section className="section3.5">
            <Container>
            <h4 className="text-center mt-3">Alur <span className="mainColor">Penjadwalan</span> </h4>
            <Row className="mx-5 mt-3 d-flex align-items-end">
                <Col md>
                <div className="d-flex justify-content-center">
                    <img 
                        src={alur1}
                        alt="alur1"
                        style={{
                            width:"70%"
                        }}
                        />
                </div>
                    <p className="text-center fontNav">Chat Admin</p>
                </Col>
                <Col md>
                <div className="d-flex justify-content-center">
                    <img 
                        src={alur2}
                        alt="alur2"
                        style={{
                            width:"70%"
                        }}
                        />
                </div>
                    <p className="text-center fontNav">Isi Form</p>
                </Col>
                <Col md>
                <div className="d-flex justify-content-center">
                    <img 
                        src={alur3}
                        alt="alur3"
                        style={{
                            width:"80%"
                        }}
                        />
                </div>
                    <p className="text-center fontNav">Pembayaran</p>
                </Col>
                <Col md>
                <div className="d-flex justify-content-center">
                    <img 
                        src={alur4}
                        alt="alur4"
                        style={{
                            width:"80%"
                        }}
                        />
                </div>
                    <p className="text-center fontNav">Datang Ke Lokasi</p>
                </Col>
            </Row>
            </Container>
        </section>
        {/* End of Section 3.5 */}
        {/* Section 4 */}
        <section className="section2 backColor px-3 py-5 mt-3 mb-3">
            <Container>
            <div className="mx-5">
            <h4 className="mb-0">Profil Psikolog</h4>
            <h4 className="mainColor mb-3">YSDM</h4>
            <Row className="">
                <Col md className="d-flex justify-content-center mb-2">
                <Card style={{ width: '80%' }}>
                <Card.Img variant="top" src={psikolog1} />
                <Card.Body>
                    <Card.Title className="text-center">Chairiah Yulianti Siregar S.Psi., M.Psi Psikolog </Card.Title>
                    <span></span>
                </Card.Body>
                </Card>
                </Col>
                <Col md className="d-flex justify-content-center mb-2">
                <Card style={{ width: '80%' }}>
                <Card.Img variant="top" src={psikolog2} />
                <Card.Body>
                    <Card.Title className="text-center">Sarinah S.Psi., M.Psi Psikolog </Card.Title>
                    <span></span>
                </Card.Body>
                </Card>
                </Col>
                <Col md className="d-flex justify-content-center mb-2">
                <Card style={{ width: '80%' }}>
                <Card.Img variant="top" src={psikolog3} />
                <Card.Body>
                    <Card.Title className="text-center">Hasdina Trisnasuci, S.Psi,M.Psi, Psikolog </Card.Title>
                    <span></span>
                </Card.Body>
                </Card>
                </Col>
                <Col md className="d-flex justify-content-center mb-2">
                <Card style={{ width: '80%' }}>
                <Card.Img variant="top" src={psikolog4} />
                <Card.Body>
                    <Card.Title className="text-center">Achmad Irvan Dwi Putra, S.Psi,M.Psi, Psikolog       </Card.Title>
                    <span></span>
                </Card.Body>
                </Card>
                </Col>
                {/* <Col md className="d-flex justify-content-center mb-2">
                <Card style={{ width: '60%' }}>
                <Card.Img variant="top" src={psikolog} />
                <Card.Body>
                    <Card.Title className="text-center">Nama</Card.Title>
                </Card.Body>
                </Card>
                </Col>
                <Col md className="d-flex justify-content-center mb-2">
                <Card style={{ width: '60%' }}>
                <Card.Img variant="top" src={psikolog} />
                <Card.Body>
                    <Card.Title className="text-center">Nama</Card.Title>
                </Card.Body>
                </Card>
                </Col> */}
            </Row>
            </div>
            </Container>
        </section>
        {/* End of Section 4 */}

        </>
    )

}

export default HomePage
