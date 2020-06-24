import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from "@sapper/server";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = express();



app.use('/jalap', (req, res) => {
	res.send('Post');
});

app.use(
	compression({ threshold: 0 }),
	sirv('static', { dev }),
	sapper.middleware()
);


app.listen(PORT, function () {
	console.log(`App is listening on port + ${PORT}`);
});
 

 