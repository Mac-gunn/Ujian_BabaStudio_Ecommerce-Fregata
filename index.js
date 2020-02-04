var express = require('express');
var app = express();
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var ejs = require('ejs-lint');
var flash = require('express-flash');

var user = require('./routes/userroutes');
var admin = require('./routes/adminroutes');
var conn = require('express-myconnection');
var mysql= require('mysql');
var axios = require('axios');


app.set('port', process.env.port ||3000);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(flash());

app.use('/public', express.static(path.join(__dirname,'/public')));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(
	conn(mysql,{
		host: '127.0.0.1',
		user: 'root',
		password: '',
		database: 'fregata'
	}, 'single')
);

app.use(
	session({
		secret: 'fregata',
		resave: false,
		saveUninitialized: true,
		cookie: {maxAge :2000000}
	})
);


app.get('/', user.home);
app.get('/login', user.login);
app.get('/logout', user.log_out);
app.get('/product', user.produk);
app.get('/product/:kode_produk', user.produkdetil);
app.get('/cart', user.cart);
app.get('/cart_delete/:email&:kode_produk', user.cartdelete);
app.get('/confirm_payment', user.confirm_payment);
app.get('/payment_delete/:gambar', user.remove_payment);



app.get('/admin/', admin.home);
app.get('/admin/login', admin.login);
app.get('/admin/product', admin.produklist);
app.get('/admin/product_detail/:kode_produk', admin.produkdetail);
app.get('/admin/product_add', admin.productadd);
app.get('/admin/product_edit/:kode_produk', admin.produkedit);
app.get('/admin/product_delete/:kode_produk', admin.produkdelete);
app.get('/admin/brand', admin.brandlist);
app.get('/admin/brand_detail/:kode_brand', admin.branddetail);
app.get('/admin/brand_add', admin.brandadd);
app.get('/admin/brand_edit/:kode_brand', admin.brandedit);
app.get('/admin/user', admin.userlist);
app.get('/admin/payment', admin.payment);
app.get('/admin/payment/:no_payment', admin.paymentdetail);
app.get('/admin/log_out', admin.log_out);

app.post('/login', user.login);
app.post('/register', user.register);
app.post('/cart_add', user.cartadd);
app.post('/checkout', user.checkout);
app.post('/confirm_payment', user.confirm_payment_add);

app.post('/admin/login', admin.login);
app.post('/admin/product_add', admin.productadd_process);
app.post('/admin/product_edit', admin.productedit_process);
app.post('/admin/brand_add', admin.brandadd_process);
app.post('/admin/brand_edit', admin.brandedit_process);


app.get('/admin/*', admin.page404);
app.get('/*', user.page404);


app.listen(app.get('port'), function(){
	console.log('server running on port'+app.get('port'));
});