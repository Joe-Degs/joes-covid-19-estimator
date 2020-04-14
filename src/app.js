const app = require('express')();
const covid19 = require('./routes');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const fs = require('fs');
const logFile = require('path').join(__dirname, 'logfile');

morgan.token('response-time', () => {
	let start = new Date();
	let end = new Date() * 0.5;
	let timeDiff = Math.round(start-end);
	timeDiff = timeDiff.toString().padStart(2, 0);
	// timeDiff = +timeDiff

	return +timeDiff;
});

app.use(bodyParser.json());

app.use(morgan(':method\t\t:url\t\t:status\t\t0:total-time[0]ms', {
	stream: fs.createWriteStream(logFile, {flags: 'a'})
}));

app.use('/api/v1/on-covid-19/', covid19);

app.use((req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
})

app.use((err, req, res) => {
	res.status(error.status || 500);
	res.render('error', {
		message: err.message,
		error: err
	})
})

app.listen(PORT);