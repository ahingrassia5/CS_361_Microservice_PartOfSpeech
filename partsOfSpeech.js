/*
Angela Ingrassia
CS 361 Software Engineering I
Parts of speech microservice
Given a string of variable length, returns a JSON object containing each word as well as the parts of speech for each word
*/


/*
    Set up 'express' for http response
*/
const express = require('express');               // We are using the express library for the web server
const bodyParser = require('body-parser');        // for parsing POST request bodies
const app     = express();                        // We need to instantiate an express object to interact with the server in our code
app.use(bodyParser.json());                       // for parsing POST request bodies
const PORT    = 6311;                             // Set a port number at the top so it's easy to change in the future

/*
    Set up 'request' for http request
*/
const request = require('request-promise');


/*
    Respond to request
*/
app.post('/', (req, res) => {

    // get words
    //console.log("POST body: " + req.body.words);
    let words = req.body.words.split(',');

    // make JSON pbject to return 
    let response = {};
    // make list of promises for Promise.all()
    let promiseList = [];

    // Loop thruogh input string
    for (curWord of words) {
        //console.log("curWord is: " + curWord);
        // if the current word is not already in the response
        if (!(curWord in response)) {
            // request info from dictionary
            let options = {
                url: 'https://api.dictionaryapi.dev/api/v2/entries/en/' + curWord,
                json: true
            }
            let reqPromise = request(options)
                .then(function (info) {
                    // find parts of speech
                    try {
                        let partsOfSpeech = [];  
                        let meanings = info[0].meanings;
                        //console.log(meanings);
                        meanings.forEach((meaning) => {
                            //console.log(meaning);
                            partsOfSpeech.push(meaning.partOfSpeech)

                        })
                
                        //let partOfSpeech = info[0].meanings[0].partOfSpeech;   
                        response[info[0].word] = partsOfSpeech;
                        
                    } catch (err) {
                        console.log(err);
                    }
                    
                })
                .catch(function (err) {
                    console.log("word is undefined");
                });  
            promiseList.push(reqPromise); 
        }
        
    }

    // return dict object only after last request has been completed
    Promise.all(promiseList).then((values) => { 
        //console.log("returning 'response'"); 
        res.json(response);
    });
}) 




/*
    Listener
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
    




