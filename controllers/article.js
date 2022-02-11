// 引入admin表的model
const ArticleModel = require ('../model/articleDb');
const Token= require('./token.js')


function getArticle(req,res){
  ArticleModel.findAll({
    'order':[ 
      ["id"]
     ]
  })
  .then(function(result){
    // console.log(result.Article);
    res.send(result);
  })
}

function info(req,res){
  // console.log(req)
  ArticleModel.findOne({
    where: {'id':req.params.id}
  })
  .then(function(result){

      // console.log(result);
      res.send(result);
  })
  // res.send('2222')
}

function addArticle(req,res){
   
  // console.log(req.body)
  ArticleModel.create(req.body)
  .then(function(result){
    console.log(result);
    res.send('成功添加文章')
  })
  .catch(function(err){
    console.log(err);
    res.send('添加文章失败')
  })

  // Token.verifyToken(req.headers.authorization)
  // .then(res => {
  //   next()
  //   res.send('这是添加文章的响应')
  // }).catch(e => {
  //   res.status(401).send('invalid token')
  // })

}

function updateArticle(req,res){

  ArticleModel.update(req.body,{
    where:{
      id:req.body.id
    }
  })
  .then(function(result){
    console.log('成功更新文章');
    res.send('成功更新文章')
  })
  .catch(function(err){
    console.log(err);
    res.send('更新文章失败')
  })


}

function remove(req,res){

  // console.log(req)
  ArticleModel.destroy({
    where:{
      id:req.body.id
    }
  })
  .then(function(result){
    console.log('成功删除文章');
    res.send('成功删除文章')
  })
  .catch(function(err){
    console.log(err);
    res.send('删除文章失败')
  })
}

// 配置对象
let exportObj = {
  getArticle,
  info,
  addArticle,
  updateArticle,
  remove
};
// 导出对象，供其它模块调用
module.exports = exportObj;
