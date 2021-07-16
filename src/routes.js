const express = require('express');
const routes = express.Router();

const DashboardController = require('./controllers/DashboardController');
const ProfileController = require('./controllers/ProfileController');
const JobController = require('./controllers/JobController');

routes
	.get('/', DashboardController.index)
	.get('/job', JobController.create)
	.post('/job', JobController.save)
	.get('/job/:id', JobController.show)
	.post('/job/:id', JobController.update)
	.post('/job/delete/:id', JobController.delete)
	.get('/profile', ProfileController.index)
	.post('/profile', ProfileController.update)
;

module.exports = routes;