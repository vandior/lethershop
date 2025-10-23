const express = require('express');
const router = express.Router();
const db = require('../db');

// Middleware kiểm tra admin
function isAdmin(req,res,next){
  if(req.session && req.session.admin) return next();
  return res.status(403).json({success:false,message:'Không có quyền'});
}

// GET tất cả khách hàng
router.get('/', isAdmin, (req,res)=>{
  db.query('SELECT MaKH, HoTen, Email, SDT, DiaChi FROM KhachHang', (err,result)=>{
    if(err) return res.status(500).json({success:false});
    res.json({success:true, users: result});
  });
});

// DELETE khách hàng
router.delete('/:id', isAdmin, (req,res)=>{
  const id = req.params.id;
  db.query('DELETE FROM KhachHang WHERE MaKH=?', [id], (err)=>{
    if(err) return res.status(500).json({success:false});
    res.json({success:true});
  });
});

// PUT cập nhật khách hàng
router.put('/:id', isAdmin, (req,res)=>{
  const id = req.params.id;
  const { HoTen, Email, SDT, DiaChi } = req.body;
  db.query('UPDATE KhachHang SET HoTen=?, Email=?, SDT=?, DiaChi=? WHERE MaKH=?',
    [HoTen, Email, SDT, DiaChi, id], (err)=>{
      if(err) return res.status(500).json({success:false});
      res.json({success:true});
  });
});

module.exports = router;
