const express = require('express');
var app = express();
const mongoose = require('mongoose');
const path = require('path');
const alert = require('alert');


// nhan du lieu body-parser
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
mongoose.connect('mongodb://localhost/KS-Nodemy', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// mongoose database
var user = require('./config/connectDB')

// css
app.use('/public', express.static(path.join(__dirname, 'public')))
// cau hinh ejs
app.set('view engine', 'ejs');
app.set('views', './views');


app.get('/register', (req, res)=>{
    res.render('register');
});

app.get('/login', (req, res)=>{
    res.render('login');
});

app.get('/', (req, res)=>{
    res.render('home');
});

app.get('/TrangChu', (req, res)=>{
    res.render('TrangChu');
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
            return console.log('tai khoan nay da ton tai')
        }
        const moi = new user({
            username: req.body.username,
            password: req.body.password
        })

        const newDoc = await user.create(moi)
        alert('Tạo tài khoản thành công')
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
    })
})

// dia chi ip
app.listen( process.env.PORT ||3000, () => {
    console.log('bat dau server thanh cong tai dia chi http://localhost:3000');
});