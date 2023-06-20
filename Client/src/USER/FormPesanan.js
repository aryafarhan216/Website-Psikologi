import React, { useState, useEffect } from 'react';
import { Col,Row, Container, Form, Button } from "react-bootstrap"
import "../styleGlobal.css"
import {useNavigate} from 'react-router-dom';
import axios from "axios";

// images
import alur21 from "../Images/User/alur2(1).png"
import NotSignIn from './COMPONENTS/NotSignIn';

function FormPesanan () {
    const navigate = useNavigate()
    const[user,setUser] =useState ([])
    // Variable pilihan dan subPilihan
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedSubOption, setSelectedSubOption] = useState("");
    // baru
    const [selectedValues, setSelectedValues] = useState({idC: "", nama: "", namaP: "", option: "", 
    subOption: "", sesi:"", jadwal:"", psikolog:0, MPay: "", sum:""});
    // Variable nama perusahaan, Psikolog, metode pembayaran dan sesi
    const [namaP, setNamaP] = useState("");
    const [selectedSesi, setSelectedSesi] = useState("");
    // baru
    const [selectedPsikolog, setSelectedPsikolog] = useState("");
    const [selectedMPay, setSelectedMPay] = useState("");
    const [selectedJadwal, setSelectedJadwal] = useState("");
    const [ id, setId] = useState("");
    const [ nama, setNama] = useState("");
    const [sum, setSum] = useState("");
    // Variable data jadwal
    const [dateP, setDateP] = useState([])
    const [dateAC, setDateAC] = useState([])
    const [dateK, setDateK] = useState([])
    const [dateC, setDateC] = useState([])
    const [dateT, setDateT] = useState([])
    const [dataVoucher, setDataVoucher] = useState([])
    const [dataFilterVoucher, setDataFilterVoucher] = useState([]);
    const [selectedVoucherId, setSelectedVoucherId] = useState({idVoucher : '', discountVoucher : 0});

    // Fetch data jadwal
    useEffect(() => {
  const fetchAllData = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) setUser(user);
        
        try {
        const [resP, resAC, resK, resC, resT, resVoucher] = await Promise.all([
            axios.get("http://localhost:8800/psikolog"),
            axios.get("http://localhost:8800/assessment"),
            axios.get("http://localhost:8800/konseling"),
            axios.get("http://localhost:8800/ceramah"),
            axios.get("http://localhost:8800/sdm"),
            axios.get("http://localhost:8800/getVoucher")
        ]);

        setDateP(resP.data);
        setDateAC(resAC.data);
        setDateK(resK.data);
        setDateC(resC.data);
        setDateT(resT.data);
        setDataVoucher(resVoucher.data);
        
        if (user) {
            setId(user.id.toString());
            setNama(user.name.toString());
        }
        } catch (err) {
        console.log(err);
        }
    };

    fetchAllData();
}, []);
        

        const sumPrice = () => {
            if(selectedSesi !== ""){
                let admin = 3000
                let sum = 0
                switch (selectedValues.option){
                    case "0":
                        setSelectedSesi("")
                        setSelectedValues({ ...selectedValues, sesi: ""})
                        break
                    case "PK":
                        if(selectedValues.subOption === "Konseling"){
                            sum = (selectedSesi * 300000 + admin)
                        }
                        if (selectedVoucherId.pelayanan === "Konseling"){
                            sum = (((selectedSesi * 300000 ) - ((selectedSesi * 300000 ) * (selectedVoucherId.discount/100))) + admin);
                        }
                        if(selectedVoucherId === "Semua"){
                            console.log("kesinsi")
                            sum = (sum - (sum * (selectedVoucherId.discount/100)))
                        }
                        break
                    case "PIO":
                        if(selectedValues.subOption === "Psikotes"){
                            sum = (selectedSesi * 350000 + admin)
                        }
                        if (selectedVoucherId.pelayanan === "Psikotes"){
                            sum = (((selectedSesi * 350000 ) - ((selectedSesi * 350000 ) * (selectedVoucherId.discount/100))) + admin);
                            console.log("masuk", selectedVoucherId.discount, selectedSesi, sum)
                        }
                        if(selectedValues.subOption === "Assessment-Center"){
                            sum = (selectedSesi * 2500000 + admin)
                        }
                        if (selectedVoucherId.pelayanan === "Assessment-Center"){
                            sum = (((selectedSesi * 2500000 ) - ((selectedSesi * 2500000 ) * (selectedVoucherId.discount/100))) + admin);
                        }
                        if(selectedValues.subOption === "Training-SDM"){
                            sum = (selectedSesi * 1500000 + admin)
                        }
                        if (selectedVoucherId.pelayanan=== "Training-SDM"){
                            sum = (((selectedSesi * 1500000 ) - ((selectedSesi * 1500000 ) * (selectedVoucherId.discount/100))) + admin);
                        }
                    break
                    case "PP":
                        if(selectedValues.subOption === "Psikotes"){
                            sum = (selectedSesi * 250000 + admin)
                        }
                        if (selectedVoucherId.pelayanan === "Psikotes"){
                            sum = (((selectedSesi * 250000 ) - ((selectedSesi * 250000 ) * (selectedVoucherId.discount/100))) + admin);
                        }
                        if(selectedValues.subOption === "Ceramah"){
                            sum = (selectedSesi * 1500000 + admin)
                        }
                        if (selectedVoucherId.pelayanan === "Ceramah"){
                            sum = (((selectedSesi * 1500000 ) - ((selectedSesi * 1500000 ) * (selectedVoucherId.discount/100))) + admin);
                        }
                    break
                    default:
                    break;
                    // tambah individu
                } 
                if (selectedVoucherId.pelayanan === "Semua"){
                    console.log("masuk sinii")
                    sum = (((sum) - ((sum) * (selectedVoucherId.discount/100))));
                    setSum(sum);
                setSelectedValues({ ...selectedValues, sum });
                }
                setSum(sum);
                setSelectedValues({ ...selectedValues, sum });
            }
            else{
                setSelectedValues({ ...selectedValues, idC: id, nama: nama, sum:"null"})
            }
        }
    useEffect(() =>{
        
        sumPrice()
        
        console.log("masuk", sum)
    }, [selectedValues.sesi, selectedValues.subOption, selectedVoucherId, sum])
    

    const filterVouchers = () => {
        const filteredVouchers = dataVoucher.filter((voucher) => {
          return voucher.jenisVoucher === selectedValues.subOption  || voucher.jenisVoucher === 'Semua'; 
        });
    
        setDataFilterVoucher(filteredVouchers);
      };
      
    useEffect(() => {
        filterVouchers();
      }, [selectedValues.subOption, selectedVoucherId, selectedValues.option]);

    // validation login
    const isLoggedIn = user?.name
    console.log("test",isLoggedIn)

    // Nama perusahaan, Psikolog, metode pembayaran dan sesi
        function handleChangeNamaP(e) {
            setNamaP(e.target.value)
            setSelectedValues({ ...selectedValues, namaP: e.target.value });
        }

      function handleChangeSesi(event) {
        setSelectedSesi(event.target.value)
        setSelectedValues({ ...selectedValues, sesi: event.target.value });
      }
    
      function handleChangeMPay(event) {
        setSelectedMPay(event.target.value)
        setSelectedValues({ ...selectedValues, MPay: event.target.value });
      }
    //baru
      function handleChangePsikolog(event){
        setSelectedPsikolog(event.target.value)
        setSelectedValues({ ...selectedValues, psikolog: parseInt(event.target.value) });
      }

      function handleChangeJadwal(event) {
        setSelectedJadwal(event.target.value)
        setSelectedValues({ ...selectedValues, jadwal: event.target.value });
      }
    
    // pilihan dan subPilihan
    function handleChange(event) {
      setSelectedOption(event.target.value);
      setSelectedValues({ ...selectedValues, option: event.target.value });
    }

    function handleSubOptionChange(event) {
        setSelectedSubOption(event.target.value);
        setSelectedValues({ ...selectedValues, subOption: event.target.value });
    }

    // discount
    const handleDivClick = (voucherId, discount, pelayanan) => {
        setSelectedVoucherId({...selectedVoucherId, idVoucher: voucherId, discount : discount, pelayanan : pelayanan});
      };

    // buttonClick dan validasi
    function handleClick(){
        let valid
        if(selectedValues.option === "" || selectedValues.option === "0"){alert("Data Diri belum dipilih")}{valid = false}
        if(selectedValues.option === "PIO" || selectedValues.option === "PP" || selectedValues.option === "PK"){
            if(selectedValues.namaP === ""){valid = false; alert("Nama Perusahaan masih kosong") }
            if(selectedValues.subOption === "" || selectedValues.subOption === "0"){valid = false; alert("Pilih Layanan belom dipilih") }
            // baru
            if(selectedValues.psikolog === "" || selectedValues.MPay === 0){valid = false; alert("Psikolog belum dipilih") }
            if(selectedValues.MPay === "" || selectedValues.MPay === "0"){valid = false; alert("Metode Pembayaran belom dipilih") }
            if(selectedValues.sesi === ""){valid = false; alert("Sesi/Orang masih kosong") }
            if(selectedValues.jadwal === ""){valid = false; alert("Jadwal belum diisi") }
        }
        if(selectedValues.option === "I"){
            if(selectedValues.subOption === "" || selectedValues.subOption === "0"){valid = false; alert("Pilih Layanan belom dipilih") }
            // baru
            if(selectedValues.psikolog === "" || selectedValues.MPay === 0){valid = false; alert("Psikolog belum dipilih") }
            if(selectedValues.MPay === "" || selectedValues.MPay === "0"){valid = false; alert("Metode Pembayaran belom dipilih") }
            if(selectedValues.sesi === ""){valid = false; alert("Sesi/Orang masih kosong") }
            if(selectedValues.jadwal === ""){valid = false; alert("Jadwal belum diisi") }
        }
        if(selectedValues.idC !== "" && selectedValues.sesi !== "" && selectedValues.jadwal !== "" && selectedValues.MPay !== ""){
            valid = true
        }
        if (valid){validation()}
    }

    const validation = async () =>{
        console.log(selectedValues)
        try{
            await axios.post("http://localhost:8800/insertDataJadwal", selectedValues)
            if ( selectedValues.subOption === "Psikotes"){
                try{
                    await axios.post("http://localhost:8800/delete/psikolog", selectedValues)
                    navigate("/user/transaksiSukses")
                }catch(e){
                    console.log(e)
                }
            }
            if ( selectedValues.subOption === "Assessment-Center"){
                try{
                    await axios.post("http://localhost:8800/delete/assessment", selectedValues)
                    navigate("/user/transaksiSukses")
                }catch(e){
                    console.log(e)
                }
            }
            if ( selectedValues.subOption === "Training-SDM"){
                try{
                    await axios.post("http://localhost:8800/delete/training-sdm", selectedValues)
                    navigate("/user/transaksiSukses")
                }catch(e){
                    console.log(e)
                }
            }
            if ( selectedValues.subOption === "Konseling"){
                try{
                    console.log('masuk')
                    await axios.post("http://localhost:8800/delete/konseling", selectedValues)
                    navigate("/user/transaksiSukses")
                }catch(e){
                    console.log(e)
                }
            }
            if ( selectedValues.subOption === "Ceramah"){
                try{
                    await axios.post("http://localhost:8800/delete/ceramah", selectedValues)
                    navigate("/user/transaksiSukses")
                }catch(e){
                    console.log(e)
                }
            }
        }catch(e){
            console.log(e)
        }
    }

    console.log("isi", dataVoucher)
    return(
        <>
        <Container >
            { isLoggedIn
                ?
                <section>
                <h4><strong>BOOKING <span className="mainColor">LAYANAN</span></strong></h4>
                <Row className="mt-3">
                    <Col>
                        <Row>
                            <Col xs={5}>Jenis Data diri</Col>
                            <Col xs={1}>:</Col>
                            <Col>
                            <Form.Select aria-label="Default select example" size="sm" value={selectedOption} onChange={handleChange}>
                                <option value="0">Pilih Data diri</option>
                                <option value="PIO">Layanan Psikolog Industri & Organisasi</option>
                                <option value="PP">Layanan Psikolog Pendidikan</option>
                                <option value="PK">Konseling</option>
                                <option value="I">Individu</option>
                            </Form.Select>
                            </Col>
                        </Row>
                        <hr />
                        {selectedOption === ""  &&
                        <h3 className="text-center my-5">Pilih <span className="mainColor"><strong>Data diri</strong></span> terlebih dahulu</h3>
                        }
                        {selectedOption === "0"  &&
                        <h3 className="text-center my-5">Pilih <span className="mainColor"><strong>Data diri</strong></span> terlebih dahulu</h3>
                        }
                        {/* Layanan Psikolog Industri & Organisasi */}
                        {selectedOption === "PIO" && 
                        <div>
                        <Row className="mt-2">
                            <Col xs={5}>Nama Perusahaan</Col>
                            <Col xs={1}>:</Col>
                            <Col>
                            <Form.Control
                                    type="text"
                                    size="sm"
                                    placeholder="Pt. Perusahaan"
                                    onChange={handleChangeNamaP}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col xs={5}>Layanan Konseling</Col>
                            <Col xs={1}>:</Col>
                            <Col>
                            <Form.Select aria-label="Default select example" size="sm" value={selectedSubOption} onChange={handleSubOptionChange}>
                                <option value="0">Pilih Layanan</option>
                                <option value="Psikotes">Psikotes</option>
                                <option value="Assessment-Center">Assessment Center</option>
                                <option value="Training-SDM">Training/ Platihan SDM</option>
                            </Form.Select>
                            </Col>
                        </Row>
                        {selectedSubOption !== 0 &&
                        <Row className="mt-2">
                            <Col xs={5}></Col>
                            <Col xs={1}>:</Col>
                            <Col xs={2}>
                            <Form.Control
                                    type="number"
                                    size="sm"
                                    placeholder="1"
                                    onChange={(e) => {handleChangeSesi(e)}}
                                />
                            </Col>
                            <Col >
                            {selectedSubOption === "Psikotes" && <p className="m-0">/ Orang</p> }
                            {selectedSubOption === "Assessment-Center" && <p className="m-0">/ Orang</p> }
                            {selectedSubOption === "Training-SDM" && <p className="m-0">/ Sesi</p> }
                            </Col>
                        </Row>
                        }
                      </div>
                        }
                        {/* Layanan Psikologi Pendidikan */}
                         {selectedOption === "PP" && 
                         <div>
                            <Row className="mt-2">
                            <Col xs={5}>Nama Perusahaan</Col>
                            <Col xs={1}>:</Col>
                            <Col>
                            <Form.Control
                                    type="text"
                                    size="sm"
                                    placeholder="Pt. Perusahaan"
                                    onChange={handleChangeNamaP}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col xs={5}>Layanan Konseling</Col>
                            <Col xs={1}>:</Col>
                            <Col>
                            <Form.Select aria-label="Default select example" size="sm" value={selectedSubOption} onChange={handleSubOptionChange}>
                                <option value="0">Pilih Layanan</option>
                                <option value="Psikotes">Psikotes</option>
                                <option value="Ceramah">Ceramah</option>
                            </Form.Select>
                            </Col>
                        </Row>
                          {selectedSubOption !== 0 &&
                        <Row className="mt-2">
                            <Col xs={5}></Col>
                            <Col xs={1}>:</Col>
                            <Col xs={2}>
                            <Form.Control
                                    type="number"
                                    size="sm"
                                    placeholder="1"
                                    onChange={handleChangeSesi}
                                />
                            </Col>
                            <Col >
                            {selectedSubOption === "Psikotes" && <p className="m-0">/ Orang</p> }
                            {selectedSubOption === "Ceramah" && <p className="m-0">/ Sesi</p> }
                            </Col>
                        </Row>
                        
                        }
                        </div>
                        }
                        {/* Konseling */}
                        {selectedOption === "PK" && 
                        <div>
                            <Row className="mt-2">
                            <Col xs={5}>Nama Perusahaan</Col>
                            <Col xs={1}>:</Col>
                            <Col>
                            <Form.Control
                                    type="text"
                                    size="sm"
                                    placeholder="Pt. Perusahaan"
                                    onChange={handleChangeNamaP}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col xs={5}>Layanan Konseling</Col>
                            <Col xs={1}>:</Col>
                            <Col>
                            <Form.Select aria-label="Default select example" size="sm" value={selectedSubOption} onChange={handleSubOptionChange}>
                                <option value="0">Pilih Layanan</option>
                                <option value="Konseling">Konseling</option>
                            </Form.Select>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col xs={5}></Col>
                            <Col xs={1}>:</Col>
                            <Col xs={2}>
                            <Form.Control
                                    type="number"
                                    size="sm"
                                    placeholder="1"
                                    onChange={handleChangeSesi}
                                />
                            </Col>
                            <Col >
                            {selectedSubOption === "Konseling" && <p className="m-0">/ Sesi</p> }
                            </Col>
                        </Row>
                        </div>
                        }
                          {/* Individu */}
                        {selectedOption === "I" && 
                        <div>
                        <Row className="mt-2">
                            <Col xs={5}>Layanan Konseling</Col>
                            <Col xs={1}>:</Col>
                            <Col>
                            <Form.Select aria-label="Default select example" size="sm" value={selectedSubOption} onChange={handleSubOptionChange}>
                                <option value="0">Pilih Layanan</option>
                                <option value="Psikotes">Psikotes</option>
                                <option value="Konseling">Konseling</option>
                            </Form.Select>
                            </Col>
                            
                        </Row>
                        {selectedSubOption !== "0" && 
                        <Row className="mt-2">
                            <Col xs={5}></Col>
                            <Col xs={1}>:</Col>
                            <Col xs={2}>
                            <Form.Control
                                    type="number"
                                    size="sm"
                                    placeholder="1"
                                    onChange={handleChangeSesi}
                                />
                            </Col>
                            <Col >
                            <p className="m-0">/ Sesi</p> 
                            </Col>
                        </Row>
                        }
                        </div>
                        }
                          
                        {selectedOption !== "" && selectedOption !== "0" &&
                          <div>
                            
                                {(() =>{
                                    if(selectedValues.subOption === "Psikotes"){
                                        return (
                                            <div>
                                            <Row className="mt-2">
                                            <Col xs={5}>Tanggal Pemesanan</Col>
                                            <Col xs={1}>:</Col>
                                            <Col>
                                            <Form.Select aria-label="Default select example" size="sm" onChange={handleChangeJadwal}>
                                                <option>Jadwal</option>
                                                {dateP?.map((dateP,key) =>{
                                                    return(
                                                        <option key={dateP.idSP}> {dateP.dateP}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                            </Col>
                                            </Row>
                                        </div>
                                        )
                                    }
                                    if(selectedValues.subOption === "Assessment-Center"){
                                        return (
                                            <div>
                                            <Row className="mt-2">
                                            <Col xs={5}>Tanggal Pemesanan</Col>
                                            <Col xs={1}>:</Col>
                                            <Col>
                                            <Form.Select aria-label="Default select example" size="sm" onChange={handleChangeJadwal}>
                                                <option>Jadwal</option>
                                                {dateAC?.map((dateAC,key) =>{
                                                    return(
                                                        <option> {dateAC.dateAC}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                            </Col>
                                            </Row>
                                        </div>
                                        )
                                    }
                                    if(selectedValues.subOption === "Training-SDM"){
                                        return (
                                            <div>
                                            <Row className="mt-2">
                                            <Col xs={5}>Tanggal Pemesanan</Col>
                                            <Col xs={1}>:</Col>
                                            <Col>
                                            <Form.Select aria-label="Default select example" size="sm" onChange={handleChangeJadwal}>
                                                <option>Jadwal</option>
                                                {dateT?.map((dateT,key) =>{
                                                    return(
                                                        <option> {dateT.dateT}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                            </Col>
                                            </Row>
                                        </div>
                                        )
                                    }
                                    if(selectedValues.subOption === "Ceramah"){
                                        return (
                                            <div>
                                            <Row className="mt-2">
                                            <Col xs={5}>Tanggal Pemesanan</Col>
                                            <Col xs={1}>:</Col>
                                            <Col>
                                            <Form.Select aria-label="Default select example" size="sm" onChange={handleChangeJadwal}>
                                                <option>Jadwal</option>
                                                {dateC?.map((dateC,key) =>{
                                                    return(
                                                        <option> {dateC.dateC}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                            </Col>
                                            </Row>
                                        </div>
                                        )
                                    }
                                    if(selectedValues.subOption === "Konseling"){
                                        return (
                                            <div>
                                            <Row className="mt-2">
                                            <Col xs={5}>Tanggal Pemesanan</Col>
                                            <Col xs={1}>:</Col>
                                            <Col>
                                            <Form.Select aria-label="Default select example" size="sm" onChange={handleChangeJadwal}>
                                                <option>Jadwal</option>
                                                {dateK?.map((dateK,key) =>{
                                                    return(
                                                        <option> {dateK.dateK}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                            </Col>
                                            </Row>
                                        </div>
                                        )
                                    }
                                })()}
                            
                            {/* baru */}
                            <Row className="mt-2">
                                <Col xs={5}>Psikolog</Col>
                                <Col xs={1}>:</Col>
                                <Col>
                                <Form.Select aria-label="Default select example" size="sm" onChange={handleChangePsikolog} value={selectedPsikolog}>
                                    <option value="0">Pilih Psikolog</option>
                                    <option value="1">Chairiah Yulianti Siregar S.Psi., M.Psi Psikolog</option>
                                    <option value="2">Sarinah S.Psi., M.Psi Psikolog</option>
                                    <option value="3">Hasdina Trisnasuci, S.Psi,M.Psi, Psikolog</option>
                                    <option value="4">Achmad Irvan Dwi Putra, S.Psi,M.Psi, Psikolog</option>
                                </Form.Select>
                                </Col>
                            </Row>

                            <Row className="mt-2">
                                <Col xs={5}>Metode Pembayaran</Col>
                                <Col xs={1}>:</Col>
                                <Col>
                                <Form.Select aria-label="Default select example" size="sm" onChange={handleChangeMPay} value={selectedMPay}>
                                    <option value="0">Pembayaran</option>
                                    <option value="OVO">OVO</option>
                                    <option value="DANA">DANA</option>
                                    <option value="GOPAY">GOPAY</option>
                                </Form.Select>
                                </Col>
                            </Row>
                        </div>
                        }
                        <hr />
                        {/* Voucher */}
                        { dataFilterVoucher &&
                            <div>
                            <p className="mb-0">Voucher Tersedia:</p>
                            <Row>
                                {dataFilterVoucher.map((voucher, index) => (
                                <Col key={index} xs={6} md={6} lg={6}>
                                    <div
                                    style={{
                                        padding: '2px',
                                        margin: '3px',
                                        border: `2px solid ${selectedVoucherId.idVoucher === voucher.idVoucher ? 'red' : 'gray'}`,
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleDivClick(voucher.idVoucher , voucher.discount, voucher.jenisVoucher)}
                                    >
                                    <Row>
                                        <Col xs={3}>
                                        <div className="form-check">
                                            <input
                                            className="form-check-input"
                                            type="radio"
                                            name="voucher"
                                            value={voucher.idVoucher}
                                            checked={selectedVoucherId === voucher.idVoucher}
                                            onChange={() => handleDivClick(voucher.idVoucher)}
                                            />
                                            <h3>%</h3>
                                        </div>
                                        </Col>
                                        <Col>
                                        <div>
                                            <p style={{ margin: '0', padding: '0' }}>
                                            Nama Voucher: 
                                            </p>
                                            <p style={{ margin: '0', padding: '0' }}><strong>{voucher.namaVoucher}</strong> </p>
                                            <p style={{ margin: '0', padding: '0' }}>
                                            Jenis Pelayanan: 
                                            </p>
                                            <p style={{ margin: '0', padding: '0' }}>
                                            <strong>{voucher.jenisVoucher}</strong>
                                            </p>
                                            <p style={{ margin: '0', padding: '0' }}>
                                            Discount: <strong>{voucher.discount} %</strong>
                                            </p>
                                        </div>
                                        </Col>
                                    </Row>
                                    </div>
                                </Col>
                                ))}
                            </Row>
                            </div>
                        }
                        {/* End of Voucher */}

                        <hr />
                        <Row className="mt-2">
                            <Col xs={5}>Admin</Col>
                            <Col xs={1}>:</Col>
                            <Col xs={1}>Rp.</Col>
                            <Col> <p className="mb-0">3000</p>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col xs={5}>Total Pembayaran</Col>
                            <Col xs={1}>:</Col>
                            <Col xs={1}>Rp.</Col>
                            <Col> <p> {(selectedValues.sum).toLocaleString()}</p>
                            </Col>
                        </Row>
                        <hr />
                        <div className="d-flex justify-content-end">
                        <Button variant="success" onClick={handleClick}>Lanjut Pembayaran</Button>
                        </div>
                    </Col>

                    <Col className="d-none d-lg-block">
                    <img 
                    src={alur21}
                    alt="alur2"
                    style={{
                        width:"100%"
                    }}
                    />
                    </Col>
                </Row>
            </section>
                :
                <NotSignIn />

            }

        </Container>
        </>
    )
}

export default FormPesanan