const express = require('express');
const router = express.Router();
const db = require('../db');
const { isLoggedIn } = require('../middleware/auth');

router.post('/',isLoggedIn,(req,res)=>{
  const userId = req.session.user.id;
  const { items } = req.body; // [{MaTB,SoLuongThue,DonGia}]
  if(!items || items.length===0) return res.status(400).json({success:false,message:'Giỏ trống'});
  db.query('INSERT INTO DonThue (MaKH) VALUES (?)',[userId],(err,result)=>{
    if(err) return res.status(500).json({success:false});
    const orderId = result.insertId;
    const values = items.map(i=>[orderId,i.MaTB,i.SoLuongThue,i.DonGia]);
    db.query('INSERT INTO ChiTietDonThue (MaDon,MaTB,SoLuongThue,DonGia) VALUES ?',[values],(err2)=>{
      if(err2) return res.status(500).json({success:false});
      res.json({success:true,orderId});
    });
  });
});

router.get('/',isLoggedIn,(req,res)=>{
  const userId = req.session.user.id;
  db.query('SELECT * FROM DonThue WHERE MaKH=?',[userId],(err,result)=>{
    if(err) return res.status(500).json({success:false});
    res.json(result);
  });
});

module.exports = router;
