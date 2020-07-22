import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from "@sapper/server";

import Trie from './trie.js';

const bodyParser = require('body-parser')

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = express(); 
  
const dictionary = new Trie.Trie();
const lineReader = require('line-reader');


// vanilla JS solution that only works with \n type 
// var fs = require('fs'),
//     readline = require('readline');

// var rd = readline.createInterface({
//     input: fs.createReadStream('words_alpha.txt'),
//     output: process.stdout,
//     console: false
// });

// rd.on('line', function(line) {
//     dictionary
// });



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

 

let getLettersOnly = (word) => {
	// Replace all non-numeric 
	return word.replace(/[^a-zA-Z_]/g, '').toLowerCase();
}

let splitWords = (words) => {
	// Use regular expression to split by comma or whitespace
	return words.split(/[. ,:]+/);
}

let formatWords = (str) => {
	return splitWords(str).map(getLettersOnly).filter(Boolean);
}

let addFileToTrie = (filename) =>{
	lineReader.eachLine(filename, (line, last) => {
		// console.log(line);
		dictionary.insert(line.toString()); 
		// last is a boolean to indicate last line / not used for now
	});
}



// Add standard English language
addFileToTrie('words_alpha.txt');


app.post('/add',  (req, res) => {
	// add words from json to the Trie structure
	console.log(req.body.words);
	let words = req.body.words;
	words.forEach((word) => {
		dictionary.insert(word);
	})

	// send response
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({ success: true}));
});


app.post('/addfast',  (req, res) => {
	// add words from json to the Trie structure
	console.log(req.body.words);
	let words = req.body.words.split(',');
	words.forEach((word) => {
		dictionary.insert(word);
	})

	// redirect 
	res.redirect('/');
});


app.post('/check', (req, res) => {
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
 

 