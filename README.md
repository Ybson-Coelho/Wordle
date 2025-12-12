# Wordle Terminal - TypeScript (Bun)
A terminal-based Wordle clone built with **TypeScript**, **AsciiTable3**, and **Chalk**. Play Wordle directly in your terminal with colored letters and multiple attempts using **Bun**!
  
## Features
- Random 5-letter word from `words.json`
- 5 attempts to guess the word
- Colored letters: 
  - **Green** = correct letter & position
  - **Yellow** = correct letter, wrong position
  - **Gray** = letter not in word
- ASCII table updates with each attempt
- Validates input against dictionary words
  
## Installation
1. Clone the repository: `git clone https://github.com/Ybson-Coelho/Wordle.git cd Wordle` 
 
3. Install dependencies with Bun:
 `bun install ` 
 
4. Make sure you have a `words.json` file in the root directory containing a list of 5-letter words, for example:
 `{   "words": ["apple", "brick", "climb", "dream", "eagle", "flame", "grasp", "honey", "ivory", "jelly"] } `
 
## Running the Game
 `bun run index.ts `
 
- Enter a 5-letter word each turn
- The table will update with colors for your guess
- Win by guessing the word correctly within 5 attempts

## How It Works
1. Loads a random word from `words.json`
2. Prompts the user for a 5-letter word
3. Compares the guess with the secret word
4. Colors each letter using `chalk` based on correctness
5. Updates the ASCII table (`AsciiTable3`)
6. Loops until the user guesses correctly or runs out of attempts
  
## Dependencies
- [ascii-table3](https://www.npmjs.com/package/ascii-table3) – For displaying the table
- [chalk](https://www.npmjs.com/package/chalk) – For colored output
- [prompt-sync](https://www.npmjs.com/package/prompt-sync) – For terminal input
- [bun](https://bun.sh/) – JavaScript/TypeScript runtime
  
## License
MIT License © Ybson Coelho
