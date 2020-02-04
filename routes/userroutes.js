var axios = require('axios');
var multer = require('multer');

exports.page404 = function(req, res){
    res.render('./user/eror404') 
}
exports.login = function(req, res){
    var username = req.session.userNama;
        if(username !==null){
            username = "";
        }
    var message = '';
    if(req.method == 'POST'){
        var post= req.body;
        var name= post.email;
        var pass = post.password;

        req.getConnection(function(err, connect){
            var sql = "Select * from account_user where email='"+name+"' and password='"+pass+"'";
            var query = connect.query(sql, function(err, results){
                if(results.length){
                    req.session.userId=results[0].email
                    req.session.user=results[0];
                    req.session.userNama = results[0].username
                    console.log(results[0].id_user);
                    res.redirect('/');
                }else{
                    message="username or password inkurek";
                    res.render('./user/index',
                    {
                        message:message,
                        path:'login',
                        username:username
                    });
                }
            });
        });

    }else{
        res.render('./user/index',
        {
            message:message, 
            path:'login',
            username:username
        });
    }
}

exports.register = function(req, res){
    var message = '';

        var post={
            email: req.body.email,
            username: req.body.username,
            password : req.body.password,
            no_telp: req.body.no_telp,
            alamat: req.body.alamat,
            kota: req.body.kota,
            provinsi: req.body.provinsi
        }

        req.getConnection(function(err, connect){
            var sql="insert into account_user set ?";
            var query = connect.query(sql, post, function(err, results){
                if(err){
                    console.log("error register %s", err);
                    message="username or password inkurek";
                    res.render('./user/index',
                    {
                        message:message,
                        path:'login',
                    });
                }
                res.redirect('/');
            });
        });
}

exports.log_out = function(req, res){
    req.session.destroy(function(err){
        res.redirect('/');
    });
}



exports.home = function(req, res){
    req.getConnection(function(err, connect){
        var username = req.session.userNama;
        var userID = req.session.userId;
        if(username==null){
            username = "";
        }
        var sql = "select * from product where status ='Active' order by datecreate desc";
        console.log(sql);
        var query = connect.query(sql, function(err, results){
            if(err){
                console.log("Err show news : %s", err);
            }
            produk = results;
            req.getConnection(function(err, connect){
            var sql1 = "select * from brand where status = 'Active'";
            console.log(sql1);
            var query = connect.query(sql1, function(err, results){
                    if(err){
                        console.log("Err show news : %s", err);
                    }
                    res.render('./user/index', 
                    {   path:'home',
                        produk: produk,
                        brand: results,
                        username: username,
                        email:userID
                    });
                });
            });
        });
    });

}


exports.produk = function(req, res){
    req.getConnection(function(err, connect){
        var username = req.session.userNama;
        var userID = req.session.userId;
        if(username==null){
            username = "";
        }
        var sql = "select * from product where status='Active'";
        console.log(sql);
        var query = connect.query(sql, function(err, results){
            if(err){
                console.log("Err show news : %s", err);
            }
            produk = results;
            req.getConnection(function(err, connect){
            var sql1 = "select * from brand where status='Active'";
            console.log(sql1);
            var query = connect.query(sql1, function(err, results){
                    if(err){
                        console.log("Err show news : %s", err);
                    }
                    res.render('./user/index', 
                    {   path:'produklist',
                        produk: produk,
                        brand: results,
                        username: username,
                        email: userID
                    });
                });
            });
        });
    });
}

exports.produkdetil = function(req, res){
    req.getConnection(function(err, connect){
        var username = req.session.userNama;
        var userID = req.session.userId;
        if(username==null){
            username = "";
        }
        var kode = req.params.kode_produk;
        var sql = "select * from product where status='Active' and kode_produk ='"+kode+"'";
        var sql2 = "select * from product where status='Active' and exclusive='Yes'";
        var sql3 = "SELECT c.*, p.harga_jual FROM `cart` as c INNER JOIN product as p on p.kode_produk = c.kode_produk "+
                    "where c.email='"+userID+"' and c.kode_produk='"+kode+"' and c.status='cart'"
        console.log(sql);
        var query = connect.query(sql, function(err, results){
            if(err){
                console.log("Err show news : %s", err);
            }
            produk = results;
            var sql1 = "select * from product where kategori='"+produk[0].kategori+"' and not kode_produk='"+produk[0].kode_produk+"' limit 4";
            var query = connect.query(sql1, function(err, results){
                related_product =results;
                var query = connect.query(sql2, function(err, results){
                    produkekslusif=results;
                    var query = connect.query(sql3, function(err, results){
                        res.render('./user/index', 
                        {   path:'produkdetail',
                            produkdetil: produk,
                            produkekslusif: produkekslusif,
                            datacart:results,
                            produkelasi: related_product,
                            username: username,
                            email:userID
                        });
                    });
                });
            });
        });
    });
}


