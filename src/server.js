const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const routes = require('./routes.js');
const path = require('path');

const PORT = process.env.PORT || 3000;

app
	.use(express.static('public'))
	.use(express.urlencoded({ extended: true }))
	.use(cookieParser())
	.set('view engine', 'ejs')
	.set('views', path.join(__dirname, 'views'))
	.use(routes)
	.listen(PORT, console.log('Server is running at', '\x1b[34m', `http://localhost:${PORT}`));