import {Table, Form, Button} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import * as XLSX from 'xlsx';

function Keuangan () {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const [dataJadwal, setDataJadwal] = useState([])
    const [selectedOption, setSelectedOption] = useState("Semua")
    const [income, setIncome] = useState('')
    const [selectedValues, setSelectedValues] = useState({option: "Semua", date1:"", date2:""})
    

    useEffect(() =>{
        const fetchAllDataJadwal = async () =>{
            try{
                if(selectedOption === "Semua"){
                    if(dateRange[0] === null){
                        console.log("masuk")
                        const res = await axios.get("http://localhost:8800/dataJadwal")
                        setDataJadwal(res.data)
                        console.log(res.data)
                    }else{
                        // console.log("date format", format(selectedValues.date1, 'yyyy-MM-dd')+"T17:00:00.000Z")
                        if(selectedValues.date1 != null && selectedValues.date2 != null){
                            const res = await axios.post("http://localhost:8800/keuangan/dataJadwal", selectedValues)
                            setDataJadwal(res.data)
                        }
                        
                    }
                }
                // buat di server untuk get all semua jenis option
                if(selectedOption != "Semua"){
                    console.log("masuk")
                    const res = await axios.post("http://localhost:8800/keuangan/dataJadwal", selectedValues)
                    setDataJadwal(res.data)
                }
            }catch(err){
                console.log(err)
            }
        }


        fetchAllDataJadwal()
    },[selectedValues, selectedOption])

      
    function handleChange(event) {
        setSelectedOption(event.target.value);
        setSelectedValues({ ...selectedValues, option: event.target.value})
      }

      const totalIncome = () =>{
        let total = 0
        Object.entries(dataJadwal).forEach(([key, value]) => {
            total += value.TPay
        })

        return total
    }

    const handleExport = () =>{
        const ws = XLSX.utils.json_to_sheet(dataJadwal);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "DataKeuangan.xlsx");
    }

    return(
        <>
        <div className=''>
        <section className='Header mt-5'>
            <div className='d-flex justify-content-start'> 
                <div className='mb-3' style={{
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

        <div className='d-flex justify-content-start mb-3'>
            <Form.Select aria-label="Default select example" style={{
                width:'20%'
            }} value={selectedOption} onChange={handleChange}>
                <option value="Semua">Jenis Pelayanan</option>
                <option value="Psikotes">Psikolog</option>
                <option value="Assessment-Center">Assessment Center</option>
                <option value="Konseling">Konseling</option>
                <option value="Ceramah">Ceramah</option>
                <option value="Training-SDM">Training/ Platihan SDM</option>
            </Form.Select>
            </div>
            <div className='d-flex justify-content-start'>
            <div className='border-0 rounded backColor p-3 mb-3' style={{
                    width:'20%'
                }}>
                    <p className='mb-1 text-center'>Kategori</p>
                    <h4 className='text-center mb-3'><strong>{selectedOption}</strong></h4>
                </div>
            </div>
        </section>
        <section className='p-3'>
            <Button onClick={handleExport} variant='success'> download file</Button>
        </section>
        <section>
        <Table striped>
                <thead className='tableHead'>
                    <tr>
                    <th>No</th> 
                    <th>Status</th>
                    <th>Customer</th>
                    <th>Perusahaan</th>
                    <th>Pelayanan</th>
                    <th>Psikolog</th>
                    <th>Sesi/Orang</th>
                    <th>M Pembayaran</th>
                    <th>T Pembayaran</th>
                    <th>Tanggal Transaksi</th>
                    </tr>
                </thead>
                    <tbody>
                    {dataJadwal?.map((dataJadwal, nomor)=> {

                        return (
                            <tr >
                                <td>{nomor+1}</td>
                                <td>{dataJadwal.Status}</td>
                                <td>{dataJadwal.nama}</td>
                                <td>{dataJadwal.namaP}</td>
                                <td>{dataJadwal.pelayanan}</td>
                                <td>
                                {/* baru */}
                                {dataJadwal.idPsikolog === 1 && <span> Chairiah Yulianti Siregar S.Psi., M.Psi Psikolog </span>}
                                {dataJadwal.idPsikolog === 2 && <span> Sarinah S.Psi., M.Psi Psikolog</span>}
                                {dataJadwal.idPsikolog === 3 && <span> Hasdina Trisnasuci, S.Psi,M.Psi, Psikolog</span>}
                                {dataJadwal.idPsikolog === 4 && <span> Achmad Irvan Dwi Putra, S.Psi,M.Psi, Psikolog</span>}
                                </td>
                                <td>{dataJadwal.sesi}</td>
                                <td>{dataJadwal.MPay}</td>
                                <td>Rp. {(dataJadwal.TPay).toLocaleString()}</td>
                                <td>{(new Date(dataJadwal.dateT)).toLocaleDateString('en-US')}</td>
                            </tr>
                        )
                    })}
                </tbody> 
        </Table>
        </section>

        <section>
        <div className='d-flex justify-content-end'>
            <div className='border-0 rounded bg-light p-3 mb-3' style={{
                    width:'30%'
                }}>
                    <p className='mb-1 text-center'>INCOME :</p>
                    <h2 className='text-center'><span className='fontNav mx-1'>Rp</span><strong>{(totalIncome() ).toLocaleString()}</strong></h2>
                </div>
            </div>
        </section>
        </div>
        
        </>
    )
}
export default Keuangan