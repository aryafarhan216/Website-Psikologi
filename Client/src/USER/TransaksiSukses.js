import "../styleGlobal.css"
// images
import transaksiSukses from "../Images/User/transaksiSukses.png"
function TransaksiSukses () {
    return(
        <>
        <section>
        <div className="d-flex justify-content-center">
            <img
                src={transaksiSukses}
                alt="done"
                style={{
                    width:"25%"
                }}

            />
        </div>
        <h4 className="text-center mb-0">TRANSAKSI <span className="mainColor">SUKSES</span></h4>
        <p className="text-center mb-4"><em>LIHAT DI <span className="mainColor">PESANAN</span></em></p>
        
        </section>
        </>
    )
}

export default TransaksiSukses