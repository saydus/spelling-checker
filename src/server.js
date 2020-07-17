import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from "@sapper/server";

import Trie from './trie';

const bodyParser = require('body-parser')

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = express();
const dictionary = new Trie();
 
 
// create application/json parser
var jsonParser = bodyParser.json()
 

let getLettersOnly = (word) => {
	// Replace all non-numeric 
	return word.replace(/[^a-zA-Z_]/g, '').toLowerCase();
}

let splitWords = (words) => {
	// Use regular expression to split by comma or whitespace
	return words.split(/[. ,:]+/)
	// return words.split(/(?:,| )+/);  found this on the web 
}

let formatWords = (str) => {
	return splitWords(str).map(getLettersOnly).filter(Boolean);
}



app.post('/check', jsonParser, (req, res) => {
	let userWords = req.body.words; 

	userWords = formatWords(userWords.toString());

	let isCorrect = true;
	let incorrectWords = [];
	

	userWords.forEach((word)=>{
		if(!dictionary.search(word)){ // if word is not in dictionary
			incorrectWords.push(word);//push word to incorrect words
			isCorrect = false;
		}
	});

	
	// send response
	res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ allCorrect: isCorrect, words: incorrectWords}));
});

app.use(
	compression({ threshold: 0 }),
	sirv('static', { dev }),
	sapper.middleware()
);


app.listen(PORT, function () {
	console.log(`App is listening on port + ${PORT}`);
});
 

 