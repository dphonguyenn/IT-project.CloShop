

// todo: Cac buoc thuc hien method [DELETE] (use method-override of Express to exchange [POST] -> [DELETE] ) -> npm install method-override
// * B1: o list product tai moi row chua product , tao 1 the a hoac button de thuc hien cong viec xoa
// * B2: Tao 1 modal confirm de xac nhan viec xoa product
// * B3: Quay lai the a/button vua tao them vao cac thuoc tinh: data-toggle="modal" data-target="#delete-product-modal" de nhan vao the a/button modal se hien len
// * B4: Tai modal confirm them vao id="delete-product-modal" de match voi the a/button
// * B5: Sau khi thuc hien xog match modal vs a/button, ta se tien hanh get id cua product ma ta nhap vao a/button cho modal
// * B6: Them vao a/button attribute data-id="{{this._id}}" (data-__name)
// * B7: Tao the script, tu docs cua bootstrap -> add: 
//        $('#delete-product-modal').on('show.bs.modal', function (event) {
//            var button = $(event.relatedTarget) 
//            productId = button.data('id') 
//        });
// * B8: Ki hieu $ cua jquery chua duoc load vao file nen xay ra loi, bo code tren vao de chac chan code duoc chay sau khi $ da duoc load
//        document.addEventListener("DOMContentLoaded", function(e) { 
//            $('#delete-product-modal').on('show.bs.modal', function (event) {
//                var button = $(event.relatedTarget) 
//                productId = button.data('id') 
//            });
//        });
// * B9: Tao 1 form hidden de gui request len server 
// * B10: Lang nghe su kien click tren button DELETE cua modal, add action la path duoc config cho method [DELETE] o route /me,  path   =   path_config + ?_method=DELETE
// *                                                                                                                   (/me/products/:id)  '/me/products/' + productId + '?_method=DELETE' 
// * B11: add submit for form -> delete-form.submit()
// * B0: Chu trinh send request sau khi submit -> qua route /me config o route/index.js -> qua route /me/products/:id (method [DELETE])
// *     -> Lot vao MeController.function ung voi method va tien hanh xoa -> 
//        collections.deleteOne({ _id: req.params.id }, req.body)
//            .then(() => res.redirect('back'))
//            .catch(next)


// todo:  Custom method [DELETE] -> soft [DELETE] (use ' npm install mongoose-delete ' of mongoose)
// * B1: Add plugin of mongoose-delete on model collections.js
// * B2: At MeController.js -> change default function 'deleteOne' of mongoose to function 'delete' of mongoose-delete lib
// * _ Luc nay khi tien hanh xoa trong db se them field _ deleted: true _ o product ma ta xoa nhung khong cap nhap tren List Products WEB 
// * B3: Add options { overrideMethods: 'all' } o plugin vua tao de ghi de len ban ghi cu 
// * _ List Product WEB se duoc cap nhap khi xoa nhu default _ deleteOne 
// * B4: Add options { deletedAt : true } vao plugin (collections model) _ de cap nhap them field deletedAt vao db de biet thoi gian ta thuc hien xoa


