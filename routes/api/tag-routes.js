const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tags = await Tag.findAll({
    include: Product
  })
  res.json(tags)
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tag = await Tag.findByPk(req.params.id, {
    include: Product
  })
  res.json(tag)
});

router.post('/', async (req, res) => {
  // create a new tag
  const tag = await Tag.create(req.body)
  await ProductTag.bulkCreate((req.body.product_ids || []).map(id => ({
    product_id: id, 
    tag_id: tag.id
  })))
  res.json(tag)
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tag = await Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  await ProductTag.destroy({
    where: {
      tag_id: req.params.id
    }
  })
  await ProductTag.bulkCreate((req.body.product_ids || []).map(id => ({
    product_id: id, 
    tag_id: req.params.id
  })))
  res.json(tag)
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  await ProductTag.destroy({
    where: {
      tag_id: req.params.id
    }
  })
  const count = await Tag.destroy({
    where: {
      id: req.params.id
    }
  }) 
  res.json(count)
});

module.exports = router;
