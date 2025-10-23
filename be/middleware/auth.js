function isLoggedIn(req,res,next){
  if(req.session && req.session.user) return next();
  return res.status(401).json({success:false,message:'Chưa đăng nhập'});
}

function isAdmin(req,res,next){
  if(req.session && req.session.user && req.session.user.role==='admin') return next();
  return res.status(403).json({success:false,message:'Không có quyền'});
}

module.exports = { isLoggedIn,isAdmin };
