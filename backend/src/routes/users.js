const { Router } = require('express')
const _ = require('underscore')
const router = Router()

const users = require('../sample.json')

router.get('/', (req, res) => {
	res.set('Access-Control-Allow-Origin', '*')
	res.json(users)
})

router.get('/:id', (req, res) => {
	res.set('Access-Control-Allow-Origin', '*')
	const { id } = req.params
	_.each(users.projects, (project, i) => {
		if (project.id == id) {
			res.send(users.users[i])
		}
	})
})

router.post('/', (req, res) => {
	const { first_name, last_name, username, projects } = req.body
	const { project_name, location } = req.body
	if (first_name && last_name && username && projects) {
		const id = users.users.length + 1
		const newUser = { id, ...req.body }
		console.log(newUser)
		users.users.push(newUser)
		res.json(users)
	} else if (project_name && location) {
		const id = users.projects.length + 1
		const newProject = { id, ...req.body }
		console.log(newProject)
		users.projects.push(newProject)
		res.json(users)
	} else {
		console.log('Wrong Request')
		res.send('Wrong Request')
	}
})

router.put('/:id', (req, res) => {
	const { id } = req.params
	console.log(id)
	const { first_name, last_name, username, projects } = req.body
	console.log(req.body) /* 
    if (first_name && last_name && username && projects) { */
	_.each(users.users, (user, i) => {
		if (user.id == id) {
			user.first_name = first_name
			user.last_name = last_name
			user.username = username
			user.projects = projects
			res.json(users)
		}
	})
	/* } else {
        res.json('Wrong request');
    } */
})

router.delete('/:id', (req, res) => {
	res.set('Access-Control-Allow-Origin', '*')
	const { id } = req.params
	_.each(users.projects, (project, i) => {
		if (project.id == id) {
			users.projects.splice(i, 1)
			res.send(users)
		}
	})
})

module.exports = router
