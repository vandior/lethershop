const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/',(req,res)=>{
  db.query(`SELECT t.MaTB,t.TenTB,t.MoTa,t.GiaThue,t.SoLuongCon,d.TenDanhMuc 
            FROM ThietBi t JOIN DanhMuc d ON t.MaDanhMuc=d.MaDanhMuc`,(err,result)=>{
    if(err) return res.status(500).json({success:false});
    res.json(result);
  });
});

module.exports = router;
