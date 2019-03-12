'use strict';

let rl = require('readline-sync');
let wordGenerator = require('./WordGenerator.js');

// TODO: exchange words for different dog breeds
let words = ['computer', 'dog', 'game', 'house', 'document'];
let randomWord = [];
let secretWord = [];
let usedLetters = [];
let remainingTries = 8;

function start() {
    randomWord = wordGenerator.generateRandomWord(words);
    secretWord = wordGenerator.generateSecretWord(randomWord);
    guess();
}


function guess() {
    if (secretWord.join('').toString() === randomWord) {
        console.log('Congratulations! You Won!');
        gameOver();
    } else if (remainingTries <= 0) {
        console.log('Sorry! You lost the game!');
        gameOver();
    } else {
        console.log();
        console.log('\x1b[33m%s\x1b[0m', 'Faulty guesses: ', usedLetters);
        console.log(secretWord.join(''));
        let letter = rl.question(`You have ${remainingTries} tries left. Make your guess: `);
        if (letter === '0') {
            gameOver();
        } else if (letter.length === 0) {
            console.log('You did not make a guess!');
            guess();
        } else if (letter.length > 1) {
            console.log('Only one letter at a time!');
            guess();
        } else if (isNaN(letter) === false) {
            console.log('You can only guess letters!');
            guess();
        } else if (usedLetters.includes(letter) || secretWord.includes(letter)) {
            console.log('You have already used this letter!');
            guess();
        } else {
            validateGuess(letter);
        }
    }
}

function validateGuess(letter) {
    // TODO: handle if the word contains the letter multiple times
    for (let i = 0; i < randomWord.length; i++) {
        if (letter === randomWord[i]) {
            secretWord[i] = letter;
            guess();
            return;
        }
    }

    usedLetters.push(letter);
    remainingTries--;

    guess();
}

function gameOver() {
    usedLetters = [];
    secretWord = [];
    randomWord = [];
    remainingTries = 8;
}

module.exports = {
    start: start
}