exports.cartadd = function(req, res){
    var username = req.session.userNama;
    var userID = req.session.userId;
        if(userID == null){

            res.redirect('/login');
            return;
        }
    req.getConnection(function(err, connect){
        var  email = req.body.email;
        var  kode_produk= req.body.kode_produk;
        var sql = "select * from cart where email='"+email+"' and kode_produk='"+kode_produk+"' and status='cart' ";
        var query = connect.query(sql, function(err, results){
            var post={
                email: req.body.email,
                kode_produk: req.body.kode_produk,
                qty: req.body.quantity,
                harga: req.body.harga,
                status: "cart"
            }
            if(results.length>0){
                console.log('ada');
                var sql2 = "update cart set email='"+post.email+"', kode_produk='"+post.kode_produk+"', qty='"+post.qty+"', harga='"+post.harga+"' where email='"+post.email+"' and kode_produk='"+post.kode_produk+"' and status='cart'"
                console.log(sql2);
                req.getConnection(function(err, connect){
                    var query = connect.query(sql2, function(err, results){
                        console.log(results);
                        if(err){
                            console.log("Err : %s", err);
                        }
                        res.redirect('/product');
                    });
                });
            }else{
                console.log('kaga ada');
                var sql3 = "insert into cart set ?"
                console.log(sql3);
                req.getConnection(function(err, connect){
                    var query = connect.query(sql3, post, function(err, results){
                        console.log(results);
                        if(err){
                            console.log("Err : %s", err);
                        }
                        res.redirect('/product');
                    });
                });
            }
        });
    });
}

exports.cartdelete = function(req, res){
    email = req.params.email;
    kode_produk = req.params.kode_produk;
    req.getConnection(function(err, connect){
        var sql = "delete from cart where email='"+email+"' and kode_produk='"+kode_produk+"' and status='cart'";

        var query = connect.query(sql, function(err, results){
        if(err){
            console.log("err delete %s", err);
        }
        req.flash('info', 'Success delete data! Data has been updated.');
        res.redirect('/cart');
        });
    });
}

exports.cart = function(req, res){
        // var http = require("https");

        // var options = {
        //   "method": "GET",
        //   "hostname": "api.rajaongkir.com",
        //   "port": null,
        //   "path": "https://api.rajaongkir.com/starter/province",
        //   "headers": {
        //     "key": "226729866ac87f74207b4d09da5e0c6a"
        //   }
        // };
        
        // var req = http.request(options, function (res) {
        //   var chunks = [];
        
        //   res.on("data", function (chunk) {
        //     chunks.push(chunk);
        //   });
        
        //   res.on("end", function () {
        //     var body = Buffer.concat(chunks);
        //     console.log("API Rjaongkir :"+body.toString());
        //     ongkir = body.rajaongkir.results.toString;
        //     console.log(ongkir);

        //   });
        // });
        
        // req.end();

    req.getConnection(function(err, connect){
        var username = req.session.userNama;
        var userID = req.session.userId;
        if(username == null){
            res.redirect('/login');
            return;
        }
        var sql =   "SELECT c.*, p.harga_jual, p.nama_produk, p.gambar1 "+
                    "FROM `cart` as c "+
                    "INNER JOIN product as p "+
                    "on p.kode_produk = c.kode_produk "+
                    "where c.email='"+userID+"' and c.status='cart'";

        console.log(sql);
        var query = connect.query(sql, function(err, results){
            if(err){
                console.log("Err show news : %s", err);
            }
            cart = results;
            req.getConnection(function(err, connect){
            var sql1 = "select * from account_user where email='"+userID+"'";
            console.log(sql1);
            var query = connect.query(sql1, function(err, results){
                    if(err){
                        console.log("Err show news : %s", err);
                    }
                    res.render('./user/index', 
                    {   path:'cart',
                        cart: cart,
                        account: results,
                        username: username,
                        email: userID
                    });
                });
            });
        });
    });
}


