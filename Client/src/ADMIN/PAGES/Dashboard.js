import { Table} from 'react-bootstrap';
import { useEffect, useState} from 'react';
import axios from 'axios';

function Dashboard () {
    const [user, setUser] = useState([])
    useEffect (() => {
        const fetchAllUser = async () =>{
            try{
                const res = await axios.get("http://localhost:8800/users")
                setUser(res.data)
                console.log(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllUser()
    }, [])
    console.log("user select",user.length-1)
    return(
        <>
        <div className='mr-5'>
        <section className='justify-content-md-center mt-5'>
            <div className='border-0 rounded backColor p-3 mb-3'>
                <h4 className='text-center mb-0'><strong>Total</strong></h4>
                <p className='text-center mb-0'>CUSTOMER</p>
                <h1 className='text-center mb-0'>{user?.length}</h1>
            </div>
        </section>
        <section>

        </section>
        <Table striped>
                <thead className='tableHead'>
                    <tr>
                    <th>Id</th> 
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Jenis Kelamin</th>
                    </tr>
                </thead>
                    <tbody>
                    {user?.map((user, key)=> {

                        return (
                            <tr key={user.id} >
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                            </tr>
                        )
                    })}
                </tbody> 
        </Table>
        </div>
        </>
    )
}
export default Dashboard