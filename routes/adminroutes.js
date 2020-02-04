var multer = require('multer');

exports.login = function(req, res){
    var message = '';
    if(req.method == 'POST'){
        var post= req.body;
        var name= post.username;
        var pass = post.password;

        req.getConnection(function(err, connect){
            var sql = "Select * from account_admin where username='"+name+"' and password='"+pass+"'";
            var query = connect.query(sql, function(err, results){
                if(results.length){
                    req.session.adminId=results[0].id_admin
                    req.session.admin=results[0];
                    req.session.adminNama = results[0].username
                    console.log(results[0].id_admin);
                    res.redirect('/admin/');
                }else{
                    message="username or password inkurek";
                    res.render('./admin/login',{message:message,sql:sql});
                }
            });
        });

    }else{
        res.render('./admin/login',
        {message:message});
    }
}

exports.home = function(req, res){
    var admin = req.session.admin;
    var adminId = req.session.adminId;
    var adminnama = req.session.adminNama;
    console.log('id admin '+ adminId);

    if(adminId == null){
        res.redirect('/admin/login');
        return;
    }

    res.render('./admin/index',{
        path : "dashboard",
        adminNama : adminnama
    });
}

exports.page404 = function(req, res){
    var admin = req.session.admin;
    var adminId = req.session.adminId;
    var adminnama = req.session.adminNama;
    console.log('id admin '+ adminId);

    if(adminId == null){
        res.redirect('/admin/login');
        return;
    }

    res.render('./admin/index', {
        path : "not found",
        adminNama : adminnama
    });
}

exports.produklist = function(req, res){
    var admin = req.session.admin;
    var adminId = req.session.adminId;
    var adminnama = req.session.adminNama;
    console.log('id admin '+ adminId);

    if(adminId == null){
        res.redirect('/admin/login');
        return;
    }

    req.getConnection(function(err, connect) {
        var sql = "SELECT * FROM product";
        var query = connect.query(sql, function(err, results) {
        res.render('./admin/index', {
        path: 'produklist',
        adminNama : adminnama,
        data: results
        });
        });
    });
}

exports.produkdetail = function(req, res){
    var admin = req.session.admin;
    var adminId = req.session.adminId;
    var adminnama = req.session.adminNama;
    console.log('id admin '+ adminId);

    if(adminId == null){
        res.redirect('/admin/login');
        return;
    }

    var kode_produk = req.params.kode_produk;

    req.getConnection(function(err, connect){
        var sql = "select * from product where kode_produk ='"+kode_produk+"'";
        console.log(sql);
        var query = connect.query(sql, function(err, results){
            if(err){
                console.log("Err show news : %s", err);
            }

            res.render('./admin/index',
            {   path:'detail_product',
                adminNama : adminnama,
                data: results
            });
        });
    });
}

exports.productadd = function(req, res){
    var admin = req.session.admin;
    var adminId = req.session.adminId;
    var adminnama = req.session.adminNama;
    console.log('id admin '+ adminId);

    if(adminId == null){
        res.redirect('/admin/login');
        return;
    }
    req.getConnection(function(err, connect) {
        var sql = "SELECT * FROM brand";
        var query = connect.query(sql, function(err, results) {
        res.render('./admin/index', {
                path: 'add_product',
                adminNama : adminnama,
                brand: results
        });
        });
    });
    
}

exports.produkedit = function(req, res){
    var admin = req.session.admin;
    var adminId = req.session.adminId;
    var adminnama = req.session.adminNama;
    console.log('id admin '+ adminId);

    if(adminId == null){
        res.redirect('/admin/login');
        return;
    }

    var kode_produk = req.params.kode_produk;

    req.getConnection(function(err, connect){
        var sql = "select * from product where kode_produk ='"+kode_produk+"'";
        console.log(sql);
        var query = connect.query(sql, function(err, results){
            if(err){
                console.log("Err show news : %s", err);
            }

            produk = results;
            console.log('produk : '+produk);

            req.getConnection(function(err, connect){
            var sql1 = "select * from brand";
            console.log(sql1);
            var query = connect.query(sql1, function(err, results){
                    if(err){
                        console.log("Err show news : %s", err);
                    }
                    res.render('./admin/index',
                    {   path:'edit_product',
                        adminNama : adminnama,
                        produk: produk,
                        brand: results
                    });
                });
            });
        });
    });
}


