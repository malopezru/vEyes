const { Router } = require('express');
const _ = require('underscore');
const router = Router();

const users = require('../sample.json');

router.get('/', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.json(users);
});

router.post('/', (req, res) => {
    const { first_name, last_name, username, projects } = req.body;
    console.log(first_name)/* 
    if (first_name && last_name && username && projects){ */
        const id = users.users.length + 1;
        const newUser = {id, ...req.body};
        console.log(newUser)
        users.users.push(newUser);
        res.json(users);
    /* } else {
        console.log('Wrong Request')
        res.send('Wrong Request');
    } */
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, username, projects } = req.body;
    if (first_name && last_name && username && projects) {
        _.each(users, (user, i) => {
            if (user.id == id ) {
                user.first_name = first_name;
                user.last_name = last_name;
                user.username = username;
                user.projects = projects;
                res.json(users);
            }
        });
    } else {
        res.json('Wrong request');
    }
});

router.delete('/:id', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const { id } = req.params;
    _.each(users.projects, (project, i) => {
        if (project.id == id) {
            users.projects.splice(i, 1);
            res.send(users);
        }
    });
});

module.exports = router;