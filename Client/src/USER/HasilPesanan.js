import axios from "axios"
import { useEffect, useState } from "react"
import { Container, Stack, Row, Col, Button } from "react-bootstrap"

function HasilPesanan () {
    // variable pesanan
    const [hasilData, setHasilData] = useState([])
    const [id, setId] = useState('')
    const [nama, setNama] = useState('')
    const [user, setUser] = useState({nama:"", id:""})
    // 
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
                const resPesanan = await axios.post("http://localhost:8800/user/dataHasil", user)
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
                    <p className="mb-0"><strong>{hasilData.pelayanan}</strong></p>
                    <p className="mb-0 text-danger">{hasilData.dateJ}</p>
                    </Col>
                    <Col>
                    <button type="button" class="btn btn-success px-5" onClick={() => {handleDowload(hasilData.idDH)}}>{hasilData.fileName}</button>
                    </Col>
                </Row>
            </div>
                )
            

            })} 
            
        </section>
        </Container>

        </>
    )
}

export default HasilPesanan