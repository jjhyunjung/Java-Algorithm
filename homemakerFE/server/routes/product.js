const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Product } = require("../models/Product");

//=================================
//           Product
//=================================

//multer - upload도와주는 라이브러리
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/image", (req, res) => {
  //가져온 이미지를 저장
  upload(req, res, (err) => {
    if (err) {
      return req.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/", (req, res) => {
  // 받아온 정보들을 DB에 저장
  const product = new Product(req.body);
  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/products", (req, res) => {
  // product collection에 들어있는 모든 상품정보 불러오기

  //parseInt 문자일경우 숫자로
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm;

  // 검색로직
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      //key가 뭔지 확인할수있는 콘솔메세지
      console.log("key", key);

      if (key === "price") {
        findArgs[key] = {
          //gte - greater than equal(mongo에서만)
          $gte: req.body.filters[key][0],
          //lte - less than equal
          $lte: req.body.filters[key][1],
          // 이유! - datas에서 보면 숫자들이 있는데 그범위를 처리해주기 위해서
          //gte key0 인 이유 - [0,199]로 배열에서 0번index보단크다 같은이유로 lte는 1번 인덱스보다 작다
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  // 검색기능에서 어떤것들이 선택되었는지 로그
  console.log("findArgs", findArgs);

  term;

  if (term) {
    Product.find(findArgs)
      //$부분 몽고db에서 제공하는 기능
      .find({ $text: { $search: term } })
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, productInfo, postSize: productInfo.length });
      });
  } else {
    Product.find(findArgs)
      //populate -> 아이디를 이용해서 writer의 모든 정보를 가져올수있게함
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, productInfo, postSize: productInfo.length });
      });
  }
});

router.get("/products_by_id", (req, res) => {

  let type = req.query.type
  let productId = req.query.id

  //productId를 이용해서 DB에서 productId와 같은 상품의 정보를 가져온다.

  Product.find({_id : productId })
  .populate("writer")
  .exec((err, product) => {
    if(err) return res.status(400).send(err)
    return res.status(200).json({success: true , product})
    })

});

module.exports = router;
