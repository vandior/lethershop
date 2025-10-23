const express = require('express');
const router = express.Router();
const db = require('../db');
const {checkAdmin} = require('../middleware/authMiddleware');

// Lấy tất cả danh mục
router.get('/', (req,res)=>{
  db.query('SELECT * FROM DanhMuc', (err,result)=>{
    if(err) return res.status(500).json(err);
    res.json(result);
  });
});

// Thêm danh mục (admin)
router.post('/', checkAdmin, (req,res)=>{
  const {TenDanhMuc, MoTa} = req.body;
  db.query('INSERT INTO DanhMuc (TenDanhMuc, MoTa) VALUES (?,?)', [TenDanhMuc, MoTa],
    (err,result)=>{
      if(err) return res.status(500).json(err);
      res.json({message:'Thêm danh mục thành công'});
    })
});

// Xoá danh mục
router.delete('/:id', checkAdmin, (req,res)=>{
  const id = req.params.id;
  db.query('DELETE FROM DanhMuc WHERE MaDanhMuc=?', [id], (err,result)=>{
    if(err) return res.status(500).json(err);
    res.json({message:'Xoá danh mục thành công'});
  });
});

module.exports = router;
