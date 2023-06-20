import "../styleGlobal.css"
import{
    Button, 
} from "react-bootstrap"
import {useNavigate} from 'react-router-dom'
// images
import section4Img from "../Images/User/section4IMG.png"

function LayananToko (){
    const navigate = useNavigate()
    const handleClick = () =>{
        navigate("/user/chatAdmin")
    }
    return(
        <>
        {/* Section 1 */}
        <section>
        <div className="d-flex justify-content-center">
            <img
                src={section4Img}
                alt="section4"
                style={{
                    width:"30%"
                }}
            />
        </div>
        </section>
        {/* End of Section 1 */}
        {/* Section 2 */}
        <section>
            <h4 className="text-center mt-5">Psikotes</h4>
            <p className="text-center">Suatu prosedur/langkah-langkah yang sistematis untuk <br />
                mengobservasi individu sehingga diperoleh gambaran <br />
                menyeluruh mengenai psikologi (IQ, Sikap Kerja, <br />
                kepribadian) seseorang. Psikotes digunakan untuk Tes <br />
                Minat dan Bakat, Rekrutmen, seleksi dan Penempatan.<br /></p>
        </section>
        {/* End of Section 2 */}
        {/* Section 3 */}
        <section>
            <h4 className="text-center mt-5">Assessment Center</h4>
            <p className="text-center">Suatu metoda untuk mengidentifikasi dan menjaring <br />
            pegawai, yang dinilai memiliki potensi dari sisi manajerial <br />
            (managerial skill) untuk menduduki suatu jabatan <br />
            tertentu di kemudian hari (future responsibility).<br /></p>
        </section>
        {/* End of Section 3 */}
        {/* Section 4 */}
        <section>
            <h4 className="text-center mt-5">Konseling</h4>
            <p className="text-center">Konseling merupakan suatu proses yang dipersiapkan <br />
            secara profesional untuk membantu orang lain dalam <br />
            pemahaman diri pembuatan keputusan dan pemecahan <br />
            masalah dari hati kehati antar manusia.</p>
        </section>
        {/* End of Section 4 */}
        {/* Section 5 */}
        <section>
            <h4 className="text-center mt-5">Ceramah</h4>
            <p className="text-center">Pemberian ceramah sesuai dengan materi yang <br />
            diinginkan.</p>
        </section>
        {/* End of Section 5 */}
        {/* Section 6 */}
        <section>
            <h4 className="text-center mt-5">Training/ Pelatihan SDM</h4>
            <p className="text-center">Training Sumber Daya Manusia dalam suatu perusahaan <br />
            merupakan aset penting bagi perkembangan <br />
            perusahaan. Untuk meningkatkan kualitas dan <br />
            keterampilan kerja para karyawan, banyak perusahaan <br />
            mengadakan pelatihan kerja/training untuk <br />
            meningkatkan kompetensi karyawan.<br /></p>
        </section>
        {/* End of Section 6 */}
        {/* Section 7 */}
        <section className="section2 backColor px-3 py-4 mb-3 mt-5">
            <h4 className="text-center mb-0"><strong>Masih bingung</strong></h4>
            <h4 className="text-center"><em>Konsultasi layanan yang mana?</em></h4>
            <h4 className="mainColor text-center"><em>Chat Adminnya</em></h4>
            <div className="d-flex justify-content-center">
            <Button  className="align-self-center my-2 buttons2 px-5" onClick={handleClick}>Chat Admin</Button>
            </div>
        </section>
        {/* End of Section 7 */}
        </>
    )
}

export default LayananToko