exports.checkout = function(req, res){
    req.getConnection(function(err, connect){
        var sql = "select max(right(no_faktur,5)) as no_faktur from faktur";
        var query = connect.query(sql, function(err, results){
            if(results[0].no_faktur!== null){
                var x = parseInt(results[0].no_faktur)+1;
                x = x.toString();
                for(i= x.length; i < 5; i++){
                    x = "0"+x;
                }
                x = "FK"+x;      
            }else{
                var x = "FK00001";
            }
            var date = new Date(Date.now());
            post = {
                no_faktur: x,
                email: req.body.email,
                nama_penerima: req.body.nama_penerima,
                alamat: req.body.alamat_penerima,
                kota: req.body.kota,
                provinsi: req.body.provinsi,
                total_barang: req.body.total_barang,
                biaya_kirim: req.body.shipping,
                total_faktur: req.body.grand_total,
                datecreated: date,
                status:"created" 
            }
            console.log(post);
            var sql2 = "insert into faktur set ?"
            var sql3 = "update cart set status='checkout', no_faktur='"+post.no_faktur+"' where email='"+post.email+"' and status='cart'"
            var query = connect.query(sql2, post, function(err, results){
                var query = connect.query(sql3, function(err, results){
                res.redirect('/');
                });
            });
        });    
    });
}

exports.confirm_payment = function(req, res){
    var username = req.session.userNama;
    var userID = req.session.userId;
        if(userID == null){
            res.redirect('/login');
            return;
        }
    req.getConnection(function(err, connect){
        var sql = "select * from faktur where email='"+userID+"' and status='created'";
        var sql2 = "select * from pembayaran where email='"+userID+"'";
        var query = connect.query(sql, function(err, results){
            var faktur = results;
            var query = connect.query(sql2, function(err, results){
                res.render('./user/index',{
                    path: "confirm_payment",
                    faktur: faktur,
                    payment:results,
                    username:username,
                    email:userID
                });
            });
        });
    });
}

exports.confirm_payment_add = function(req, res){
    req.getConnection(function(err, connect){
        sql = "select max(right(no_payment,5)) as no_payment from pembayaran";
        var query = connect.query(sql, function(err, results){
            if(results[0].no_payment!== null){
                var x = parseInt(results[0].no_payment)+1;
                x = x.toString();
                for(i= x.length; i < 5; i++){
                    x = "0"+x;
                }
                x = "P"+x;      
            }else{
                var x = "P00001";
            }

            function generatename(file){
                //nomor baru harus bisa masuk disini
                // a = b+"1"+file.originalname.slice(-4);
                a = x+file.originalname.slice(-4);
                console.log(a);
                return a;
            }

            var storage = multer.diskStorage({
                destination: './public/image/payment',
                filename : function(req, file, callback){
                    callback(null,generatename(file));
                }
            });

            var upload = multer({storage: storage}).single('gambar');

            upload(req, res, function(err){
                if(err){
                    return res.end('error uploading image');
                } else {
                    var image = req.file.filename;
                }

                console.log(req.file);
                console.log(req.body);
            var date = new Date(Date.now());
            req.getConnection(function(err, connect){
                //tangkap nilai / value dari body
                var post={ 
                    no_payment: x,
                    email: req.body.email,
                    no_faktur: req.body.no_faktur,
                    bank: req.body.bank,
                    nominal: req.body.nominal,
                    gambar: req.file.filename,
                    tanggal: date,
                    status: "confirming"
                }
                console.log(post);

                var sql="insert into pembayaran set ?";
                var query = connect.query(sql, post, function(err, results){
                    if(err){
                        console.log("error input product %s", err);
                    }
                    req.flash('info', 'Success add data! Data has been updated.');
                    res.redirect('/confirm_payment');
                });
                });
            });
        });
    });
}

exports.remove_payment = function(req, res){
    var gambar = req.params.gambar;
    const fs = require('fs');

    fs.unlink('D:/Document/02. Materi BabaStudio/Week7/Ujian_Ecommerce/public/image/payment/'+gambar, (err) => {
    if (err) throw err;
    });
    req.getConnection(function(err, connect){
        var sql="delete from pembayaran where no_payment='"+gambar.slice(0,6)+"'";
        console.log(sql)
        var query = connect.query(sql, function(err, results){
            res.redirect('/confirm_payment');
        });
    });
}