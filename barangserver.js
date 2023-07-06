var express = require ('express');
var bodyparser = require('body-parser');
var fs = require('fs');
var mysql = require('mysql');
var app = express();

app.use(bodyparser.json());
const {json} = require('body-parser');
const { connect } = require('http2');

const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'barang'
});

conn.connect(function(err){
    if (err) throw err;
    console.log("MySQL connected...");
});


//admin
app.post('/admin', function(req, res) {
    console.log("POST request /admin");

    let username = {user: req.body.username};
    json.getString
    console.log("POST request data ="+JSON.stringify(username.user));
    let password = {pass: req.body.password};
    console.log("POST request data ="+JSON.stringify(password.pass));
    let sql = "SELECT id, nama FROM admin WHERE nama='"+username.user+"' AND password = '"+password.pass+"'";
    console.log(sql)
    let query = conn.query(sql, (err, result) => {
        console.log(JSON.stringify(
            {"status" : 200, "error" : null, "response" : result}
        ));
        if(result != "") {
            res.send("Login Berhasil")
        }
        else {
            res.send("Login Gagal")}
    });
});


// register user
app.post('/register', function(req, res) {
    console.log('POST request /register');
    let username = {user: req.body.username};
    json.getString
    console.log("POST request data ="+JSON.stringify(username.user));

    let password = {pass: req.body.password};
    console.log("POST request data ="+JSON.stringify(password.pass));

    let check = "SELECT iduser FROM user WHERE nama ='"+username.user+"'";

    let checker = conn.query(check, (err, checkresult)=>{
        console.log(JSON.stringify(
            {
                "status" : 200,
                "error" : null,
                "response" : checkresult
            }
        ));
        console.log(checkresult);
        if (checkresult == ""){
            let sql = "INSERT INTO user (nama, password) VALUES ('"+username.user+"','"+password.pass+"')";
            let query = conn.query(sql, (err, result) =>{
                console.log(JSON.stringify(
                    {
                        "status" : 200,
                        "error" : null,
                        "response" : result
                    }
                ));
                conn.query(check, (err, checkresult) => {
                    console.log(JSON.stringify(
                        {
                            "status" : 200,
                            "error" : null,
                            "response" : checkresult
                        }
                    ));
                });
                res.send("Pendaftaran Berhasil")
            });
        }
        else {
            res.send("Pendaftaran Gagal")
        }
    })
});

// register admin
app.post('/registeradmin', function(req, res) {
    console.log('POST request /registeradmin');
    let username = {user: req.body.username};
    json.getString
    console.log("POST request data ="+JSON.stringify(username.user));

    let password = {pass: req.body.password};
    console.log("POST request data ="+JSON.stringify(password.pass));

    let check = "SELECT idadmin FROM admin WHERE username ='"+username.user+"'";

    let checker = conn.query(check, (err, checkresult)=>{
        console.log(JSON.stringify(
            {
                "status" : 200,
                "error" : null,
                "response" : checkresult
            }
        ));
        console.log(checkresult);
        if (checkresult == ""){
            let sql = "INSERT INTO admin (username, password) VALUES ('"+username.user+"','"+password.pass+"')";
            let query = conn.query(sql, (err, result) =>{
                console.log(JSON.stringify(
                    {
                        "status" : 200,
                        "error" : null,
                        "response" : result
                    }
                ));
                conn.query(check, (err, checkresult) => {
                    console.log(JSON.stringify(
                        {
                            "status" : 200,
                            "error" : null,
                            "response" : checkresult
                        }
                    ));
                });
                res.send("Pendaftaran Berhasil")
            });
        }
        else {
            res.send("Pendaftaran Gagal")
        }
    })
});

// user login
app.post('/login', function(req, res) {
    console.log("POST request /login");
    let username = {user: req.body.username};
    let password = {pass: req.body.password};
  
    let sql = "SELECT iduser, nama FROM user WHERE nama='"+username.user+"' AND password = '"+password.pass+"'";
    console.log(sql);
  
    let query = conn.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ status: 500, error: 'Internal Server Error', response: null });
      } else {
        if (result.length > 0) {
          res.status(200).json({ status: 200, error: null, response: 'Login Berhasil' });
        } else {
          res.status(401).json({ status: 401, error: 'Unauthorized', response: 'Login Gagal' });
        }
      }
    });
  });


 // list barang 
