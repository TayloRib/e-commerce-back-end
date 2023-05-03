const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name:req.body.tag_name,
}).then(newTag=>{
    res.json(newTag)
}).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
})
});

router.put('/:id', (req, res) => {
  Tag.update({
    tag_name:req.body.tag_name,
},{
    where:{
        id:req.params.id
    }
}).then(editTag=>{
    if(!editTag[0]){
        return res.status(404).json({msg:"no tag with this id in database!"})
    }
    res.json(editTag)
}).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
})
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where:{
        id:req.params.id
    }
}).then(delTag=>{
    if(!delTag){
        return res.status(404).json({msg:"no tag with this id in database!"})
    }
    res.json(delTag)
}).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
})
});

module.exports = router;
