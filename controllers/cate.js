// 引入admin表的model
const CateModel = require ('../model/cateDb');

// class Cate{

//   getAllCate(req, res){

//       res.send('111')
//   }
// }
function getAllCate(req, res){  
  CateModel.findAll({
    'order':[ 
      ["id"]
     ]
  })
  .then(function(result){
    res.send(result)
  })
}

function addCate(req, res){

    CateModel.create(req.body)
    .then(
       result =>{
        console.log(result);
        res.send('成功添加分类')
      }
    )
}

function removeCate(req, res){

  CateModel.destroy({
    where:{
      id:req.body.id
    }
  })
  .then(function(result){
    console.log('成功删除分类');
    res.send('成功删除分类')
  })
  .catch(function(err){
    console.log(err);
    res.send('删除文章分类')
  })
}

function updateCate(req, res){

    console.log(req.body)
    CateModel.update(req.body,{
      where:{
        id:req.body.id
      }
    })
    .then(function(result){
      console.log(result);
      console.log('成功更新分类');
      res.send('成功更新分类')
    })
    .catch(function(err){
      console.log(err);
      res.send('更新分类失败')
    })
}


let Cate={
  getAllCate,
  addCate,
  removeCate,
  updateCate
}
// 导出对象，供其它模块调用
module.exports = Cate;