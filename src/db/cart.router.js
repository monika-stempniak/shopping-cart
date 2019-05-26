const express = require('express');
const Cart = require('./cart.model');
const router = express.Router();

router.use(express.json());

// http://localhost:4000/cart
router.get('/', async (req, res) => {
    try {
        const cart = await Cart.find();
        res.send(cart);
    } catch (error) {
        res.status(500).send(error);
    }
  });

// http://localhost:4000/cart
router.post('/', async (req, res) => {
    try {
        const cart = new Cart(req.body);
        await cart.save();
        res.status(201).send(cart);
    } catch (error) {
        res.status(500).send(error);
    }
});

// http://localhost:4000/cart/id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findById(id);
        await Cart.deleteOne(cart);
        res.send(cart);
    } catch (error) {
        res.status(500).send(error);
    }
});

// http://localhost:4000/cart
router.delete('/', async (req, res) => {
    try {
        await Cart.deleteMany({});
        res.send("Cart has been cancelled");
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
