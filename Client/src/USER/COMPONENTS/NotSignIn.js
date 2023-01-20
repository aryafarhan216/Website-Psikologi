
import NotLogin from "../../Images/User/NotLogin.png"
function NotSignIn (){
    return(
        <section>
        <div className="d-flex justify-content-center">
        <img 
        src={NotLogin}
        alt="alur2"
        style={{
            width:"50%"
        }}
        className=""
        />
        
        </div>
        <p className="text-center"> <em>Harus <span className="mainColor">Sign In</span> dulu</em></p>
        </section>

    )
}

export default NotSignIn