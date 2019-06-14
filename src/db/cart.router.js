const express = require('express');
const Cart = require('./cart.model');
const router = express.Router();

router.use(express.json());

// http://localhost:4000/userId/cart
router.get('/:userId/cart', async (req, res, next) => {
    try {
        const { userId } = req.params;
        Cart.find({user_id: userId}, async function (err, cart) {
            if (err) {
                return next(new Error(err));
            }
        
            if (!cart) {
                return next(new Error('No items in cart'));
            }
            console.log(cart);
            res.send(cart);
        });
    } catch (error) {
        res.status(500).send(error);
    }
  });

// http://localhost:4000/cart
router.post('/cart', async (req, res) => {
    try { 
        const cart = new Cart(req.body);
        await cart.save();
        res.status(201).send(cart);
    } catch (error) {
        res.status(500).send(error);
    }
});

// http://localhost:4000/userId/cart/id
router.delete('/cart/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findById(id);
        await Cart.deleteOne(cart);
        res.send(cart);
    } catch (error) {
        res.status(500).send(error);
    }
});

// http://localhost:4000/userId/cart
router.delete('/:userId/cart', async (req, res) => {
    try {
        const { userId } = req.params;
        await Cart.deleteMany({user_id: userId});
        res.send("Cart has been cancelled");
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
