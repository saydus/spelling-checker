import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from "@sapper/server";
// const Trie = require('trie');
// import Trie from './trie'


const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = express();
// const library = new Trie();




app.post('/check', (req, res) => {
	res.send('true');
});

app.use(
	compression({ threshold: 0 }),
	sirv('static', { dev }),
	sapper.middleware()
);


app.listen(PORT, function () {
	console.log(`App is listening on port + ${PORT}`);
});
 

 