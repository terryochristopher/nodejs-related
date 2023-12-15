const Register = require('../models/register');

const register_index = (req, res) => {
    Register.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { contact: result, title: 'All Contacts' });
        })
        .catch(err => {
            console.log(err);
        });
}

const register_details = (req, res) => {
    const id = req.params.id;
    Register.findById(id)
        .then(result => {
            res.render('details', { contact: result, title: ' Details' });
        })
        .catch(err => {
            console.log(err);
        });
}

const register_create_get = (req, res) => {
    res.render('create', { title: 'Include contact info' });
}

const register_create_post = (req, res) => {
    const register = new Register(req.body); // Fix here: use Register instead of Blog
    register.save()
        .then(result => {
            res.redirect('/contact');
        })
        .catch(err => {
            console.log(err);
        });
}

const register_delete = (req, res) => {
    const id = req.params.id;
    Register.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/contact' });
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    register_index,
    register_details,
    register_create_get,
    register_create_post,
    register_delete,
};
