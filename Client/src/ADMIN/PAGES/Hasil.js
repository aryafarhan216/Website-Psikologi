import { Button, Table} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import * as XLSX from 'xlsx';


function Hasil () {
    const [dateRange, setDateRange] = useState([null, null]);
    const [selectedValues, setSelectedValues] = useState({date1:"", date2:""})
    const [startDate, endDate] = dateRange;
    // variabel
    const [dataHasil, setDataHasil] = useState([])
    useEffect(() =>{
        const fetchAllDataHasil = async () =>{
            try{
                if(selectedValues.date1 === null && selectedValues.date2 === null || selectedValues.date1 === "" && selectedValues.date2 === "" ){
                    const res = await axios.get("http://localhost:8800/dataHasil")
                    setDataHasil(res.data)
                }else{
                    console.log("isi", selectedValues)
                    const res = await axios.post("http://localhost:8800/tanggal/dataHasil", selectedValues)
                    setDataHasil(res.data)
                    console.log(res.data)
                }

            }catch(err){
                console.log(err)
            }
        }
        fetchAllDataHasil()
    },[selectedValues])

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
    const handleExport = () =>{
        const ws = XLSX.utils.json_to_sheet(dataHasil);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "DataHasil.xlsx");
    }
    return(

        <>
        <div className='mr-5'>
        <section className=' mt-5'>
            <div className='border-0 rounded backColor p-3 mb-3'>
                <h4 className='text-center mb-0'><strong>Total</strong></h4>
                <p className='text-center mb-0'>Hasil CUSTOMER</p>
                <h1 className='text-center mb-0'>{dataHasil.length}</h1>
            </div>
            <div className='d-flex justify-content-start'> 
                    <section>
                        <Button onClick={handleExport} variant='success'> download file</Button>
                    </section>
                <div className='mb-3 mx-3' style={{
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
                    <th>Status</th>
                    <th>Nama</th>
                    <th>Perusahaan</th>
                    <th>Status</th>
                    <th>Psikolog</th>
                    <th>Tanggal Janjian</th>
                    <th>Tanggal Selesai</th>
                    <th>File</th>
                    </tr>
                </thead>
                <tbody>
                {dataHasil.map((dataHasil, nomor) =>{
                    return(
                        <tr>
                            <td>{nomor+1}</td>
                            <td>{dataHasil.idDJ}</td>
                            <td>{dataHasil.status}</td>
                            <td>{dataHasil.nama}</td>
                            <td>{dataHasil.namaP}</td>
                            <td>{dataHasil.pelayanan}</td>
                            <td>
                            {/* baru */}
                                {dataHasil.idPsikolog === 1 && <span> Chairiah Yulianti Siregar S.Psi., M.Psi Psikolog </span>}
                                {dataHasil.idPsikolog === 2 && <span> Sarinah S.Psi., M.Psi Psikolog</span>}
                                {dataHasil.idPsikolog === 3 && <span> Hasdina Trisnasuci, S.Psi,M.Psi, Psikolog</span>}
                                {dataHasil.idPsikolog === 4 && <span> Achmad Irvan Dwi Putra, S.Psi,M.Psi, Psikolog</span>}
                            </td>
                            <td>{dataHasil.dateJ}</td>
                            <td>{(new Date(dataHasil.dateT)).toLocaleDateString('en-US')}</td>
                            <td onClick={() => handleDowload(dataHasil.idDH)}>{dataHasil.fileName}</td>
                        </tr>
                    )
                })}
                </tbody>

        </Table>
        </div>
        </>
    )
}
export default Hasil