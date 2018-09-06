var express = require('express');
var env = require('dotenv').config();
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var User = require('./views/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('successfully connnected to mongodb!'))
    .catch(e => console.log(e))

// 메인 화면 + 전체 유저 조회
router.get('/', (req, res) => {
    User.find((err, users) => {
        if (err)
            return res.status(500).send('user find failure');
        res.status(200).render(__dirname + '/views/main.ejs', { users: users });
    })
})

// 유저 생성
router.post('/add', (req, res) => {
    User.create({
        userid: req.body.id,
        username: req.body.name
    }, (err, user) => {
        if (err) return res.status(500).send('fail!');
        res.status(200).redirect('/');
    })
})

// 유저 조회
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err)
            return res.status(500).send('find fail');
        if (!user)
            return res.status(404).send('no such user');
        res.status(200).send(user);
    })
})

app.listen(process.env.PORT || 3200, () => {
    console.log('server start!');
});

// 유저 삭제
router.get('/del/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err)
            return res.status(500).send('del fail');
        res.status(200).redirect('/');

    });
});

router.delete('/de', (req, res) => {
    res.send('delete!!!');
});

// User 수정
router.post('/update/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
        if (err)
            return res.status(500).send('update fail');
        res.status(200).redirect('/');
    });
});