const express = require('express');
const { createUser, loginUser, getAllUsers, getUser, deleteUser, updateUser, blockUser, unBlockUser, handleRefreshToken, handleLogout, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, getWishlist, saveUserAddress, userCart, getUserCart, removeProductFromCart, updateProductQuantityFromCart, createOrder, getMyOrders, getMonthWiseOrderIncome, getYearlyTotalOrders, getAllOrders, getSingleOrder, updateOrder, getComparePageProducts, addToComparePage, removeProductFromCompare, emptyCart } = require('../controller/userCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { checkout, paymentVerification } = require('../controller/paymentCtrl');
const router = express.Router();

router.post('/register', createUser);
router.post('/forgot-password-token', forgotPasswordToken);
router.put('/reset-password/:token', resetPassword);
router.put('/update-order/:id', authMiddleware, isAdmin, updateOrder);
router.put('/password', authMiddleware, updatePassword);
router.post('/login', loginUser);
router.post('/admin-login', loginAdmin);
router.post('/cart',authMiddleware, userCart);
router.post('/order/checkout',authMiddleware, checkout);
router.post('/order/payment-verification',authMiddleware, paymentVerification);


router.post('/cart/create-order',authMiddleware, createOrder);
router.post("/compare", authMiddleware, addToComparePage);
// router.post('/cart/apply-coupon',authMiddleware, applyCoupon);

router.get('/get-all-users', getAllUsers);
router.get('/get-my-orders', authMiddleware, getMyOrders);
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.get("/get-a-order/:id", authMiddleware, isAdmin, getSingleOrder);
// router.post("/getorderbyuser/:id", authMiddleware, isAdmin, getOrderByUserId);
router.get("/compare", authMiddleware, getComparePageProducts);


router.get('/refresh', handleRefreshToken);
router.get("/logout", handleLogout);
router.get('/wishlist', authMiddleware, getWishlist);
router.get('/cart', authMiddleware, getUserCart);
router.get('/get-month-wise-order-income', authMiddleware, getMonthWiseOrderIncome);
router.get('/get-year-wise-order-income', authMiddleware, getYearlyTotalOrders);

router.get('/:id', authMiddleware, isAdmin, getUser);
router.delete('/empty-cart', authMiddleware, emptyCart);
router.delete('/delete-product-cart/:cartItemId', authMiddleware, removeProductFromCart);
router.delete('/delete-product-cart/:cartItemId/:newQuantity', authMiddleware, updateProductQuantityFromCart);
router.delete('/compare', authMiddleware, removeProductFromCompare);
router.delete('/:id', deleteUser);

router.put('/update-user', authMiddleware, updateUser);
router.put('/save-address', authMiddleware, saveUserAddress);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unBlockUser);


module.exports = router;