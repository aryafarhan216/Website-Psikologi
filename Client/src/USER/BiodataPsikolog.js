import 
{
    Container,
    Row,
    Col,
    Form,
    Button
} from 'react-bootstrap';
import '.././styleGlobal.css'
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {useState} from 'react'
import axios from 'axios'
import { FaStar } from 'react-icons/fa'
// Images
import psikolog1 from "../Images/User/psikolog/1.png"
import psikolog2 from "../Images/User/psikolog/2.png"
import psikolog3 from "../Images/User/psikolog/3.png"
import psikolog4 from "../Images/User/psikolog/4.png"
import ratingFoto from "../Images/User/rating.png"

function BiodataPsikolog() {
    const location = useLocation();
    const {id} = location.state;
    const [hasilData, setHasilData] = useState()
    const [rating,setRating] = useState()
    const [avg, setAvg] = useState()
    // image
    let srcImg
    if(id === 1 ) srcImg = psikolog1
    if(id === 2 ) srcImg = psikolog2
    if(id === 3 ) srcImg = psikolog3
    if(id === 4 ) srcImg = psikolog4

    useEffect(() =>{
    const fetchDataPesanan = async () =>{
        try{
            console.log("isi", id)
            const resPesanan = await axios.post("http://localhost:8800/bio/psikolog", {id : id})
            const resRating = await axios.post("http://localhost:8800/rating/psikolog", {id : id})
            setHasilData(resPesanan.data)
            setRating(resRating.data)
            
        }catch(e){
            console.log(e)
        }
    }
    const average = () =>{
        let sum = 0;
        let count = 0;

        rating?.forEach((item) => {
        sum += item.rating;
        count++;
        });
        setAvg(Math.ceil(sum/count))
    }
    
    if(rating?.length > 0) average()
    if(!hasilData)fetchDataPesanan()
    }, [rating ?? []])

    console.log("rating", rating)
    return ( 
        <>
        <Container>
            <Row>
                <Col xs={3}>
                    <img 
                    src={srcImg} 
                    className="img-fluid rounded" 
                    alt="Foto Psikolog">
                    </img>
                </Col>

                <Col className='mt-4'>
                <h2>Biodata Psikolog</h2>
                {   hasilData
                ?
                <div>
                <Row className="m-0 p-0">
                    <Col xs={3}>Nama</Col>
                    <Col xs={1}>:</Col>
                    <Col> <p> {hasilData[0]?.namaPsikolog}</p></Col>
                </Row>
                <Row className="m-0 p-0">
                    <Col xs={3}>Tempat Tanggal Lahir</Col>
                    <Col xs={1}>:</Col>
                    <Col> <p> {hasilData[0]?.ttlPsikolog}</p></Col>
                </Row>
                <Row className="m-0 p-0">
                    <Col xs={3}>Jenis Kelamin</Col>
                    <Col xs={1}>:</Col>
                    <Col> <p> {hasilData[0]?.JKPsikolog}</p></Col>
                </Row>
                <Row className="m-0 p-0">
                    <Col xs={3}>Agama</Col>
                    <Col xs={1}>:</Col>
                    <Col> <p> {hasilData[0]?.agamaPsikolog}</p></Col>
                </Row>
                <Row className="m-0 p-0">
                    <Col xs={3}>Status</Col>
                    <Col xs={1}>:</Col>
                    <Col> <p> {hasilData[0]?.statusPsikolog}</p></Col>
                </Row>
                <Row className="m-0 p-0">
                    <Col xs={3}>No Hp</Col>
                    <Col xs={1}>:</Col>
                    <Col> <p> {hasilData[0]?.noHpPsikolog}</p></Col>
                </Row>
                </div>
                :
                <div></div>

                }
                
                </Col>
            </Row>
            <div className="rating">
                <hr />
                <p className='text-center'> <strong>Rating & Ulasan</strong></p>
                
                
                {rating
                ?
                <div>
                <div>
                <p className='m-0' > Rata-rata Rating :</p>
                <p className='mb-2'>
                {[...Array(avg)].map((star, index) => {
                    return(
                    <label>
                        <input 
                        type="radio" 
                        name="rating"
                    />
                        <FaStar 
                        className='star' 
                        size={20} 
                        color={"#ffc107" }
                        />
                    </label>
                    );
                })}
                </p>
                </div>
                <Row>
                    <Col className='mt-3'>
                    
                    { rating.map((rating, index) =>{
                        return(
                        <div className="wrapRating mx-3 my-1 ">
                        <hr/>
                            <div key={index}>
                            <p className='m-0'><small>{rating.namaP}</small></p>
                                <p className='m-0'>
                                {[...Array(rating.rating)].map((star, index) => {
                                    return(
                                    <label>
                                        <input 
                                        type="radio" 
                                        name="rating"

                                    />
                                        <FaStar 
                                        className='star' 
                                        size={20} 
                                        color={"#ffc107" }
                                        />
                                    </label>
                                    );
                                })}
                                </p>
                                <p className='mt-1'>"{rating.ulasan}"</p>
                            </div>
                        </div>
                        )
                    })}
                    </Col>
                    <Col>
                    <img 
                    src={ratingFoto} 
                    className="img-fluid rounded" 
                    alt="rating">
                    </img>
                    </Col>
                </Row>
                </div>
                :
                <div></div>

                }
                <hr/>
            </div>
        </Container>
        </>
    );
  }
  
  export default BiodataPsikolog;