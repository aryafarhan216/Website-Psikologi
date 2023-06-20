
import { Col, Container, Row, Form, FloatingLabel, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from 'axios';

const FormChat = props =>{
    const[guest,setGuest] = useState("")
    console.log('isi ', guest)

    
    function getOrCreateUser(callback){
        axios.put("https://api.chatengine.io/users/",
            {
                "username" : guest,
                "secret" : guest,
            },
            {headers: {"Private-Key": process.env.REACT_APP_CE_PRIVATE_KEY}}
        )
        .then(r => callback(r.data))
    }

    function getOrCreateChat(callback){
        axios.put("https://api.chatengine.io/chats/",
            {
                "usernames": ["Admin", guest],
                "is_direct_chat": true,
            },
            {headers: {"Private-Key": process.env.REACT_APP_CE_PRIVATE_KEY}}
        )
        .then(r => callback(r.data))
    }


    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log('sending', guest)
        getOrCreateUser(
            user => {
                props.setUser(user)
                getOrCreateChat(
                    chat => {props.setChat(chat); console.log("sukses")}
                );
            }
        )
    }
    return(
    <div className="h-100 py-4">
        <h5>Isi Form <span className="mainColor">nama </span>dahulu</h5>
        <div>

        <form 
            onSubmit={e => handleSubmit(e)}
        >
            <input 
                onChange={e => setGuest(e.target.value)}
                placeholder="Nama"
            />
        </form>
        </div>
    </div>
    )
}

export default FormChat