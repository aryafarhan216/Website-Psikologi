import { useEffect,useState } from "react"
import { Button } from "react-bootstrap"
import { ChatEngine } from "react-chat-engine"
import axios from "axios"

function ChatSupport (){
    return(

        <ChatEngine 
            projectID = {process.env.REACT_APP_CE_PROJECT_ID}
            userName = 'Admin'
            userSecret = '12345'
            height = 'calc(100vh - 20px)'
        />
    )
}

export default ChatSupport