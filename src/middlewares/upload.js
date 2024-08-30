"use strict";
const multer = require("multer");

module.exports = multer({
  // dest:'./uploads' //direk bi klasore kaydetemk icin bunu kullanabiliriz evet
  //ama ozaman cok fazla ayar yapamiyoruz
  //upload klasoru direk olustu.

  storage: multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, returnCallBack) {
      // console.log('file', file)
      // returnCallBack -> success te calismasi gerekn fonsiyon
      returnCallBack(null, Date.now() + "-" + file.originalname    );
    },
  }),
});
