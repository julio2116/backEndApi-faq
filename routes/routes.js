const express = require("express");
const router = express.Router();
const {getAll, getOne, deleteItem, alterItem, newItem} = require('../controllers/controller.js');
const {validateValues, validateKeys, createId, verifyMethod} = require('../middlewares/middlewares.js')

router.route("/").all(verifyMethod).get(getAll).post(validateValues, validateKeys, createId, newItem);
router.route("/:id").all(verifyMethod).get(getOne).delete(deleteItem).patch(alterItem);

module.exports = router
