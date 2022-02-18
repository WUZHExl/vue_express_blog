// 引入admin表的model
const ArticleModel = require ('../model/articleDb');
const CateModel = require ('../model/cateDb');
// const Token= require('./token.js')
const sequelize = require('../config/db')


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

async function addArticle(req,res){
   
  // console.log(req.body)
  const t = await sequelize.transaction();
  try {

    // Then, we do some calls passing this transaction as an option:
    const article = await ArticleModel.create(req.body, { transaction: t });
    let {cate}=req.body;
    cate=cate.split(',')

    const cateLists=await CateModel.findAll({'order':[ ["id"]]}, { transaction: t })
    // console.log(cate);
    let cateList=[]
    // console.log(cateLists)
    for(let key in cateLists){
      cateList.push(cateLists[key].dataValues.name)
    }
    // console.log(cateList)
    cate=cate.filter(item=>{
      return !cateList.includes(item)
    })

    if(cate!==['']){
      for(let c of cate){
        await CateModel.create({name:c}, { transaction: t })
      }
    }
    // console.log(cate);  
    await t.commit();
    res.send('成功添加文章')
  
  } catch (error) {
    await t.rollback();  
    res.send('添加文章失败')
  }

}

async function updateArticle(req,res){

  const t = await sequelize.transaction();
  try {

    // Then, we do some calls passing this transaction as an option:
    const article = await ArticleModel.update(req.body,{where:{id:req.body.id}} ,{ transaction: t });
    let {cate}=req.body;
    cate=cate.split(',')

    const cateLists=await CateModel.findAll({'order':[ ["id"]]}, { transaction: t })
    // console.log(cate);
    let cateList=[]
    // console.log(cateLists)
    for(let key in cateLists){
      cateList.push(cateLists[key].dataValues.name)
    }
    // console.log(cateList)
    cate=cate.filter(item=>{
      return !cateList.includes(item)
    })

    if(cate!==['']){
      for(let c of cate){
        await CateModel.create({name:c}, { transaction: t })
      }
    }
    // console.log(cate);  
    await t.commit();
    res.send('成功更新文章')
  
  } catch (error) {
    await t.rollback();  
    res.send('更新文章失败')
  }

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
