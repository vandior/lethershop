const express = require('express');
const router = express.Router();
const db = require('../db');

// Tạo thanh toán
router.post('/', (req,res)=>{
  const {MaDon, SoTien, PhuongThuc} = req.body;
  db.query('INSERT INTO ThanhToan (MaDon, SoTien, PhuongThuc) VALUES (?,?,?)',
    [MaDon, SoTien, PhuongThuc],
    (err,result)=>{
      if(err) return res.status(500).json(err);
      // Update trạng thái đơn nếu muốn
      db.query('UPDATE DonThue SET TrangThai="dang_thue" WHERE MaDon=?',[MaDon]);
      res.json({message:'Thanh toán tạo thành công'});
    })
});

// Lấy danh sách thanh toán
router.get('/', (req,res)=>{
  db.query('SELECT * FROM ThanhToan', (err,result)=>{
    if(err) return res.status(500).json(err);
    res.json(result);
  });
});

module.exports = router;
