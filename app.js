



const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

// Initialize app
const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const sequelize = new Sequelize('bookusers', 'root', 'An12Pa99@', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile: DataTypes.STRING
}, { timestamps: false });


sequelize.sync();

app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/users', async (req, res) => {
    try {
        const { username, email, mobile } = req.body;
        const newUser = await User.create({ username, email, mobile });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const { username, email, mobile } = req.body;
        const [updated] = await User.update({ username, email, mobile }, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedUser = await User.findByPk(req.params.id);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(3000)






































// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.json());
// app.use(express.static('public'));

// let users = [];
// app.get('/users', (req, res) => {
//     res.status(200).json(users);
// });

// app.post('/users', (req, res) => {
//     const { username, email, mobile } = req.body;
//     const newUser = { id: users.length + 1, username, email, mobile };
//     users.push(newUser);
//     res.status(201).send(newUser);
// });


// app.put('/users/:id', (req, res) => {
//     const { id } = req.params;
//     const { username, email, mobile } = req.body;
//     let user = users.find(u => u.id === parseInt(id));
//     if (user) {
//         user.username = username;
//         user.email = email;
//         user.mobile = mobile;
//         res.status(200).json(user);
//     } else {
//         res.status(404).send('User not found');
//     }
// });

// app.delete('/users/:id', (req, res) => {
//     const { id } = req.params;
//     users = users.filter(user => user.id !== parseInt(id));
//     res.status(204).send();
// });