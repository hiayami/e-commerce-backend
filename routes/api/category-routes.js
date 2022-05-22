const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

 // find all categories
  // include its associated Products
router.get('/', async (req, res) => {
  const categories = await Category.findAll({
    include: Product
  })
  res.json(categories)
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const category = await Category.findByPk(req.params.id, {
    include: Product
  })
  res.json(category)
});

router.post('/', async (req, res) => {
  // create a new category
  const category = await Category.create(req.body)
  res.json(category)
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  res.json(await Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }))
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  await Product.update(
    { category_id: null },
    {
      where: {
        category_id: req.params.id,
      }
    }
  )
  const count = await Category.destroy({
    where: {
      id: req.params.id
    }
  }) 
  res.json(count)
});

module.exports = router;
