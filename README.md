# CS_361_Microservice_PartOfSpeech
Microservice for CS 361. Service that takes a string of one or more words and responds with the potential parts of speech for each word. 

To use: start program using the node command. 

To send a request: send a POST request with the body containing a JSON object with a key "words" and the value being a string containing each word separated by a comma, no spaces.

{ words: "word1,word2,word3,...,wordn" }

To read a response: The response will be a JSON object with each word as a key, and each value containins the list of parts of speech. For example:

{ the: ['adverb'], lazy: ['noun', 'verb', adjective'], brown: ['verb'] }

If a word was send via the in POST but not in the response, it means the word is undefined. This will happen for proper nouns and other words not found in the dictionary API (https://dictionaryapi.dev/)