exports.productadd_process = function(req, res){
    // -------------------create kode produk draft ---------------------
    //     req.getConnection(function(err, connect){
    //         var sql = "select max(RIGHT(kode_produk,3)) as nomor from product where kode_produk like '"+req.body.kategori+req.body.kode_brand.slice(0,2)+"%'";
    //         console.log(sql);
    //         connect.query(sql, function(err, results, fields){
    //             if(err){
    //                 console.log(err);
    //             }
    //                 var nomorbaru = results[0].nomor;   //--yang perlu di keluarin dari getconnection

    //                 console.log(nomorbaru);
    //                 return kode(nomorbaru);
    //          });
    //          console.log()
    //         });
    //         return nomorbaru;
//---------------------------------------------------------------------------------------------
    function generatename(file){
        //nomor baru harus bisa masuk disini
        // a = b+"1"+file.originalname.slice(-4);
        a = req.body.kode_produk+file.originalname.slice(-4);
        return a;
    }

    var storage = multer.diskStorage({
        destination: './public/image/product',
        filename : function(req, file, callback){
            callback(null,generatename(file));
        }
    });

    var upload = multer({storage: storage}).single('gambar1');

    upload(req, res, function(err){
        if(err){
            return res.end('error uploading image');
        }

        console.log(req.file);
        console.log(req.body);
    
    req.getConnection(function(err, connect){
        //tangkap nilai / value dari body
        var post={
            kode_produk: req.body.kode_produk,
            nama_produk: req.body.nama_produk,
            kategori : req.body.kategori,
            deskripsi: req.body.deskripsi,
            spesifikasi: req.body.spesifikasi,
            kode_brand: req.body.kode_brand,
            gambar1 : req.file.filename,
            quantity: req.body.quantity,
            harga_jual:req.body.harga_jual,
            harga_beli:req.body.harga_beli,
            status: req.body.status
            
        }
        console.log(post);

        var sql="insert into product set ?";

        var query = connect.query(sql, post, function(err, results){
            if(err){
                console.log("error input product %s", err);
            }
            req.flash('info', 'Success add data! Data has been updated.');
            res.redirect('/admin/product');
        });
        });
    });
}

exports.productedit_process = function(req, res){
    function generatename(file){
        //nomor baru harus bisa masuk disini
        // a = b+"1"+file.originalname.slice(-4);
        a = req.body.kode_produk+file.originalname.slice(-4);
        return a;
    }

    var storage = multer.diskStorage({
        destination: './public/image/product',
        filename : function(req, file, callback){
            callback(null,generatename(file));
        }
    });

    var upload = multer({storage: storage}).single('gambar1');

    upload(req, res, function(err){
        if(err){
            return res.end('error uploading image');
        } else if (req.file == undefined) {
            var image = req.body.gambar1_old;
        } else {
            var image = req.file.filename;
        }

        console.log(req.file);
        console.log(req.body);
    
    req.getConnection(function(err, connect){
        //tangkap nilai / value dari body
        var post={
            kode_produk: req.body.kode_produk,
            nama_produk: req.body.nama_produk,
            kategori : req.body.kategori,
            deskripsi: req.body.deskripsi,
            spesifikasi: req.body.spesifikasi,
            kode_brand: req.body.kode_brand,
            gambar1 : image,
            quantity: req.body.quantity,
            harga_jual:req.body.harga_jual,
            harga_beli:req.body.harga_beli,
            status: req.body.status
            
        }
        console.log(post);

        var sql="UPDATE product SET ? WHERE kode_produk=?";

        var query = connect.query(sql, [post, post.kode_produk ], function(err, results){
            if(err){
                console.log("error input product %s", err);
            }
            req.flash('info', 'Success add data! Data has been updated.');
            res.redirect('/admin/product');
        });
        });
    });
}

exports.produkdelete = function(req, res){
    var title = req.params.kode_produk;

    req.getConnection(function(err, connect){
        var sql = "delete from product where kode_produk='"+title+"'";

        var query = connect.query(sql, function(err, results){
        if(err){
            console.log("err delete %s", err);
        }
        req.flash('info', 'Success delete data! Data has been updated.');
        res.redirect('/admin/product');
        });
    });
}

//----------------------------------------------------------------------------------brand

exports.brandlist = function(req, res){
    var admin = req.session.admin;
    var adminId = req.session.adminId;
    var adminnama = req.session.adminNama;
    console.log('id admin '+ adminId);

    if(adminId == null){
        res.redirect('/admin/login');
        return;
    }

    req.getConnection(function(err, connect) {
        var sql = "SELECT * FROM brand";
        var query = connect.query(sql, function(err, results) {
        res.render('./admin/index', {
        path: 'brandlist',
        adminNama : adminnama,
        brand: results
        });
        });
    });
}

exports.branddetail = function(req, res){
    var admin = req.session.admin;
    var adminId = req.session.adminId;
    var adminnama = req.session.adminNama;
    console.log('id admin '+ adminId);

    if(adminId == null){
        res.redirect('/admin/login');
        return;
    }

    var kode_brand = req.params.kode_brand;

    req.getConnection(function(err, connect){
        var sql = "select * from brand where kode_brand ='"+kode_brand+"'";
        console.log(sql);
        var query = connect.query(sql, function(err, results){
            if(err){
                console.log("Err show news : %s", err);
            }

            res.render('./admin/index',
            {   path:'detail_brand',
                adminNama : adminnama,
                brand: results
            });
        });
    });
}

exports.brandadd = function(req, res){
    var admin = req.session.admin;
    var adminId = req.session.adminId;
    var adminnama = req.session.adminNama;
    console.log('id admin '+ adminId);

    if(adminId == null){
        res.redirect('/admin/login');
        return;
    }

    res.render('./admin/index',{
        path:'add_brand',
        adminNama : adminnama,
    })
}

