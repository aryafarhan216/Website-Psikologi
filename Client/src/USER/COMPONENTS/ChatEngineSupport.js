
import { ChatEngine} from "react-chat-engine";

const ChatEngineSupport = props =>{

    return(
        <div>
        <div style={{
            position:'relative',
        }}>
        {
            props.valid &&
            <ChatEngine
                    projectID={process.env.REACT_APP_CE_PROJECT_ID}
                     userName={props.user.username}
                     userSecret={props.user.username}
            />
        }         
        </div>
        </div>

    )
}

export default ChatEngineSupport