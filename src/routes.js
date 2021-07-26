const express = require('express');
const routes = express.Router();

const DashboardController = require('./controllers/DashboardController');
const ProfileController = require('./controllers/ProfileController');
const JobController = require('./controllers/JobController');
const LoginController = require('./controllers/LoginController');
const SingUpController = require('./controllers/SignUpController');
const { auth } = require('./middlewares');

routes
	.get('/', auth, DashboardController.index)
	.get('/login', LoginController.index)
	.post('/login', LoginController.login)
	.get('/sign-up', SingUpController.index)
	.post('/sign-up', SingUpController.singUp)
	.get('/job', auth, JobController.create)
	.post('/job', auth, JobController.save)
	.get('/job/:id', auth, JobController.show)
	.post('/job/:id', auth, JobController.update)
	.post('/job/delete/:id', auth, JobController.delete)
	.get('/profile', auth, ProfileController.index)
	.post('/profile', auth, ProfileController.update)
;

module.exports = routes;