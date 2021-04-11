const express = require("express");
const router = express.Router();

const {getProducts, 
       newProducts,
       getSingleProduct,
       updateProduct, 
       deleteProduct, 
       createPrductReview, 
       getProductReviews,
       deleteReview,
       getAdminProducts} 
       = require('../controllers/productControllers')


const {isAuthenticatedUser , authorizeRoles} = require('../middlewares/auth');


router.route('/products').get(getProducts);
router.route('/admin/products').get(getAdminProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),newProducts);
router.route('/admin/product/:id')
               .put(isAuthenticatedUser,authorizeRoles('admin'), updateProduct)
               .delete(isAuthenticatedUser,authorizeRoles('admin'), deleteProduct);


router.route('/review').put(isAuthenticatedUser,createPrductReview)
router.route('/reviews').get(isAuthenticatedUser,getProductReviews)
router.route('/reviews').delete(isAuthenticatedUser,deleteReview)



module.exports = router;