const router = require('express').Router();
const { User,Post,Comment } = require('../models');

router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id','title','content','created_at'],
    include:[
 { model:Comment,
    attributes:[ 'id','comment_text','post_id','user_id','created_at'],
    include: {
    model:User,
    attributes:['username']}
  
},
{ model:User,attrubutes:['username']}
]})
.then(dbPostData => {
  const posts = dbPostData.map(post => post.get({ plain:true}));
  res.render('homepage', {
    posts, loggedIn: req.session.loggedIn
  });
})   
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
  
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
res.render('signup');
});
module.exports = router;
