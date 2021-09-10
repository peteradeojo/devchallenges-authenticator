const express = require('express');
const debug = require('debug')('app');

const app = express();

require('./config/setup')(app);

// Routes
app.use('/', require('./routes/index')());
app.use('/auth', require('./routes/auth')());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	debug(`Server running on port ${PORT}`);
});
