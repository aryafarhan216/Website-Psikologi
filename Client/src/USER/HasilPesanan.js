import axios from "axios"
import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom';
import { Container, Stack, Row, Col, Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import { FaStar } from 'react-icons/fa'

function ModalRating(props) {

    const {data, onHide, show} = props

    const navigate = useNavigate()
    // variable Modal
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true)
    // variable handle all
    const [rate, setRate] = useState({idPsikolog : "", rating:"", ulasan:"", idDH : ""});

    useEffect(() =>{
        if (rating !== 0) setIsDisabled(false)
    }, [rating])

    function handleRating(e) {
        
        setRate({ ...rate,idPsikolog: data?.idPsikolog, rating: e.target.value, idDH : data?.idDH })
    }

    function handleUlasan(e) {
        setRate({ ...rate, ulasan: e.target.value });
    }

    const handleSubmit = async () => {
        try{
            await axios.post("http://localhost:8800/uploadRating", rate)
            setRating(0)
            window.location.reload()
        }catch(e){
            console.log(e)
        }
    }
    console.log(rate)
    return (
      <Modal
        show={show}
        onHide={onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
            <h4 className='text-center'>Rate Your Experience</h4>
            <hr />
            <div className="rating">
                <div className="App">
                    {[...Array(5)].map((star, index) => {
                        const currentRating = index + 1;
                        return(
                        <label>
                            <input 
                            type="radio" 
                            name="rating"
                            value={currentRating}
                            onChange={handleRating}
                            onClick={() => setRating(currentRating)}
                        />
                            <FaStar 
                            className='star' 
                            size={20} 
                            color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(null)}
                            />
                        </label>
                        );
                    })}
                    <p>Your rating is {rating}</p>
                </div>
            </div>
            <div className="ulasan">
            <FloatingLabel controlId="floatingTextarea2" label="Comments">
                <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                onChange={handleUlasan}
                style={{ height: '100px' }}
                />
            </FloatingLabel>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
          <Button variant="success" disabled={isDisabled}
          onClick={
          handleSubmit
          }>Done</Button>
        </Modal.Footer>
      </Modal>
    );
  }



function HasilPesanan () {
    // variable pesanan
    const [hasilData, setHasilData] = useState([])
    const [id, setId] = useState('')
    const [nama, setNama] = useState('')
    const [user, setUser] = useState({nama:"", id:""})
    // variable modal
    // variable modal
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState({idPsikolog:"", idDH:""});

    useEffect(() =>{

        const userFetch = () =>{
            const userData = JSON.parse(localStorage.getItem('user'))
            setId(userData.id)
            setNama(userData.name)
            setUser({...user, nama: nama, id: id})
            console.log("id", user.id)
        }
        const fetchDataPesanan = async () =>{
            try{
                const resPesanan = await axios.post("http://localhost:8800/user/dataHasilRating", user)
                setHasilData(resPesanan.data)
                
            }catch(e){
                console.log(e)
            }
        }
        // agar tidak overload
        if(user.id === ""){
            userFetch()
        }
        fetchDataPesanan()
    }, [user])
    console.log("isi", hasilData)
    const handleDowload = async(id) =>{
        try{
            await axios.get("http://localhost:8800/downloadDataHasil/"+id, {
            responseType: 'blob'
          })
          .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.pdf');
            document.body.appendChild(link);
            link.click();
          });
        }catch(e){
            console.log("isiEror",e)
        }
        
    }
    
    return(
        <>
        <Container>
        <section>
            {hasilData?.map((hasilData, index) =>{
                return(
            <div className="border rounded p-3 backColor mt-3" key={index}>
                <Stack direction="horizontal" gap={1}>
                    <div><p className="fontNav mb-0 text-muted">{index+1}</p></div>
                    <div> <p className="text-muted fontNav mb-0">{hasilData.status}{hasilData.idDJ}</p></div>
                </Stack>
                <Row className="d-flex align-items-center px-4 pb-2 mt-2">
                    <Col>
                    <h5 className="mb-0">{hasilData.nama}</h5>
                    <h6 >{hasilData.namaP}</h6>
                    </Col>
                    <Col>
                    <p className="mb-0"><strong>
                    {/* baru */}
                    {hasilData.idPsikolog === 1 && <span> Chairiah Yulianti Siregar S.Psi., M.Psi Psikolog </span>}
                    {hasilData.idPsikolog === 2 && <span> Sarinah S.Psi., M.Psi Psikolog</span>}
                    {hasilData.idPsikolog === 3 && <span> Hasdina Trisnasuci, S.Psi,M.Psi, Psikolog</span>}
                    {hasilData.idPsikolog === 4 && <span> Achmad Irvan Dwi Putra, S.Psi,M.Psi, Psikolog</span>}
                    </strong></p>
                    <p className="mb-0"><strong>{hasilData.pelayanan}</strong></p>
                    <p className="mb-0 text-danger">{hasilData.dateJ}</p>
                    <p className="mb-0 mt-2">File Hasil:</p>
                    <button type="button" class="btn btn-success px-5" onClick={() => {handleDowload(hasilData.idDH)}}>{hasilData.fileName}</button>
                    </Col>
                    <Col>
                    { hasilData?.rating 
                    ?
                    <div className="rating">
                    <div className="App">
                    {[...Array(hasilData?.rating)].map((star, index) => {
                        return(
                        <label>
                            <input 
                            type="radio" 
                            name="rating"
                            value={hasilData?.rating}

                        />
                            <FaStar 
                            className='star' 
                            size={20} 
                            color={"#ffc107" }
                            />
                        </label>
                        );
                    })}
                </div>
                    <p className="mb-0 mt-1 text-center">"{hasilData?.ulasan}"</p>
                    </div>
                    :
                    <div className="button">
                        <button type="button" class="btn btn-warning px-5" 
                        onClick={() => {
                            setModalShow(true)
                            setModalData({...modalData,
                            idPsikolog : hasilData.idPsikolog,
                            idDH : hasilData.idDH
                            })}}>
                        Rating pengalaman kamu</button>
                    </div>

                    }
                    
                    </Col>
                </Row>
            </div>
                )

            })} 
            
        </section>
        <ModalRating show={modalShow} onHide={() => setModalShow(false)} data={modalData} />
        </Container>

        </>
    )
}

export default HasilPesanan