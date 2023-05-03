const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const nameData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(nameData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  Category.update({
    category_name: req.body.category_name,
},{
    where:{
        id:req.params.id
    }
}).then(editCat=>{
    if(!editCat[0]){
        return res.status(404).json({msg:"no category with this id in database"})
    }
    res.json(editCat)
}).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
})
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where:{
        id:req.params.id
    }
}).then(delCat=>{
    if(!delCat){
        return res.status(404).json({msg:"no category with this id in database"})
    }
    res.json(delCat)
}).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"error occurred",err})
})
});

module.exports = router;
