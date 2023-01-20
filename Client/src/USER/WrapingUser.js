

  import {
    useParams
  } from "react-router-dom";
// pages
import FooterBot from "./COMPONENTS/FooterBot"
import NavbarTop from "./COMPONENTS/NavbarTop"
import HomePage from "./HomePage";
import LayananToko from "./LayananToko";
import Pesanan from "./Pesanan";
import FormPesanan from "./FormPesanan";
import TransaksiSukses from "./TransaksiSukses";
import HasilPesanan from "./HasilPesanan";

function WrapingUser (){
    let { name } = useParams();
    console.log(name)
    const Page = () =>{
        switch(name){
          case "homepage":
            return <HomePage />
            break
          case "layananKonseling":
            return <LayananToko />
            break
          case "jadwal":
            return <FormPesanan />
            break
          case "pesanan":
              return <Pesanan />
              break
          case "hasilPelayanan":
              return <HasilPesanan />
              break
          case "transaksiSukses":
              return <TransaksiSukses />
              break
    
          default: return <h1 className="text-center my-5">404</h1>
        }
      }
    return(
        <>
        {/* Navbar */}
        <NavbarTop />
        {/* End Of Navbar */}

        {/* Body */}
            {Page ()}
        {/* End of Body */}

        {/* Footer */}
        <FooterBot />
        {/* End Of Footer */}

        
        </>
    )

}

export default WrapingUser
