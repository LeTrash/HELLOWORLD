use rand::Rng;
use std::io::stdin;

//Program asks if the user wants to play a game and if the answer is yes then the function hide will start playing hangman by choosing from a list of words at random, hiding the letters and asking the user to input a guess for the letter. If the user guesses right then the letter will be replaced in mask with the correct position. Otherwise the user will be told they are wrong, get a tally for how many tries they have left and then will be asked for another guess

fn main() {
    // let word: &str = "I have";
    // let mut bees: i32 = 8;
    // println!("{} {} bees",word, bees);

    println!("Would you like to play a game? ");
    let r = input();
    // println!("response: {}", r);
    if r == "yes" {
        hangman();
    };
}

fn input() -> String {
    // let mut line = String::new();
    // let _ = stdin().read_line(&mut line);
    // let _ = line.trim().to_string();
    // return line;
    let mut line = String::new();
    let _ = stdin().read_line(&mut line);
    let _ = line.trim();
    line.retain(|c| !c.is_whitespace());
    return line;
}

fn input_char() -> Result<char, String> {
    let mut line = String::new();
    let _ = stdin().read_line(&mut line);

    if let Some(c) = line.chars().next() {
        if c.is_alphabetic() && c.len_utf8() == 1 {
            Ok(c)
        } else {
            Err("Invalid input. Please enter a single alphabetical character.".to_string())
        }
    } else {
        Err("Invalid input. Please enter a single alphabetical character.".to_string())
    }
}

fn hangman() {
    let words = vec!["meow", "homeowner", "supercalifragilisticexpialidocious"];

    let mut rng = rand::thread_rng();
    let answer = words[rng.gen_range(0..3)];
    // println!("word: {}", answer);

    let mut mask: Vec<char> = vec!['_'; answer.len()];
    let mut tries = 7;

    // for _i in answer.chars() {
    //     mask.push("_")
    // }

    loop {
        for i in &mask {
            print!("{}", i);
        }

        if !mask.contains(&'_') {
            println!("\nCongratulations! You guessed the word.");
            break;
        }

        if tries == 0 {
            println!("\nOut of tries. The word was: {}", answer);
            break;
        }

        println!("\nPlease enter a letter: ");
        let guess = input_char();

        match guess {
            Ok(g) => {
                let mut found = false;
                for (index, letter) in answer.chars().enumerate() {
                    if letter == g && mask[index] == '_' {
                        mask[index] = g;
                        found = true;
                    }
                }

                if !found {
                    println!("Wrong guess.");
                    tries -= 1;
                    println!("Tries left: {}", tries);
                }
            }
            Err(e) => {
                println!("{}", e);
            }
        }
    }
}

// while answer != mask {
//     println!("Please enter a letter: ");
//     let char: guess = input();
//     for i in answer.chars() {
//         if i == guess {
//             std::mem::replace(&mut mask[i], guess);
//         }
//     }
// }
