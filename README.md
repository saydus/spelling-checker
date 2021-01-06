# Spelling Checker

This spelling checker will allow you to quickly validate your custom text input by just inserting it in the browser page. The usage of Trie data structure on back-end allows for a fast word-lookup, which makes the process of both adding custom dictionaries and validating text in `O(n)` for words with `n` characters.

The default dictionary comes with all English words in it. You can overwrite it to check some other language. The website will allow adding more words to the dictionary, allowing to crowd-source the language vocabulary.

## Getting started

Remember to `npm install` packages before running. To run the application: first, `npm run tsc`, and then, `npm start`.

### Validating text

![Screenshot of the main page](pics/screenshot.png)

### Adding custom words

![Screenshot of the add words page](pics/screenshot2.png)
