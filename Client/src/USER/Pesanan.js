import axios from "axios"
import { useEffect, useState } from "react"
import { Container, Stack, Row, Col, Button } from "react-bootstrap"

function Pesanan () {
    // variable pesanan
    const [pesanan, setPesanan] = useState([])
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
        }
        const fetchDataPesanan = async () =>{
            try{
                const resPesanan = await axios.post("http://localhost:8800/dataPesanan", user)
                setPesanan(resPesanan.data)
                
            }catch(e){
                console.log(e)
            }
        }
        // agar tidak overload
        if(user.id === ''){
            userFetch()
        }
        fetchDataPesanan()
    }, [user])
    

    
    return(
        <>
        <Container>
        <section>
            {pesanan?.map((pesanan, index) =>{
                return(
            <div className="border rounded p-3 backColor mt-3" key={index}>
                <Stack direction="horizontal" gap={1}>
                    <div><p className="fontNav mb-0 text-muted">{(new Date(pesanan.dateT)).toLocaleDateString('en-US')}</p></div>
                    <div> <p className="text-muted fontNav mb-0">{pesanan.Status}{pesanan.idDJ}</p></div>
                </Stack>
                <Row className="d-flex align-items-center px-4 pb-2">
                    <Col>
                    <h5 className="mb-0">{pesanan.nama}</h5>
                    <h6 >{pesanan.namaP}</h6>
                    </Col>
                    <Col>
                    {/* baru */}
                    <p className="mb-0"><strong>
                    {pesanan.idPsikolog === 1 && <span> Chairiah Yulianti Siregar S.Psi., M.Psi Psikolog </span>}
                    {pesanan.idPsikolog === 2 && <span> Sarinah S.Psi., M.Psi Psikolog</span>}
                    {pesanan.idPsikolog === 3 && <span> Hasdina Trisnasuci, S.Psi,M.Psi, Psikolog</span>}
                    {pesanan.idPsikolog === 4 && <span> Achmad Irvan Dwi Putra, S.Psi,M.Psi, Psikolog</span>}
                    </strong></p>
                    <p className="mb-0"><strong>{pesanan.pelayanan}</strong></p>
                    <p className="mb-0">{pesanan.dateJ}</p>
                    <p className="mb-0">{pesanan.sesi} <span>Sesi/Orang</span></p>
                    </Col>
                    <Col>
                    <button type="button" class="btn btn-success px-5">Success</button>
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

export default Pesanan