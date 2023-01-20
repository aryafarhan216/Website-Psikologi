import { Button, Col, Row } from "react-bootstrap"
import {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import {format} from "date-fns";
import axios from "axios";
import { TiDeleteOutline } from 'react-icons/ti';

function Penjadwalan () {

    const [startDate, setStartDate] = useState(new Date());
    const [dateP, setDateP] = useState([])
    const [dateAC, setDateAC] = useState([])
    const [dateK, setDateK] = useState([])
    const [dateC, setDateC] = useState([])
    const [dateT, setDateT] = useState([])
    useEffect (() => {
        const fetchAllUser = async () =>{
            try{
                const resP = await axios.get("http://localhost:8800/psikolog")
                setDateP(resP.data)
                const resAC = await axios.get("http://localhost:8800/assessment")
                setDateAC(resAC.data)
                const resK = await axios.get("http://localhost:8800/konseling")
                setDateK(resK.data)
                const resC = await axios.get("http://localhost:8800/ceramah")
                setDateC(resC.data)
                const resT = await axios.get("http://localhost:8800/sdm")
                setDateT(resT.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllUser()
    }, [])

    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
        return currentDate.getTime() < selectedDate.getTime();
      };
    const date  = format(startDate, 'd MMMM yyyy h:mm aa')
    let dates = {
        dateP: date.toString(),
        dateAC: date.toString(),
        dateK:  date.toString(),
        dateC: date.toString(),
        dateT : date.toString()
    }

    // ----------- handle Psikolog --------//
    const handleClickSP = async () =>{
        try{
            await axios.post("http://localhost:8800/jadwal/psikolog", dates)
            console.log("terkirim")
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    const handleDeleteSP = async (id) =>{
        console.log("masuk")
        try{
            await axios.delete("http://localhost:8800/psikolog/"+id)
            window.location.reload()
        }catch (err){
            console.log(err)

        }
    }

    // ----------- handle Psikolog --------//
    const handleClickSAC = async () =>{
        try{
            await axios.post("http://localhost:8800/jadwal/assessment", dates)
            console.log("terkirim")
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    const handleDeleteSAC = async (id) =>{
        console.log("masuk")
        try{
            await axios.delete("http://localhost:8800/assessment/"+id)
            window.location.reload()
        }catch (err){
            console.log(err)

        }
    }

    // ----------- handle Konseling --------//
    const handleClickSK = async () =>{
        try{
            await axios.post("http://localhost:8800/jadwal/konseling", dates)
            console.log("terkirim")
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    const handleDeleteSK = async (id) =>{
        console.log("masuk")
        try{
            await axios.delete("http://localhost:8800/konseling/"+id)
            window.location.reload()
        }catch (err){
            console.log(err)

        }
    }

     // ----------- handle ceramah --------//
     const handleClickSC = async () =>{
        try{
            await axios.post("http://localhost:8800/jadwal/ceramah", dates)
            console.log("terkirim")
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    const handleDeleteSC = async (id) =>{
        console.log("masuk")
        try{
            await axios.delete("http://localhost:8800/ceramah/"+id)
            window.location.reload()
        }catch (err){
            console.log(err)

        }
    }

    // ----------- handle Training SDM --------//
    const handleClickST = async () =>{
        try{
            await axios.post("http://localhost:8800/jadwal/sdm", dates)
            console.log("terkirim")
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    const handleDeleteST = async (id) =>{
        console.log("masuk")
        try{
            await axios.delete("http://localhost:8800/sdm/"+id)
            window.location.reload()
        }catch (err){
            console.log(err)

        }
    }
    return(
        <>
        <div className='border-0 rounded backColor mb-3 mt-5 py-4'>
            <h4 className='text-center mb-0'><strong>Jadwal</strong></h4>
            <p className='text-center mb-0'>Psikolog</p>
        </div>
        <Row>
            <Col>
            <div className="bg-light">
            <h3 className="text-center py-3 mt-3 border-0 rounded">Psikolog</h3>
            </div>

            <p className="mb-0 "><strong>Pilih Tanggal dan Jam</strong></p>
            <div className="my-2 d-flex justify-content-start">
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                filterTime={filterPassedTime}
                dateFormat="d MMMM, yyyy h:mm aa"
                />
                <Button variant="success" className="mx-2" onClick={handleClickSP}>Tambah Jadwal</Button>
            </div>
            <p className="mb-0"><strong>Jadwal tersedia :</strong></p>
            {dateP?.map((dateP, key) =>{
                return(
                <div className="d-flex align-items-center" key={dateP.idSP}>
                    <p className="mb-0 fontNav">{dateP.dateP} </p>
                   <TiDeleteOutline className="mx-2" onClick={()=>handleDeleteSP(dateP.idSP)}/>
                </div>
                )
            })}
            </Col>
            <Col>
            <div className="bg-light">
            <h3 className="text-center py-3 mt-3 border-0 rounded">Assessment Center</h3>
            </div>

            <p className="mb-0 "><strong>Pilih Tanggal dan Jam</strong></p>
            <div className="my-2 d-flex justify-content-start">
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                filterTime={filterPassedTime}
                dateFormat="d MMMM, yyyy h:mm aa"
                />
                <Button variant="success" className="mx-2" onClick={handleClickSAC}>Tambah Jadwal</Button>
            </div>
            <p className="mb-0"><strong>Jadwal tersedia :</strong></p>
            {dateAC?.map((dateAC, key) =>{
                return(
                <div className="d-flex align-items-center" key={dateAC.idSAC}>
                    <p className="mb-0 fontNav">{dateAC.dateAC} </p>
                   <TiDeleteOutline className="mx-2" onClick={()=>handleDeleteSAC(dateAC.idSAC)}/>
                </div>
                )
            })}
            </Col>
            <Col>
            <div className="bg-light">
            <h3 className="text-center py-3 mt-3 border-0 rounded">Konseling</h3>
            </div>
            <p className="mb-0 "><strong>Pilih Tanggal dan Jam</strong></p>
            <div className="my-2 d-flex justify-content-start">
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                filterTime={filterPassedTime}
                dateFormat="d MMMM, yyyy h:mm aa"
                />
                <Button variant="success" className="mx-2" onClick={handleClickSK}>Tambah Jadwal</Button>
            </div>
            <p className="mb-0"><strong>Jadwal tersedia :</strong></p>
            {dateK?.map((dateK, key) =>{
                return(
                <div className="d-flex align-items-center" key={dateAC.idSK}>
                    <p className="mb-0 fontNav">{dateK.dateK} </p>
                   <TiDeleteOutline className="mx-2" onClick={()=>handleDeleteSK(dateK.idSK)}/>
                </div>
                )
            })}
            </Col>
        </Row>

        <Row>
            <Col>
            <div className="bg-light">
            <h3 className="text-center py-3 mt-3 border-0 rounded">Ceramah</h3>
            </div>

                
            <p className="mb-0 "><strong>Pilih Tanggal dan Jam</strong></p>
            <div className="my-2 d-flex justify-content-start">
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                filterTime={filterPassedTime}
                dateFormat="d MMMM, yyyy h:mm aa"
                />
                <Button variant="success" className="mx-2" onClick={handleClickSC}>Tambah Jadwal</Button>
            </div>
            <p className="mb-0"><strong>Jadwal tersedia :</strong></p>
            {dateC?.map((dateC, key) =>{
                return(
                <div className="d-flex align-items-center" key={dateAC.idC}>
                    <p className="mb-0 fontNav">{dateC.dateC} </p>
                   <TiDeleteOutline className="mx-2" onClick={()=>handleDeleteSC(dateC.idSC)}/>
                </div>
                )
            })}
            </Col>
            <Col>
            <div className="bg-light">
            <h3 className="text-center py-3 mt-3 border-0 rounded">Training/ Pelatihan SDM</h3>
            </div>

            <p className="mb-0 "><strong>Pilih Tanggal dan Jam</strong></p>
            <div className="my-2 d-flex justify-content-start">
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                filterTime={filterPassedTime}
                dateFormat="d MMMM, yyyy h:mm aa"
                />
                <Button variant="success" className="mx-2" onClick={handleClickST}>Tambah Jadwal</Button>
            </div>
            <p className="mb-0"><strong>Jadwal tersedia :</strong></p>
            {dateT?.map((dateT, key) =>{
                return(
                <div className="d-flex align-items-center" key={dateAC.idST}>
                    <p className="mb-0 fontNav">{dateT.dateT} </p>
                   <TiDeleteOutline className="mx-2" onClick={()=>handleDeleteST(dateT.idST)}/>
                </div>
                )
            })}
            </Col>
            <Col>
            </Col>
        </Row>
        </>
    )
}
export default Penjadwalan