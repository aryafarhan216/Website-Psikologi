import {Row, Col, Modal, Form, Button} from 'react-bootstrap';
import React from 'react';
import { useEffect, useState} from 'react';
import axios from 'axios';
import { TiDeleteOutline } from 'react-icons/ti';

function ModalVoucher (props) {
    const {data, onHide, show} = props
    // varible
    const [pelayanan, setPelayanan] = useState('')
    const [voucher, setVoucher] = useState({namaVoucher : '', jenisPelayanan:'Semua', discount:0})
    
    function handleNamaVoucher(e) {
        setVoucher({ ...voucher, namaVoucher: e.target.value });
    }

    function handleDiscountVoucher(e) {
        setVoucher({ ...voucher, discount: e.target.value });
    }

    function handleChangePelayanan(e) {
        setPelayanan(e.target.value)
        setVoucher({ ...voucher, jenisPelayanan: e.target.value });
    }


    const handleSubmit = async () =>{
        console.log("masuk")
        try{
            await axios.post("http://localhost:8800/insertVoucher", voucher)
            window.location.reload();
        }catch(e){
            console.log(e)
        }
    }
    return (
        <Modal
          show={show}
          onHide={onHide}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
          <h2>Add Voucher</h2>
          <hr />
          <div className='px-2'>
            <Row className="mt-2">
                <Col xs={5}>Nama Voucher</Col>
                <Col xs={1}>:</Col>
                <Col>
                <Form.Control
                        type="text"
                        size="sm"
                        placeholder="VOUCHER BAHAGIA"
                        onChange={handleNamaVoucher}
                    />
                </Col>
            </Row>
            <Row className="mt-2">
                <Col xs={5}>Jenis Pelayanan</Col>
                <Col xs={1}>:</Col>
                <Col> 

                <Form.Select aria-label="Default select example" size="sm" value={pelayanan} onChange={handleChangePelayanan}>
                    <option value="Semua">Semua</option>
                    <option value="Psikotes">Psikotes</option>
                    <option value="Assessment-Center">Assesment Center</option>
                    <option value="Konseling">Konseling</option>
                    <option value="Ceramah">Ceramah</option>
                    <option value="Training-SDM">Training/Pelatihan SDM</option>
                </Form.Select>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col xs={5}>Discount</Col>
                <Col xs={1}>:</Col>
                <Col> <p className="mb-0">
                <Col xs={3}>
                <Form.Control
                        type="text"
                        size="sm"
                        placeholder="20"
                        onChange={handleDiscountVoucher}
                    />
                </Col>
                </p>
                </Col>
            </Row>
          </div>
          </Modal.Body>
          <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
          <Button variant="success" onClick={handleSubmit}>Done</Button>
          </Modal.Footer>
        </Modal>
      );
}

function Voucher () {
    const [modalShow, setModalShow] = useState(false)
    const [dataVoucher, setDataVoucher] = useState('')

    const handleDelete = async (id) =>{
        console.log(id)
        try{
            await axios.post("http://localhost:8800/delete/voucher", {id : id})
            window.location.reload()
        }catch (err){
            console.log(err)

        }
    }

    useEffect(() =>{
        const fetchDataVoucher = async () =>{
            try{

                const resVoucher = await axios.get("http://localhost:8800/getVoucher")
                setDataVoucher(resVoucher.data)
                
            }catch(e){
                console.log(e)
            }
        }
        fetchDataVoucher()
    },[])

    console.log("idi",dataVoucher)
    return(
        <>
        <div className='mr-5'>
            <section className='justify-content-md-center mt-5'>
                <div className='border-0 rounded backColor p-3 mb-3'>
                    <h2 className='text-center mb-0'><strong>Voucher</strong></h2>
                </div>
            </section>

            <div className="addVoucher" onClick={() => setModalShow(true)}>
                <div className="wrap border-0 rounded backColor p-3 rounded" style={{ width: '25%' }}>
                    <h3 className='text-center'>Add Voucher</h3>
                </div>
            </div>

            <div className="voucher">

            { dataVoucher &&
            <Row>
                {dataVoucher.map((dataVoucher, index) => (
                <Col key={index} xs={6} md={4} lg={3}>
                <Row className='p-2 mt-3 mx-2 border rounded'>
                    <Col xs={3}>
                    <h1>%</h1>
                    <TiDeleteOutline className="mx-2" onClick={ () => handleDelete(dataVoucher?.idVoucher)}/>
                    </Col>
                    <Col>
                        <div>
                            <p className='m-0 p-0'> Nama Voucher : <strong>{dataVoucher?.namaVoucher}</strong></p>
                            <p className='m-0 p-0'> Jenis Pelayanan : <strong>{dataVoucher?.jenisVoucher}</strong></p>
                            <p className='m-0 p-0'> Discount : <strong>{dataVoucher?.discount}</strong></p>
                        </div>
                    </Col>
                </Row>
                </Col>
                ))}
                </Row>
            }
                
            </div>
        </div>
        <ModalVoucher show={modalShow} onHide={() => setModalShow(false)}/>
        </>
    )
}
export default Voucher