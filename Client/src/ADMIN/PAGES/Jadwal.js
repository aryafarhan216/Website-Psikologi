import { Table, Button, Modal, Row, Col, Form} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import * as XLSX from 'xlsx';

function ModalJadwal(props) {
    const {data, onHide, show} = props
    const [file, setFile] = useState(null)
    // handle event file
    const handleFile = (event) =>{
        setFile(event.target.files[0])
    }
    // handle submit
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('otherData', JSON.stringify(data));
        console.log("isi", data)
        axios.post('http://localhost:8800/uploadDataHasil', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
          .then(response => {
            if (response.status === 200) {
              console.log(response);
            } else {
              console.log('File upload failed');
            }
          });
        onHide(onHide)
      };

      console.log("isi data", JSON.stringify(data))
    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
            <h4 className='text-center'>Detail Transaksi</h4>
            <hr />
            <Row>
                <Col xs={3}>ID Pesanan</Col>
                <Col xs={1}>:</Col>
                <Col>{data.idDJ}</Col>
            </Row>
            <Row>
                <Col xs={3}>Status Pesanan</Col>
                <Col xs={1}>:</Col>
                <Col>
                {data.option === "PIO" && <span> Pelayanan Industri & Organisasi</span>}
                {data.option === "PP" && <span> Pelayanan Pendidikan</span>}
                {data.option === "PK" && <span>Konseling</span>}
                {data.option === "I" && <span> Individu</span>}
                </Col>
            </Row>
            <Row>
                <Col xs={3}>Nama Customer</Col>
                <Col xs={1}>:</Col>
                <Col>{data.nama}</Col>
            </Row>
            <Row>
                <Col xs={3}>Nama Perusahaan</Col>
                <Col xs={1}>:</Col>
                <Col>{data.namap}</Col>
            </Row>
            <Row>
                <Col xs={3}>Pelayanan</Col>
                <Col xs={1}>:</Col>
                <Col><strong>{data.subOption}</strong></Col>
            </Row>
            <Row>
                <Col xs={3}>Sesi</Col>
                <Col xs={1}>:</Col>
                <Col>{data.sesi} Sesi/Orang</Col>
            </Row>
            <Row>
                <Col xs={3}>Tanggal Janjian</Col>
                <Col xs={1}>:</Col>
                <Col>{data.jadwal}</Col>
            </Row>
            <hr />
            <Row>
                <Col xs={3}>Metode Pembayaran</Col>
                <Col xs={1}>:</Col>
                <Col>{data.MPay}</Col>
            </Row>
            <Row>
                <Col xs={3}>Admin</Col>
                <Col xs={1}>:</Col>
                <Col>Rp. 3,000</Col>
            </Row>
            <Row>
                <Col xs={3}>Total Pembayaran</Col>
                <Col xs={1}>:</Col>
                <Col>Rp. {(data.sum).toLocaleString()}</Col>
            </Row>
            <hr />
            <Form.Group controlId="formFile" className="mb-3" onChange={handleFile}>
                <Form.Label>File Upload</Form.Label>
                <Form.Control type="file" />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
          <Button variant="success" onClick={handleSubmit}>Done</Button>
        </Modal.Footer>
      </Modal>
    );
  }

function Jadwal () {
    const [dateRange, setDateRange] = useState([null, null]);
    const [selectedValues, setSelectedValues] = useState({date1:"", date2:""})
    const [startDate, endDate] = dateRange;
    // variable dataJadwal
    const [dataJadwal, setDataJadwal] = useState([])
    // variable modal
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState({idC: "", idDJ: "", nama: "", namaP: "", option: "", 
    subOption: "", sesi:"", jadwal:"", MPay: "", sum:""});

    useEffect(() =>{
        const fetchAllDataJadwal = async () =>{
            try{
                if(selectedValues.date1 === null && selectedValues.date2 === null || selectedValues.date1 === "" && selectedValues.date2 === "" ){
                    console.log("isi", selectedValues)
                    const res = await axios.get("http://localhost:8800/dataJadwal")
                    setDataJadwal(res.data)
                    console.log(res.data)
                }else{
                    console.log("isi", selectedValues)
                    const res = await axios.post("http://localhost:8800/jadwal/dataJadwal", selectedValues)
                    setDataJadwal(res.data)
                    console.log(res.data)
                }

            }catch(err){
                console.log(err)
            }
        }
        fetchAllDataJadwal()
    },[selectedValues])

    const handleExport = () =>{
        const ws = XLSX.utils.json_to_sheet(dataJadwal);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "DataJadwal.xlsx");
    }


    console.log("isi",dataJadwal)
    return(
        <>
        <div className='mr-5'>
        <section className=' mt-5'>
            <div className='border-0 rounded backColor p-3 mb-3'>
                <h4 className='text-center mb-0'><strong>Total</strong></h4>
                <p className='text-center mb-0'>JADWAL CUSTOMER</p>
                <h1 className='text-center mb-0'>{dataJadwal.length}</h1>
            </div>
            
            <div className='d-flex justify-content-start'> 
            <Button onClick={handleExport} variant='success' className='mb-2'> download file</Button>
                <div className='mx-3 mb-3' style={{
                    width:'20%'
                }}>
                <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Range Tanggal"
                    onChange={(update) => {
                        setDateRange(update);
                        setSelectedValues({...selectedValues, date1:update[0], date2:update[1]})
                    }}
                    isClearable={true}
                    />
                    
                </div>
                
               </div>
        </section>
        <Table striped>
                <thead className='tableHead'>
                    <tr>
                    <th>No</th> 
                    <th>IdP</th>
                    <th>IdC</th>
                    <th>Status</th>
                    <th>Customer</th>
                    <th>Perusahaan</th>
                    <th>Pelayanan</th>
                    <th>Sesi/Orang</th>
                    <th>Tanggal Janjian</th>
                    <th>M Pembayaran</th>
                    <th>T Pembayaran</th>
                    
                    <th>Tanggal Transaksi</th>
                    </tr>
                </thead>
                    <tbody>
                    {dataJadwal?.map((dataJadwal, nomor)=> {

                        return (
                            <tr onClick={() =>{
                                setModalShow(true);
                                setModalData({...modalData,
                                idC : dataJadwal.idC, 
                                idDJ : dataJadwal.idDJ,
                                nama : dataJadwal.nama,
                                namap : dataJadwal.namaP,
                                option : dataJadwal.Status,
                                subOption : dataJadwal.pelayanan,
                                sesi : dataJadwal.sesi,
                                jadwal : dataJadwal.dateJ,
                                MPay: dataJadwal.MPay,
                                sum: dataJadwal.TPay
                                }) 
                            }}>
                                <td>{nomor+1}</td>
                                <td>{dataJadwal.idDJ}</td>
                                <td>{dataJadwal.idC}</td>
                                <td>{dataJadwal.Status}</td>
                                <td>{dataJadwal.nama}</td>
                                <td>{dataJadwal.namaP}</td>
                                <td>{dataJadwal.pelayanan}</td>
                                <td>{dataJadwal.sesi}</td>
                                <td>{dataJadwal.dateJ}</td>
                                <td>{dataJadwal.MPay}</td>
                                <td>Rp. {(dataJadwal.TPay).toLocaleString()}</td>
                                <td>{(new Date(dataJadwal.dateT)).toLocaleDateString('en-US')}</td>
                            </tr>
                        )
                    })}
                </tbody> 
        </Table>
        <ModalJadwal show={modalShow} onHide={() => setModalShow(false)} data={modalData} />
        </div>
        </>
    )
}
export default Jadwal