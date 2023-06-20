import {Container} from "react-bootstrap";
import { useState } from "react";
// images
import chatAdmin from '../Images/User/chatAdmin.png'
import FormChat from "./COMPONENTS/FormChat";
import ChatEngineSupport from "./COMPONENTS/ChatEngineSupport";

function ChatAdmin () {
    const [user, setUser] = useState(null)
    const [chat, setChat] = useState(null)
    
    return(
        <Container> 
            <img 
                src={chatAdmin}
                alt="chatAdmin"
                style={{
                    width:"20%"
                }}
                />
            <h2 className="text-center">CHAT <span className="mainColor">ADMIN</span></h2>
            <p className="text-muted text-center mb-5"><em>Masih bingung dengan pilihan layanan? atau dengan masalah lain?</em></p>
            {/* nama */}
            <FormChat
                        setUser={user => setUser(user)}
                        setChat={chat => setChat(chat)}
                        valid={user === null || chat === null}
                    />
                    
            <div className="border rounded">

            <ChatEngineSupport 
                valid={user != null && chat != null}
                chat={chat}
                user={user}
            />

            </div>
        </Container>
    )
}

export default ChatAdmin