// todo:  Luong hoat dong cua middleware-sort:
// ! query: ?_sort&column=price&type=desc 
// * _sortMiddleware.js (folder middleware) _ middle-ware n??y s??? ho???t ?????ng ??? t???t c??? c??c pages ????? th???c hi???n c??ng vi???c sort
// module.exports = function sortMiddleware(req, res, next) {
//    res.locals._sort = {
//         enabled: false,
//         type:'default'
//     };
//     if (req.query.hasOwnProperty('_sort')) {
//         Object.assign(res.locals._sort, {
//             enabled: true,
//             type: req.query.type,
//             column: req.query.column,
//         })
//     }
//     next();
// }
// ? t???o m???t object vs ph????ng th???c locals ????? ????a data v?? view _vs default type l?? kh??ng sort
// ? khi g???p URL c?? query: _sort _ g??n l???i ki???u sort v?? c???t ???????c sort cho object 
// * _server.js
// const sortMiddleware = require('./src/app/middlewares/sortMiddleware');
// app.use(sortMiddleware);
// * handlebars.js (folder helper)
// sortable: (fieldName, sort) => {
//         const icons = {
//             default: 'oi oi-elevator',
//             asc: 'fas fa-sort-alpha-up-alt',
//             desc: 'fas fa-sort-alpha-up'
//         }
//         const types = {
//             default: 'desc',
//             asc: 'desc',
//             desc: 'asc'
//         }
//         const sortType = fieldName === sort.column ? sort.type : 'default';
//         const icon = icons[sortType];
//         const type = types[sortType];
//         const href = Handlebars.escapeExpression(`?_sort&column=${fieldName}&type=${type}`)
//         const result = `<a href="${href}">
//             <span class="${icon}"></span>
//         </a>`
//         return new Handlebars.SafeString(result);
//     }
// ? function-helper sortable nh???n v??o 2 ?????i s??? 1 l?? t??n c???a c???t c???n sort, 2 l?? object _sort ?????nh ngh??a trong middleware 
// ? m???c ?????nh sortable s??? render ra default icons v?? kh??ng sort
// ? khi nh???n v??o icons sort, th??? a c???a icons s??? truy???n ??i href="?_sort&column=${fieldName}&type=${type}" l??n URL
// ? l??c n??y middleware nh???n ???????c v?? g??n l???i c??c field cho object _sort
// ? khi qua ???????c middleware s??? ?????n controller _ controller n???u nh???n ???????c res.query.hasOwnProperties('_sort') th?? s??? th???c hi???n c??ng vi???c sort -> ho??n th??nh c??ng vi???c sort 



// ? cookie 
// * Cookie l?? nh???ng t???p tin m???t trang web g???i ?????n m??y ng?????i d??ng v?? ???????c l??u l???i th??ng qua tr??nh duy???t khi ng?????i d??ng truy c???p trang web ????. 
// * Cookie ???????c d??ng ????? l??u tr??? v???i r???t nhi???u m???c ????ch nh?? l??u phi??n ????ng nh???p, ho???t ?????ng c???a ng?????i d??ng khi truy c???p trang web.
// * Session Cookie: ch??? t???n t???i t???m th???i trong b??? nh??? c???a tr??nh duy???t v?? s??? b??? tr??nh duy???t t??? x??a khi ng?????i d??ng h???t phi??n ????ng nh???p
// * ????? s??? d???ng cookie trong express ch??ng ta c???n ph???i c??i th??m m???t v??i middleware b??n th??? 3 :  npm i cookie-parser
// * khai bao:
// const express = require('express')
// const cookieParser = require('cookie-parser')
// const app = express()
// app.use(cookieParser()) _ cookieParser(secret, options)
// * tao cookie : res.cookie(name, value, [options])
// * lay gia tri cookie : req.cookie.[name]


// todo: add flash-message
// npm i express-session connect-flash
// _ server.js:
// var session = require('express-session');
// var flash = require('connect-flash');
// app.use(session({
//      secret: 'secret',
//      cookie: { masAge: 60000 },
//      resave: false,
//      saveUninitialized: false,
// }));
// app.use(flash());
// _ add to controller _ post form  
// req.flash('message','Create Account success!');
// res.redirect('back');
// _ add to controller _ render
// res.render('register',{ message: req.flash('message')});
// _ ??? view.hbs c???n hi???n th??? flash-message
// t???o logic ????? render flash-message



// ? JWT (JsonWebToken)
// * JWT l?? m???t ph????ng ti???n ?????i di???n cho c??c y??u c???u chuy???n giao gi???a hai b??n Client ??? Server
// * JWT bao g???m 3 ph???n, ???????c ng??n c??ch nhau b???i d???u ch???m (.): header.payload.signature
// * data + secret  ---(sign)--> token (header.payload.signature)
// * VD : 
// const jwt = require('jsonwebtoken');
// var data = { username: 'duyphongz1' }
// var secret = { password: 'phong123456' }
// var token = sign(data, secret)
// * --> token s??? ???????c encode th??nh d??y JWT
// * token + secret --(verify)--> token
// * VD :
// var decode = verify(token, secret) 
// * --> decode = data = { username: 'duyphongz1' }
// * M???i token khi ???????c t???o ra ?????u c?? h???n s??? d???ng(expire) v?? s??? kh??ng th??? h???y cho ?????n khi h???t h???n s??? d???ng
// * ????? x??t h???n s??? d???ng cho token:
// token = jwt.sign(data, secret, {
//     expiresIn: (_time: ????n v??? l?? gi??y)
// })
// * N???u h??m sign c?? callback th?? h??m s??? l??m h??m async


