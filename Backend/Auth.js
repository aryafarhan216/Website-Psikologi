import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from 'multer';
import fs from 'fs';

const app = express()
const upload = multer({dest: 'uploads/'})

// connection
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"db123456",
    database:"YSDM"
})

app.use(express.json())
app.use(cors())

// Sign In Validation
app.post("/user", (req,res)=>{ 
    const values = [
        req.body.email,
        req.body.password
    ]
    console.log(values[1])
    const q = "SELECT id, name, email, gender, password FROM user WHERE email = ?"
    db.query(q, [values[0]],  (err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// Sign Up User
app.post("/signUp",(req,res) =>{
    const q = "INSERT INTO user (`name`,`gender`,`email`,`password`) VALUES (?)"
    const values=[
        req.body.name,
        req.body.gender,
        req.body.email,
        req.body.password,
    ]

    db.query(q,[values],(err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// insert data hasil
app.post('/uploadDataHasil', upload.single('file'), (req, res) => {
    console.log("masuk")
    const file = req.file;
    const otherData = JSON.parse(req.body.otherData);
    const fileName = file.originalname;
    const filePath = file.path;
  
    db.query('INSERT INTO dataHasil (idC, idDJ, status, nama, namaP, pelayanan, dateJ, fileName, path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
    [otherData.idC, otherData.idDJ, otherData.option, otherData.nama, otherData.namap, otherData.subOption, otherData.jadwal, fileName, filePath], 
    (error, results) => {
      if (error) {
        res.send(error);
      } else {
        res.send(results);
      }
    });
  });
// get data hasil
app.get('/dataHasil',(req, res)=>{
    const q = "SELECT * FROM dataHasil"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
// get data hasil kondisional
app.post('/tanggal/dataHasil',(req, res)=>{
    const q = "SELECT * FROM dataHasil WHERE dateT BETWEEN ? AND ?"
    const values = [
        req.body.date1,
        req.body.date2
    ]
    console.log("data hasil range", values)
    db.query(q,[values[0], values[1]],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
// get data hasil
app.post('/user/dataHasil',(req, res)=>{
    const q = "SELECT * FROM dataHasil WHERE idC =? "
    const values = [
        req.body.id,
        req.body.nama
    ]
    console.log(values)
    db.query(q,values[0], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
// insert data jadwal
app.post("/insertDataJadwal",(req,res) =>{
    console.log("masuk insertData")
    const q = "INSERT INTO dataJadwal (`idC`, `status`, `nama`, `namaP`, `pelayanan`, `sesi`, `dateJ`, `MPay`, `TPay` ) VALUES (?)"
    const values = [
        req.body.idC,
        req.body.option,
        req.body.nama,
        req.body.namaP,
        req.body.subOption,
        req.body.sesi,
        req.body.jadwal,
        req.body.MPay,
        req.body.sum
    ]
    console.log(values)
    db.query(q,[values],(err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
// get data jadwal
app.get("/dataJadwal",(req,res) =>{
    const q = "SELECT * FROM dataJadwal "
    db.query(q,(err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// get data jadwal kondisional 1
app.post("/jadwal/dataJadwal",(req,res) =>{
    const q = "SELECT * FROM dataJadwal WHERE dateT BETWEEN ? AND ?"
    const values = [
        req.body.date1,
        req.body.date2
    ]
    console.log("isi", values)
    db.query(q,[values[0], values[1]],(err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// get data jadwal kondisional 2
app.post("/keuangan/dataJadwal",(req,res) =>{
    const values = [
        req.body.option,
        req.body.date1,
        req.body.date2
    ]
    console.log(values)
    if (values[0]=== "Semua" || values[0]=== ""){
        const q = `SELECT * FROM dataJadwal WHERE dateT BETWEEN ? AND ?`
        console.log(values)
        db.query(q,[values[1], values[2]],(err,data) =>{
            if(err) return res.json(err)
            return res.json(data)
        })
    }else{
        if (values[1] === '' && values[2] === '' || values[1] === null && values[2] === null){
            const q = `SELECT * FROM dataJadwal WHERE pelayanan =?`
            console.log("lain", values)
            db.query(q,[values[0]],(err,data) =>{
                if(err) return res.json(err)
                return res.json(data)
            })

        }else{
            const q = `SELECT * FROM dataJadwal WHERE pelayanan =? AND dateT BETWEEN ? AND ?`
            console.log("lain", values)
            db.query(q,[values[0], values[1], values[2]],(err,data) =>{
                if(err) return res.json(err)
                return res.json(data)
            })
        }

    }


})

// download data hasil
app.get('/downloadDataHasil/:id', (req, res) => {
    console.log("masuk", req.id)
     db.query('SELECT path FROM dataHasil WHERE idDH = ?', [req.params.id], (error, results) => {
    if (error) {
      res.send(error);
    } else {
      const file = results[0].path;
      res.download(file);
    }
  });
});

// get data Hasil
app.post("/dataHasilId",(req,res) =>{
    const q = "SELECT * FROM dataHasil WHERE idDH = ?"
    const values = [
        req.body.nama,
        req.body.id
    ]

    console.log("isi",values)
    db.query(q,values[1],(err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


// get data pesanan
app.post("/dataPesanan",(req,res) =>{
    const q = "SELECT * FROM dataJadwal WHERE idC = ?"
    const values = [
        req.body.nama,
        req.body.id
    ]

    console.log("isi",values)
    db.query(q,values[1],(err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// --------------------- Jadwal Psikolog ------------------//
// get All Jadwal Psikolog
app.get("/psikolog", (req,res)=>{
    const q = "SELECT * FROM dataSP"
    db.query(q, (err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
// Insert Jadwal Psikolog
app.post("/jadwal/psikolog",(req,res) =>{
    const q = "INSERT INTO dataSP (`dateP`) VALUES (?)"
    const values = req.body.dateP
    db.query(q,values,(err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
// Delete Jadwal Psikolog
app.delete("/psikolog/:id",(req,res) =>{
    const values = req.params.id;
    const q = "DELETE FROM dataSP WHERE idSP = ?"
    db.query(q,values,(err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// Delete Jadwal Psikolog
app.post("/delete/psikolog",(req,res) =>{
    const values = req.body.jadwal
    const q = "DELETE FROM dataSP WHERE dateP = ?"
    console.log("masuk database", values)
    db.query(q,values,(err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// --------------------- Jadwal Assessment Center ------------------//
// get All Jadwal Assessment
app.get("/assessment", (req,res)=>{
    const q = "SELECT * FROM dataSAC"
    db.query(q, (err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
// Insert Jadwal Assessment
app.post("/jadwal/assessment",(req,res) =>{
    const q = "INSERT INTO dataSAC (`dateAC`) VALUES (?)"
    const values = req.body.dateP
    console.log(values)
    db.query(q,values,(err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
// Delete Jadwal Assessment
app.delete("/assessment/:id",(req,res) =>{
    const values = req.params.id;
    const q = "DELETE FROM dataSAC WHERE idSAC = ?"
    db.query(q,values,(err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
// Delete Jadwal Assessment
app.post("/delete/assessment",(req,res) =>{
    const values = req.body.jadwal
    const q = "DELETE FROM dataSAC WHERE dateAC = ?"
    console.log("masuk database", values)
    db.query(q,values,(err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
// --------------------- Konseling ------------------//
// get All Jadwal konseling
app.get("/konseling", (req,res)=>{
    const q = "SELECT * FROM dataSK"
    db.query(q, (err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
// Insert Jadwal konseling
app.post("/jadwal/konseling",(req,res) =>{
    const q = "INSERT INTO dataSK (`dateK`) VALUES (?)"
    const values = req.body.dateP
    console.log(values)
    db.query(q,values,(err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
// Delete Jadwal konseling
app.delete("/konseling/:id",(req,res) =>{
    const values = req.params.id;
    const q = "DELETE FROM dataSK WHERE idSK = ?"
    db.query(q,values,(err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
// Delete Jadwal konseling
app.delete("/konseling/:id",(req,res) =>{
    const values = req.params.id;
    const q = "DELETE FROM dataSK WHERE idSK = ?"
    db.query(q,values,(err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
// Delete Jadwal konseling
app.post("/delete/konseling",(req,res) =>{
    const values = req.body.jadwal
    const q = "DELETE FROM dataSK WHERE dateK = ?"
    console.log(values)
    db.query(q,values,(err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// --------------------- Ceramah ------------------//
// get All Jadwal ceramah
app.get("/ceramah", (req,res)=>{
    const q = "SELECT * FROM dataSC"
    db.query(q, (err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
// Insert Jadwal ceramah
app.post("/jadwal/ceramah",(req,res) =>{
    const q = "INSERT INTO dataSC (`dateC`) VALUES (?)"
    const values = req.body.dateP
    console.log(values)
    db.query(q,values,(err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
// Delete Jadwal ceramah
app.delete("/ceramah/:id",(req,res) =>{
    const values = req.params.id;
    const q = "DELETE FROM dataSC WHERE idSC = ?"
    db.query(q,values,(err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// Delete Jadwal ceramah
app.post("/delete/ceramah",(req,res) =>{
    const values = req.body.jadwal
    const q = "DELETE FROM dataSC WHERE dateC = ?"
    db.query(q,values,(err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// --------------------- Training SDM ------------------//
// get All Jadwal sdm
app.get("/sdm", (req,res)=>{
    const q = "SELECT * FROM dataST"
    db.query(q, (err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
// Insert Jadwal sdm
app.post("/jadwal/sdm",(req,res) =>{
    const q = "INSERT INTO dataST (`dateT`) VALUES (?)"
    const values = req.body.dateP
    console.log(values)
    db.query(q,values,(err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
// Delete Jadwal sdm
app.delete("/sdm/:id",(req,res) =>{
    const values = req.params.id;
    const q = "DELETE FROM dataST WHERE idST = ?"
    db.query(q,values,(err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// Delete Jadwal training
app.post("/delete/training-sdm",(req,res) =>{
    const values = req.body.jadwal
    const q = "DELETE FROM dataST WHERE dateT = ?"
    db.query(q,values,(err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// get All Users
app.get("/users", (req,res)=>{
    const q = "SELECT * FROM user"
    db.query(q, (err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
// get All Users
app.get("/psikolog", (req,res)=>{
    const q = "SELECT * FROM dataSP"
    db.query(q, (err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})



// Test Backend
app.get("/",(req,res)=>{
    res.json("hello this is the backend")
})

app.listen(8800,()=>{
    console.log("Backend Connection success")
})