app.get('/listbarang', function(req, res) {
    console.log('Menerima GET request /listbarang');
    let sql = "SELECT * FROM listbarang";
    let query = conn.query(sql, function(err, result){
        if (err) throw err;
        res.send(JSON.stringify({
            "status" : 200,
            "error" : null,
            "response" : result
        }));
    });
});


//tambah barang
app.post('/tambahbarang', function(req, res) {
    console.log('POST request /tambahbarang');

    let pembuatan = {pembuatan: req.body.pembuatan};
    console.log("POST request data ="+JSON.stringify(pembuatan.pembuatan));
 
    let harga = {harga: req.body.hargabarang};
    console.log("POST request data ="+JSON.stringify(harga.harga));

    let nama = {nama: req.body.nama };
    console.log("POST request data ="+JSON.stringify(nama.nama));

  
    let check = "SELECT idbarang FROM listbarang WHERE nama ='"+nama.nama+"'";

    let checker = conn.query(check, (err, checkresult)=>{
        console.log(JSON.stringify(
            {
                "status" : 200,
                "error" : null,
                "response" : checkresult
            }
        ));
        console.log(checkresult);
        if (checkresult == ""){
            let sql = "INSERT INTO listbarang (pembuatan, harga, nama) VALUES ('"+pembuatan.pembuatan+"','"+harga.harga+"','"+nama.nama+"')";
            let query = conn.query(sql, (err, result) =>{
                console.log(JSON.stringify(
                    {
                        "status" : 200,
                        "error" : null,
                        "response" : result
                    }
                ));
                conn.query(check, (err, checkresult) => {
                    console.log(JSON.stringify(
                        {
                            "status" : 200,
                            "error" : null,
                            "response" : checkresult
                        }
                    ));
                });
                res.send("Berhasil Menambah")
            });
        }
        else {
            res.send("Gagal Menambah")
        }
    })
});
//edit list barang
app.put('/editbarang', function(req, res) {
    let pembuatan = {pembuatan: req.body.pembuatan};
    let harga = {harga: req.body.harga};
    let nama = {nama: req.body.nama};
    let idbarang = {idbarang:req.body.idbarang};
    
    let sql = "UPDATE listbarang SET harga='" + harga.harga + "', nama='" + nama.nama + "', pembuatan='" + pembuatan.pembuatan + "' WHERE idbarang='" + idbarang.idbarang + "'";


    let query = conn.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Gagal Mengedit Data");
        } else {
          if (result.affectedRows > 0) {
              console.log("Berhasil Mengedit Data");
              res.status(200).send("Berhasil Mengedit Data");
            } else {
              console.log("Data tidak ditemukan.");
              res.status(200).send("Data tidak ditemukan.");
            }
        }
      })
  });


  app.post('/hapus', function(req, res) {
    console.log('POST request /hapus');
    let pembuatan = req.body.pembuatan;
    let harga = req.body.harga;
    let nama = req.body.nama;
    let idbarang = req.body.idbarang;
    
    let deletebarangQuery = "DELETE FROM listbarang WHERE nama = ? AND harga = ? AND pembuatan = ? AND idbarang = ?";
    let deletebarangParams = [nama, harga, pembuatan, idbarang];
    
    conn.query(deletebarangQuery, deletebarangParams, function(error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).send("Gagal menghapus data barang.");
      } else {
        if (results.affectedRows > 0) {
            console.log("Berhasil menghapus data barang.");
            res.status(200).send("Berhasil menghapus data barang.");
          } else {
            console.log("Data tidak ditemukan.");
            res.status(200).send("Data tidak ditemukan.");
          }
      }
    });
});

var server = app.listen(8000, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("Express app listening at http://%s:%s", host, port);
})