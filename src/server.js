import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from "@sapper/server";
// const Trie = require('trie');
// import Trie from './trie'

const bodyParser = require('body-parser')

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = express();
// const library = new Trie();
 
 
// create application/json parser
var jsonParser = bodyParser.json()
 

app.post('/check', jsonParser, (req, res) => {
	console.log(req.body);
	// if words are all valid
		// res.send('true');
	
	let incorrectWords = [];	
	// else, send a list of invalid words
	res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ allCorrect: false, words: incorrectWords}));
});

app.use(
	compression({ threshold: 0 }),
	sirv('static', { dev }),
	sapper.middleware()
);


app.listen(PORT, function () {
	console.log(`App is listening on port + ${PORT}`);
});
 

 