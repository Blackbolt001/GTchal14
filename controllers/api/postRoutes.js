const router = require('express').Router();
const { User,Post,Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id','title','content','created_at'],
    order: [['created_at',"DESC"]],
    include:[
{ model:User,
  attributes:['username'],
},
{
  model:Comment,
  attributes:[ 'id','comment_text','post_id','user_id','created_at'],
  include: { model:User,
  attrubutes:['username'],
},
},
],
})
.then((dbPostData) => res.json(dbPostData)) 
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});
  
router.get('/:id', (req, res) => {
  Post.findOne({
    where: { id:req.params.id,
},
attributes:['id','content','title','created_at'],
include: [{ model:User,
attributes:['username'],
},
{model:Comment,
  attributes:['id','comment_text', 'post_id','user_id','created_at'],
  include:{
    model: User,
    attributes: ['username'],
  },
},],
})
.then((dbPostData) => {
  if (!dbPostData) {
    res.status(404).json({message:'No such Posts exists!'});
    return;
  }
  res.json(dbPostData);
});
})
module.exports = router;