exports.brandadd_process = function(req, res){
    function generatename(file){
        a = req.body.kode_brand+file.originalname.slice(-4);
        return a;
    }

    var storage = multer.diskStorage({
        destination: './public/image/brand',
        filename : function(req, file, callback){
            callback(null,generatename(file));
        }
    });

    var upload = multer({storage: storage}).single('gambar');

    upload(req, res, function(err){
        if(err){
            return res.end('error uploading image');
        }

        console.log(req.file);
        console.log(req.body);
    
    req.getConnection(function(err, connect){
        //tangkap nilai / value dari body
        var post={
            kode_brand: req.body.kode_brand,
            nama_brand: req.body.nama_brand,
            gambar : req.file.filename,
            deskripsi: req.body.deskripsi,
            status: req.body.status
            
        }
        console.log(post);

        var sql="insert into brand set ?";

        var query = connect.query(sql, post, function(err, results){
            if(err){
                console.log("error input news %s", err);
            }
            req.flash('info', 'Success add data! Data has been updated.');
            res.redirect('/admin/brand');
        });
        });
    });
}

exports.brandedit = function(req, res){
    var admin = req.session.admin;
    var adminId = req.session.adminId;
    var adminnama = req.session.adminNama;
    console.log('id admin '+ adminId);

    if(adminId == null){
        res.redirect('/admin/login');
        return;
    }

    var kode_brand = req.params.kode_brand;

    req.getConnection(function(err, connect){
        var sql = "select * from brand where kode_brand ='"+kode_brand+"'";
        console.log(sql);
        var query = connect.query(sql, function(err, results){
            if(err){
                console.log("Err show news : %s", err);
            }
            res.render('./admin/index',
            {   path:'edit_brand',
                adminNama : adminnama,
                brand: results
            });
        });
    });
}

exports.brandedit_process = function(req, res){
    function generatename(file){
        a = req.body.kode_brand+file.originalname.slice(-4);
        return a;
    }

    var storage = multer.diskStorage({
        destination: './public/image/brand',
        filename : function(req, file, callback){
            callback(null, generatename(file));
        }
    });

    var upload = multer({storage: storage}).single('gambar');

    upload(req, res, function(err){
        if(err){
            return res.end('error uploading image');
        } else if (req.file == undefined) {
            var image = req.body.gambar1_old;
        } else {
            var image = req.file.filename;
        }

        console.log(req.file);
        console.log(req.body);
        console.log(req.file.filename);

    var kode = req.body.kode_brand;
    req.getConnection(function(err, connect){
        //tangkap nilai / value dari body
        var post={
            kode_brand: req.body.kode_brand,
            nama_brand: req.body.nama_brand,
            gambar : image,
            deskripsi: req.body.deskripsi,
            status: req.body.status
            
        }
        console.log(post);
        console.log(post.kode_brand);

        var sql = "UPDATE brand SET ? WHERE kode_brand=?";

        var query = connect.query(sql, [post, post.kode_brand], function(err, results){
            if(err){
                console.log("error input news %s", err);
            }
            req.flash('info', 'Success add data! Data has been updated.');
            res.redirect('/admin/brand');
        });
        });
    });
}
//-----------------------------------------------user ------------------------------------------------------

exports.userlist = function(req, res){
    var admin = req.session.admin;
    var adminId = req.session.adminId;
    var adminnama = req.session.adminNama;
    console.log('id admin '+ adminId);

    if(adminId == null){
        res.redirect('/admin/login');
        return;
    }
    req.getConnection(function(err, connect){
        var sql = "select * from account_user"
        var query = connect.query(sql, function(err, results){
            if(err){
                console.log("Err show news : %s", err);
            }
            res.render('./admin/index',
            {   path:'user_list',
                adminNama : adminnama,
                user: results
            });
        });
    });
}


//----------------------------------------payment---------------------------------

exports.payment = function(req, res){
    var admin = req.session.admin;
    var adminId = req.session.adminId;
    var adminnama = req.session.adminNama;
    console.log('id admin '+ adminId);

    if(adminId == null){
        res.redirect('/admin/login');
        return;
    }
    req.getConnection(function(err, connect){
        var sql = "select * from pembayaran order by tanggal desc"
        var query = connect.query(sql, function(err, results){
            if(err){
                console.log("Err show news : %s", err);
            }
            res.render('./admin/index',
            {   path:'payment_list',
                adminNama : adminnama,
                payment: results
            });
        });
    });
}

exports.paymentdetail = function(req, res){
    var admin = req.session.admin;
    var adminId = req.session.adminId;
    var adminnama = req.session.adminNama;
    console.log('id admin '+ adminId);

    if(adminId == null){
        res.redirect('/admin/login');
        return;
    }
    no_payment = req.params.no_payment;
    req.getConnection(function(err, connect){
        var sql = "select * from pembayaran where no_payment='"+no_payment+"'";
        var query = connect.query(sql, function(err, results){
            if(err){
                console.log("Err show news : %s", err);
            }
            res.render('./admin/index',
            {   path:'payment_detail',
                adminNama : adminnama,
                payment: results
            });
        });
    });
}





exports.log_out = function(req, res){
    req.session.destroy(function(err){
        res.redirect('/admin/login');
    });
}