// ? PASSPORT.JS
// todo: S??? d???ng PASSPORT.JS ????? th???c hi???n x??c th???c v?? ph??n quy???n ng?????i d??ng
// * B1: Install passport.js:
// npm install passport
// * B2: Config PASSPORT ??? file server.js
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
// const users = require('./src/app/model/user');
// app.locals.users = users;
// passport.use(new LocalStrategy((username, password, done) => {
//     app.locals.users.findOne({ username: username }, (err, user) => {
//         if (err) {
//             return done(err);
//         }
//         if (!user) {
//             return done(null, false);
//         }
//         if (user.password !== password) {
//             return done(null, false);
//         }
//         return done(null, user);
//     });
// }));

// passport.serializeUser((user, done) => {
//     done(null, user._id);
// });

// passport.deserializeUser((id, done) => {
//     done(null, { id });
// });

// app.use(session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: false,
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use((req, res, next) => {
//     res.locals.loggedIn = req.isAuthenticated();
//     next();
// });
// app.use(cookieParser());
// * B3: T???o Router cho tuy???n ???????ng /auth ????? th???c hi???n c??c c??ng vi???c li??n quan ?????n x??c th???c, login, logout:
// const express = require('express');
// const router = express.Router();
// const authUtil = require('../util/auth');
// const passport = require('passport');
// const AuthController = require('../app/controllers/AuthController');
// router.post('/login', passport.authenticate('local', {
//     failureRedirect:'/404page',
//     failureFlash:'Wrong username or password'
// }), AuthController.login);
// router.post('/logout', AuthController.logout);
// router.post('/logout-me', AuthController.logoutMe);
// module.exports = router;
// * B4: Build AuthController cho /auth
// src/app/controller/AuthController


// todo: Use res.locals._variable to save user's data after login
// * B1: T???o m???t middleware inforUser.js ??? th?? m???c src/app/middlewares/inforUser.js
// const users = require('../model/user');
// const ObjectID = require('mongodb').ObjectId;
// module.exports = function userInfor(req,res,next) {
//     res.locals.user = {
//         isAuthenticated: false,
//     }
//     if (req.isAuthenticated()) {
//         const _id = ObjectID(req.session.passport.user);
//         users.findOne({ _id: _id }, (err, user) => {
//             if (err) {
//                 throw err;
//             }
//             Object.assign(res.locals.user, {
//                 isAuthenticated: true,
//                 user_boss: user.boss,
//                 user_fullname: user.fullname,
//                 user_username: user.username,
//                 user_password: user.password,
//                 user_address: user.address,
//                 user_phone: user.phone,
//                 user_email: user.email,
//             })
//         })
//     }
//     next();
// };
// ? -> Giai th??ch: bi???n locals _user m???c ?????nh c?? m???t property m?? t??? ch??a ????ng nh???p
// ? Khi ????ng nh???p th??nh c??ng passportJS s??? gi??p ta t???o ra 1 session s??? d???ng cho phi??n ????ng nh???p
// ? Ta d???a v??o ????y ????? xem th??? ai l?? ng?????i ???? ????ng nh???p v?? l??u th??ng tin c???a ng?????i d??ng ???? v??o bi???n locals user ????? d??ng cho vi???c render ra view c??c th??ng tin c???a ng?????i d??ng
// ? ????? ki???m tra ???? ????ng nh???p ch??a v???i passport s??? d???ng: req.isAuthenticated()
// ? C??ch l???y id c???a ng?????i ????ng nh???p ????? ?????i chi???u truy xu???t d??? li???u ng?????i d??ng ph??a database:  const _id = ObjectID(req.session.passport.user);



// todo: Panigation
// * Tham kh???o t???i: _ https://www.youtube.com/watch?v=4FNhcSlCKoY&t=3s


// todo: S??? d???ng node-fetch ????? call API t??? m???t trang web kh??c
// * V?? nodeJS kh??ng h??? tr??? fetch n??n ????? s??? d???ng fetch ta c???n ph???i c??i g??i package node-fetch
// * Install: (version x2)
// npm install node-fetch@2
// * Khai b??o to??n c???c ????? s??? d???ng trong app
// const fetch = require('node-fetch');
// globalThis.fetch = fetch;
// * C??ch s??? d???ng: _ ?????C DOCS t???i: https://github.com/node-fetch/node-fetch/tree/2.x#readme