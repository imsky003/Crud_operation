var express = require('express');
var router = express.Router();
const { find, add, updateProducts, fetchSingleProduct, deleteAllProducts, deleteProducts } = require('../controllers/user.controller');

/* GET users listing. */
router.route("/").get(find);
/* POST add listing. */

router.route("/").post(add);
/* UPDATE update listing. */

router.route("/:id").put(updateProducts);
// .post('/add', add);

// router.get('/:_id', userController.find)
// router.route("/regx/:key").get(regx);
// fetch single products
router.route("/:id").get(fetchSingleProduct);
// delete all products
router.route("/").delete(deleteAllProducts);
// delete single products
router.route("/:id").delete(deleteProducts);

module.exports = router;
