const express = require("express");
const router = express.Router();
const {getAll, getOne, deleteItem, alterItem, newItem} = require('../controllers/controller.js');
const {validateKeys, createId} = require('../middlewares/middlewares.js')

router.route("/").get(getAll).post(validateKeys, createId, newItem);
router.route("/:id").get(getOne).delete(deleteItem).patch(alterItem);

module.exports = router
