use std::io::stdin;
use rand::Rng;

fn main() {
    // let word: &str = "I have";
    // let mut bees: i32 = 8;
    // println!("{} {} bees",word, bees);

    
    println!("Would you like to play a game");
    let r = input();
    println!("response: {}", r);
    hide();
    if r == "yes"{
        println!("yay");
        
    };
}

fn input() -> String{
    let mut line = String::new();
    let _ = stdin().read_line(&mut line);
    let _ = line.trim();
    line.retain(|c| !c.is_whitespace());
    return line;
}

fn hide(){
    let words = vec!["meow","homeowner","supercalifragilisticexpialidocious"];

    
    let mut rng = rand::thread_rng();
    let answer = words[rng.gen_range(0..3)];
    println!("word: {}", answer);


    for i in answer.chars(){
        println!("_");s
    }
    
    // let mut done = 5;
    // while done != 0{
    //     println!("{}", done);

    //     done -=1;
    // }
       

}
