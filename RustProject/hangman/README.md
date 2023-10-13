# Overview

This program asks if the user wants to play a game and if the answer is yes then the function hide will start playing the classic children's game: Hangman. The program will do so by choosing from a list of words at random, hiding the letters, and asking the user to input a guess for each space. If the user guesses right then the letter will replace the space with the correct position. Otherwise, the user will be told they are wrong, get a tally of how many tries they have left, and then will be asked for another guess



[Software Demo Video]([https://www.youtube.com/watch?v=BP8cd0FVuZI])
-(https://www.youtube.com/watch?v=BP8cd0FVuZI)

# Development Environment

I used Visual Studio Code for the IDE and GitHub to communicate my files in a safe and connected way. I handled the basics of the Rust language as well as dived into a couple of libraries such as Rand::rng, to complete this specific task.

# Useful Websites

- [Rust Manual]([https://doc.rust-lang.org/beta/book/ch01-00-getting-started.html])
-(https://doc.rust-lang.org/beta/book/ch01-00-getting-started.html)
# Future Work

- Add recognition of an attempt to guess the word as a whole as opposed to only revealing letter by letter.
- Add a graphic display of a stick figure man slowly being hung as the number of tries goes down.
- Add a level of difficulty.
