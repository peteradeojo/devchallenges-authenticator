const express = require('express');
const path = require('path');
const debug = require('debug')('app');

const app = express();

require('./config/setup')(app);

// Routes
app.use('/', (req, res, next) => {
	if (req.isAuthenticated()) {
		res.locals.user = req.user;
	}
	next();
});

app.use('/', require('./routes/index')());
app.use('/auth', require('./routes/auth')());
app.use('/profile', require('./routes/profile')());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use((req, res) => {
	res.render('404');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	debug(`Server running on port ${PORT}`);
});
