const express = require('express');
const registercontroller = require('../controllers/registercontroller');

const router = express.Router();

router.get('/contact', registercontroller.register_create_get);
// In contactRoutes.js
router.get('/', async (req, res) => {
    try {
        const contacts = await Register.find().sort({ createdAt: -1 });
        res.render('index', { contact: contacts, title: 'All Contacts' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// router.get('/', registercontroller.register_index);
router.post('/', registercontroller.register_create_post);
router.get('/:id', registercontroller.register_details);
router.delete('/:id', registercontroller.register_delete);

module.exports = router;