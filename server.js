const express = require('express');
var app = express();
const mongoose = require('mongoose');
const path = require('path');
const alert = require('alert');


// nhan du lieu body-parser
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
mongoose.connect('mongodb+srv://gttm_nhom4:van170801@cluster0.m2spfol.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// mongoose database
var user = require('./config/connectDB')
var admin = require('./config/adminDB')

// css
app.use('/public', express.static(path.join(__dirname, 'public')))
// cau hinh ejs
app.set('view engine', 'ejs');
app.set('views', './views');



app.get('/register', (req, res)=>{
    res.render('register');
});
app.get('/register/registerfail', (req, res)=>{
    res.render('registerfail');
});

app.get('/login', (req, res)=>{
    res.render('login');
});
app.get('/loginfail', (req, res)=>{
    res.render('loginfail');
});

app.get('/', (req, res)=>{
    res.render('home');
});

app.get('/TrangChu', (req, res)=>{
    res.render('TrangChu');
});


app.get('/registeradmin', (req, res)=>{
    res.render('registeradmin');
});

app.get('/admin', (req, res)=>{
    res.render('admin');
});

//admin
app.post('/registeradmin', urlencodedParser, async (req, res)=>{
    try{
        var useradmin = req.body.useradmin
        const ad =  await admin.findOne({
            useradmin: useradmin 
        })
        if(ad){
            alert('Tài khoản này đã tồn tại')
            //res.redirect('register/registerfail')
            return console.log('tai khoan nay da ton tai')
            
        }
        const moiadmin = new admin({
            useradmin: req.body.useradmin,
            password: req.body.password
        })

        const newAdmin = await admin.create(moiadmin)
        alert('Tạo tài khoản thành công')
        //res.redirect('/login')
        console.log('tao tai khoan thanh cong')
    }
    catch(error) {
        console.log('loi server')
    }
    
});

// dang nhap
app.post('/admin', urlencodedParser, (req, res) => {
    
    var useradmin = req.body.useradmin
    var password = req.body.password

    admin.findOne({
        useradmin: useradmin,
        password: password
    })
    .then(result=>{
        if(result.password == req.body.password && result.useradmin == req.body.useradmin){
            alert('Đăng nhập ADMIN thành công')
            console.log('dang nhap admin thanh cong')
            res.redirect('/register')
        }
    })
    .catch(err=> {
        alert('Tài khoản không đúng')
        console.log('dang nhap that bai')
    })
});

// tao tai khoan
app.post('/register', urlencodedParser, async (req, res)=>{
    try{
        var username = req.body.username
        const use =  await user.findOne({
            username: username 
        })
        if(use){
            alert('Tài khoản này đã tồn tại')
            res.redirect('register/registerfail')
            return console.log('tai khoan nay da ton tai')
            
        }
        const moi = new user({
            username: req.body.username,
            password: req.body.password
        })

        const newDoc = await user.create(moi)
        alert('Tạo tài khoản thành công')
        res.redirect('/login')
        console.log('tao tai khoan thanh cong')
    }
    catch(error) {
        console.log('loi server')
    }
    
});
// dang nhap
app.post('/login', urlencodedParser, (req, res) => {
    
    var username = req.body.username
    var password = req.body.password

    user.findOne({
        username: username,
        password: password
    })
    .then(result=>{
        if(result.password == req.body.password && result.username == req.body.username){
            alert('Đăng nhập thành công')
            console.log('dang nhap thanh cong')
            res.redirect('/TrangChu')
        }
    })
    .catch(err=> {
        alert('Tài khoản không đúng')
        console.log('dang nhap that bai')
        res.redirect('/loginfail')
    })
})

// dia chi ip
app.listen( process.env.PORT ||3000, () => {
    console.log('bat dau server thanh cong tai dia chi http://localhost:3000');
});