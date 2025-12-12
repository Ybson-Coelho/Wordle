import { AsciiTable3 } from "ascii-table3";
import promptSync from "prompt-sync";
import chalk from "chalk";
import fs from "fs";

// --- Load words from JSON ---
const rawData: string = fs.readFileSync("./src/words.json", "utf-8");
const wordsData: { words: string[] } = JSON.parse(rawData);
const words: string[] = wordsData.words;

// --- Pick random word ---
const secretWord: string = words[Math.floor(Math.random() * words.length)];

// --- Initialize table ---
const table: AsciiTable3 = new AsciiTable3("WORDLE");
for (let i = 0; i < 5; i++) {
  table.addRowMatrix([[" ", " ", " ", " ", " "]]);
}

console.log(table.toString());

const prompt = promptSync();

// --- Function to check word ---
function checkWord(secret: string, guess: string): ("green" | "yellow" | "gray")[] {
  const result: ("green" | "yellow" | "gray")[] = [];
  const s = secret.toLowerCase();
  const g = guess.toLowerCase();

  for (let i = 0; i < g.length; i++) {
    if (g[i] === s[i]) result.push("green"); // Correct letter & position
    else if (s.includes(g[i])) result.push("yellow"); // Correct letter, wrong position
    else result.push("gray"); // Letter not in word
  }
  return result;
}

// --- Game loop ---
const maxAttempts = 5;
let won = false;

for (let attempt = 0; attempt < maxAttempts; attempt++) {
  // User input
  let userWord: string = "";
  
  do {
    const input = prompt(`Attempt ${attempt + 1}/${maxAttempts}: Enter a 5-letter word: `);
    
    if (input === null) {
      console.log("\nExiting... 👋");
      process.exit(0);
    }
    
    userWord = input.toLowerCase();
    
    if (userWord.length !== 5) {
      console.log("⚠️ Word must have exactly 5 letters.");
    }
  } while (userWord.length !== 5);

  // Check letters
  const statuses = checkWord(secretWord, userWord);

  // Apply colors
  const coloredLetters = userWord.split("").map((letter, i) => {
    if (statuses[i] === "green") return chalk.green(letter);
    if (statuses[i] === "yellow") return chalk.yellow(letter);
    return chalk.gray(letter);
  });

  // Update table
  (table as any).rows[attempt] = coloredLetters;

  // Print updated table
  console.log(table.toString());

  // Check win
  if (userWord === secretWord) {
    console.log(chalk.green(`🎉 Congrats! You guessed the word in ${attempt + 1} attempts!`));
    won = true;
    break;
  }
}

// End of game
if (!won) console.log(chalk.red(`☹️ Game over! The word was: ${secretWord}`));