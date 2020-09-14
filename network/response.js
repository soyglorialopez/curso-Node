module.exports = function (res, msg, status){
   return  res.status(status).send({
      msg : msg
      
   })
}