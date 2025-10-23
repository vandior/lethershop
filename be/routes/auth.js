const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

router.post('/register', async (req,res)=>{
  const { name,email,password,phone,address } = req.body;
  if(!name||!email||!password) return res.status(400).json({success:false,message:'Thiếu params'});
  db.query('SELECT * FROM KhachHang WHERE Email=?',[email],async (err,result)=>{
    if(err) return res.status(500).json({success:false});
    if(result.length) return res.status(400).json({success:false,message:'Email tồn tại'});
    const hash = await bcrypt.hash(password,10);
    db.query('INSERT INTO KhachHang (HoTen,Email,MatKhau,SDT,DiaChi) VALUES (?,?,?,?,?)',[name,email,hash,phone,address],(err2)=>{
      if(err2) return res.status(500).json({success:false});
      res.json({success:true,message:'Đăng ký thành công'});
    });
  });
});

router.post('/login',(req,res)=>{
  const { email,password,role } = req.body;
  const table = role==='admin'?'NhanVien':'KhachHang';
  db.query(`SELECT * FROM ${table} WHERE Email=?`,[email],async (err,result)=>{
    if(err) return res.status(500).json({success:false});
    if(result.length===0) return res.status(401).json({success:false,message:'Sai email/mật khẩu'});

    const user = result[0];
       // debug
    console.log('REQ BODY:', req.body);
    console.log('Query result:', result);
    console.log('Password input:', password);
    console.log('Hash DB:', user.MatKhau);

    const match = await bcrypt.compare(password,user.MatKhau);
    if(!match) return res.status(401).json({success:false,message:'Sai email/mật khẩu'});
    req.session.user = { id: user.MaKH||user.MaNV, name:user.HoTen, role:user.VaiTro||'client' };
    res.json({success:true,user:req.session.user});
  });
});

router.post('/logout',(req,res)=>{
  req.session.destroy(err=>{
    if(err) return res.status(500).json({success:false});
    res.clearCookie('connect.sid');
    res.json({success:true});
  });
});

// Kiểm tra trạng thái login
router.get('/status',(req,res)=>{
  if(req.session && req.session.user){
    res.json({user:req.session.user});
  } else {
    res.status(401).json({user:null});
  }
});



module.exports = router;
