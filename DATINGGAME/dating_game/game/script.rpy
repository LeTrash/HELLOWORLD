# The script of the game goes in this file.

# Declare characters used by this game. The color argument colorizes the
# name of the character.

define s = Character("Stranger")
define m = Character("Welcome Mat")
define player_name = Character("Me")
define e = Character("Exie")
define t = Character("Trance")
define mat_love_score = 0  # Medium
define exie_love_score = 5  # Easy
define trance_love_score = -5  # Hard
define tname = False
define ename = False
# User has to get their love score up to 10 in order to be invited to their house which continues the story. The user doesn't know about the love score as it is tracked behind the scenes but it is obvious that certain actions are more positive than others.

screen character_choice:
    imagebutton:
        xalign 0.5
        yalign 0.5
        idle "welcomemat.png"
        hover "welcomemat_hover.png"
        action Jump("mat_label")

    imagebutton:
        xalign 0.2
        yalign 0.5
        idle "exit.png"
        hover "exit_hover.png"
        action Jump("exie_label")

    imagebutton:
        xalign 0.8
        yalign 0.5
        idle "entrance.png"
        hover "entrance_hover.png"
        action Jump("trance_label")


# The game starts here.

label start:

    # Show a background. This uses a placeholder by default, but you can
    # add a file (named either "bg room.png" or "bg room.jpg") to the
    # images directory to show it.
    "It's your first day of high school, at least for you. You've just transferred schools and now it's time to brace the new kid introduction."

    scene bg room

    # This shows a character sprite. A placeholder is used, but you can
    # replace it by adding a file named "eileen happy.png" to the images
    # directory.
    "You come to find that your first period is being held in the {b}Wrestling room{/b} for some reason. It's odd but you don't question it."
    "You head right in, cursing the world for giving you gym class for first period. "

    player_name "{i}You grumble under your breath as you walk in. {/i}Great, people are going to love being friends with the sweaty new kid.  "

    s "What was that?"

    show welcome at center

    # These display lines of dialogue.
    "You turn around to the sign of a handsome teenager."

    "He looks at you with amusement as well as curiosity. Or at least, you assume it's curiosity. It's not easy to read a welcome mat."

    s "Heh, well I understand your sentiment. Being sweaty for the rest of the day sucks."

    s "You mentioned you're new right? What do you go by?"

    $ player_name = renpy.input("What is your name?")

    # lines beginning with a dollar-sign are interpreted as Python statements.
    $ player_name = player_name.strip()
    if player_name == "":
        $ player_name = "Me"

    s "Nice to meet'cha, [player_name]. Name's Welcome Mat by the way but you can call me Mat if you'd like."

    m "Since you're not sweaty quite yet, why don't you come and sit by my borthers and I?"

    menu follow_menu:
        "Will you go with him?"

        "Random hot stranger? Sure why not!":
            jump follow

        "Ew, rando trying to flirt? Hard pass":
            "You shove past the stranger, just wanting to get this day over with and be single."
            "You go through the day lame, moody and sweaty. You were right about one thing. No one wanted to be friends with the sweaty new kid."
            ".:. Coward Ending"
            return


label follow:
    "You follow Mat, curious of what his brothers may look like and to your surprise, they're a tad different"

    show exit at left
    "You first spot a boy with shy features and a green Exit sign on his head. He jolts in surprise as he notices you approach."

    show entrance at right
    "To his side is a well-kept boy with an entrance sign, similar to the exit sign. He has his head in a book, occasiocally writting notes on the side and pushing up his glasses as they slide down his square face. He doesn't bother to look up when you and Mat approach."

    m "Hey bros, we got a non-sweaty new kid here joining us. Come on and say hi."

    e "Oh! Hi there! Wait what do you mean by sweaty?"
    m "non-sweaty"
    e "Ah, right...sorry"
    "The entrance sign doesn't bother to acknolwedge you."
    "He points to the obvious exit sign."
    m "This here is Exit sign"
    "He points to the entrance sign."
    m "And Mr.Slient treatment here is Entrance sign. Although most prefer we call him Trance since Entrance is a mouthful."
    t "{size=-8}That was all your idea{/size} {i}He scoffs{/i}"
    m "{i}shrugs{/i} They can be weird but somebody's gotta live with them."
    "Mat squeezes in between the two of them."
    m "Feel free to take a seat anywhere, the teacher doesn't usually start until 10 minutes in so relax for a bit."

    jump choices

label choices:
    if mat_love_score > 10:
        jump mat_invite
    elif trance_love_score > 10:
        jump mat_invite  # replace with trance_inite
    elif exie_love_score > 10:
        jump exie_invite  # replace iwth exie_inite
    else:
        "who will you sit with?"
        hide welcome
        hide welcomemat
        hide exit
        hide entrance
        call screen character_choice


label trance_label:
    show entrance at center
    t "hm..."
    menu:
        
        "Hi, I'm [player_name]" if tname == False:
            
            if trance_love_score < 0:
                "..."
                "Entrance sign continues to ignore you"
                jump choices
            elif trance_love_score >= 0:
                $ tname = True
                "..."
                t "Thats...a nice name. I'm Entrance sign...but as my brothers said, I've gone by Trance"
                jump trance_label
        "I don't mean to be a bother but what are you reading?":
            if trance_love_score < 0:
                "..."
                "Entrance sign continues to ignore you"
                jump choices
            elif trance_love_score >= 0:
                "You notice the boy twitches a bit"
                "..."
                player_name "Sorry if I'm bothering you but that book looks quite interesting...at least with how you're glued to it..."
                "The Entrance sign shuffles a bit."
                "..."
                t "{size=-23}The...The Chemistry Between Us...{/size}"
                "You couldn't quite hear the lad."
                player_name "What was that?"
                "You notice he gives you a quick glance."
                t "{size=-14}I'm reading ...The Chemistry Between Us...{/size}"
                player_name "Um, I'm sorry, I couldn't quite here you"
                "He shoves the book towards you, cleary embarassed to speak it out loud."
                show TCBU
                "The book reads 'The Chemistry Between us' by .... It's clearly in a textbook format despite the cheesy title"
                hide TCBU
                "He whips the book back, clearly embarassed"
                t "It's...for class...kinda"
                jump trance_2
        "-talk to someone else-":
            jump choices

label trance_2:
    "Trance went back to reading his book, flipping through the pages to find his place."
    menu:
        "option 1":
            $ trance_love_score += 1
            "dialouge"
            t "dialouge"
        "option 2":
            $ trance_love_score -= 3
            "dialouge"
            t "dialouge"
        "-talk to someone else-":
            jump choices

    menu:
        "option 1":
            $ trance_love_score -= 1
            "dialouge"
            t "dialouge"
        "option 2":
            $ trance_love_score += 1
            "dialouge"
            t "dialouge"
        "-talk to someone else-":
            jump choices

    menu:
        "option 1":
            $ trance_love_score += 1
            "dialouge"
            t "dialouge"
        "option 2":
            $ trance_love_score -= 1
            "dialouge"
            t "dialouge"
        "-talk to someone else-":
            jump choices

    menu:
        "option 1":
            $ trance_love_score += 3
            "dialouge"
            t "dialouge"
        "option 2":
            $ trance_love_score -= 3
            "dialouge"
            t "dialouge"
        "-talk to someone else-":
            jump choices


label exie_label:
    show exit at center
    $ exie_love_score += 2
    $ trance_love_score += 1
    "You decide to sit next to Exit sign, noticing him jump a little as you do."
    if ename == True:

        e "Oh hi! I'm Exit sign. Oh well I guess you knew that from Mat introducting us...but you can call me Exie if that's easier to remember! So uh...yeah, that's me..."
        "He sits there akwardly, twiddling his thumbs"
        $ ename = True
        menu:
            "Soooooo, are you going to ask my name?":
                $ trance_love_score -= 1
                e"Oh! I'm sorry, right what's your name?"
                player_name "{i}SIGH{/i} [player_name] {i}You roll your eyes{/i}"
                e "Right, uh , cool! {size=-5}[player_name] [player_name] [player_name] {size}{i}He mumbles in a hushed voice over and over{/i}"
                $ exie_love_score -= 2
                jump exie_2
            "Yo! I'm [player_name]":
                $ trance_love_score += 1
                $ exie_love_score += 2
                e "Nice to meet you"
                "..."
                player_name "Am I making you nervous? I can move somewhere else-"
                "He looks at you in surprise"
                e "Oh! no no no! You're fine! I'm just not used to talking to people other than my brothers and usually, heheh, Mat just does all the talking"
                m "That's because once you start talking about your obessions you don't let anyone else get a word in! {i}You hear Mat pop in from the side before quickly dipping out{/i}"
                e "H-hey! I let others talk!{size=-8} People just don't...like to talk{/size}{size=-12} about what I want to...{/size} {i}he trails off {/i}"
                jump exie_2
            "-talk to someone else-":
                jump choices
    jump exie_2

label exie_2:
    menu:
        "So like, why do you look so weird??":
            $ trance_love_score -= 1
            e "Huh? I look weird?"
            player_name "Yeah, like a freak with that odd sign on your face."
            $ trance_love_score -= 2
            e "Um...I-I don't know... this is just how I was born...sorry"
            "You notice the boy tear up a bit"
            jump choices
        "Does the teacher really not do anything for 10 minutes??":
            $ trance_love_score += 1
            e "Oh um, yeah. They kinda set up slides and stuff for a bit as we're going over the first aid unit. So we get to just sit here for a while..."
            jump choices
        "-talk to someone else-":
            jump choices
        
    menu:
        "option 1":
            $ exie_love_score += 3
            "dialouge"
            e "dialouge"
        "option 2":
            $ exie_love_score -= 3
            "dialouge"
            e "dialouge"
        "-talk to someone else-":
            jump choices

    menu:
        "option 1":
            $ exie_love_score += 1
            "dialouge"
            e "dialouge"
        "option 2":
            $ exie_love_score -= 2
            "dialouge"
            e "dialouge"
        "-talk to someone else-":
            jump choices

    menu:
        "option 1":
            $ exie_love_score -= 2
            "dialouge"
            e "dialouge"
        "option 2":
            $ exie_love_score += 5
            "dialouge"
            e "dialouge"
        "-talk to someone else-":
            jump choices


label mat_label:
    show welcomemat at center
    $ mat_love_score += 1
    m "Hello again beautiful~"
    m "I know my brothers can be intriuging but you made the right choice. At least I'll be able to talk to a pretty person."
    menu:
        "Heheh thanks, so what do you like to do before class starts?":
            $ trance_love_score += 1
            m "Hm, mostly day dream about cute folk"
            "He looks at you with a sly grin"

            $ mat_love_score += 2
            jump mat_special
        "Ugh, {i}You roll your eyes{/i} do you flirt with everyone?":
            m "um, not with everyone...only with ~special people~"
            $ mat_love_score -= 2
            jump mat_special

        "-talk to someone else-":
            jump choices

label mat_special:
    if mat_love_score < 3:
        menu:
            "Special as in autistic? You calling me autisitc?":
                $ trance_love_score -= 4
                $ mat_love_score -= 3
                m "What? no! That's not what I meant at all!"
                player_name "{i}scoff{/i} sure."

            "Really? Again with your f-boy attitude?":
                $ trance_love_score += 1
                $ mat_love_score -= 1
                "He looks at you in surprise."
                m "Damn sorry. I'm not trying to...you're just {size=-5} kinda cute{/size}"

            "-talk to someone else-":
                jump choices

    menu:
        "Well do you do anything else besides think about your hormones?":
            $ trance_love_score -= 1
            $ mat_love_score -= 1
            m "Of course! Stuff like...movies..."
        "Well do you have other hobbies?":
            $ trance_love_score += 1
            $ mat_love_score += 2
            "Hm well... I do like watching movies, from time to time."
        "-talk to someone else-":
            jump choices

    menu:
        "What kind of movies do you like?":
            $ mat_love_score += 2
            m "Oh you know the cool stuff...like horror movies, thrillers...{size=-23}rom coms{/size}"
            player_name "What was that last part?"
            m "murder mysteries"
            "There definitely wasn't enough syllables in that last part for 'murder mysteries'"
        "So, are you and your brother's triplets?":
            "He gives you a pained look."
            m "I'd rather not talk about it"

        "-talk to someone else-":
            jump choices

    m "Enough about me, what do you like to do?"

    menu:
        "Talk to hotties {i}wink{/i}":
            m "Pft ok, leave the rizz to me sweetheart {i}He blows you a kiss{/i}"
        "Watch anime, like AOT and Toradora":
            $ mat_love_score += 1
            m "Ah so you're a weeb then"
            player_name "You watch your mouth! Anime is good!"
            m "{i}He rolls his eyes{/i} Whatever you say sweetie"
        "It's silly but from time to time I like to cross stitch":
            $ mat_love_score += 2
            m "Like an old lady?"
            player_name "Yes but I cross stitch cool things. Like last week on the drive down I cross stitched the entire grenade scripture from 'Monty Pyhton and the Holy Grail'"
            m "Damn, thats dedication. I'd love to see how it turned out"

        "-talk to someone else-":
            jump choices

    menu:
        m "So how come you came in the middle of the school year? Military?"
        "Yeah...uh military...something like that":
            m "I see...forget I asked"
        "Not really...I'd rather not talk about it if thats ok...":
            m "Yeah no worries, sorry I asked"
            player_name "It's okay, it's understandable to be curious. I'm proablly going to be dodging the quetion all morning today anyways. But I can use the military as an excuse...as long as it doesn't it land me in jail..."
            m "Heheheh, I'll be your alibi. Then again, what's your schedule like? If I'm by your side maybe I can distract people with my charms once the question comes up."
            player_name "{i}You toss him a smile{/i} I appreachiate it but I'm sure I'll be okay."
            $ mat_love_score += 2
        "-talk to someone else-":
            jump choices
    menu:
        m "What kinds of anime do you like?"
        "To be honest, I love Rom Coms! They're cute and before my brother left for college I'd watch them all the time with him.":
            m "Oh that sounds great. I wish my brothers liked watching movies as much as I do but normally Exie just plays games all day and Trance is glued to his books."
            player_name "Hm well maybe I can get you into some anime and you can get me into a few movies"
            m "Sounds like a plan"
            $ mat_love_score += 3
        "{b}(Lie){/b} Horror and thriller anime":
            m "Huh interesting, what are some of your favoriates?"
            player_name "Uhhhm, Steins gate? {i}'Please don't know it please don't know it' you think to yourself{/i}"
            m "{i}He shrugs{/i} I'll take your word for it"
        "-talk to someone else-":
            jump choices
    "After talking for a while you come to a breaking point"
    hide welcomemat
    jump choices


label mat_invite:
    "You look over to Mat again and notice he's starting into your eyes in an amorous manner. His fingers mist your legs along the seam of your jeans"
    m "Hey sweet stuff, you seem like a cool dude~ Why don't you come over tonight and we can hang out? I've got a bunch of neat movies we can check out if you'd like?"
    menu:
        "That sounds like fun~ {i}You flutter your lashes at him.{/i}":
            $ mat_love_score += 2
            "Mat shoots you a sly smile before pulling out a slip of paper from his bag and writting down his address and number."
            m "Heres my number so we can talk about the details for tonight and the address for the magic. Feel free to crash at my place anytime. {i}He winks at you{/i}"
            "You feel a small blush caress your cheeks before being called to attention by the gym teacher."
            m "Ah! Looks like class is finally starting!"
            jump signs_home
        "I..I don't know. We've only just met...You promise it's just going to be a movie? No Netflix and Chill crap?":
            "He has a quick look of shock before brushing it away and donning his usual sly look."
            m "Just a movie my dear, I wouldn't dream of diving deeper on a first night... unless warranted {i}he smirks{/i}"
            "You're not quite sure which parts of his sentance you can trust but his embarassed look from before reassures you."
            player_name "Ok I'm up for a movie but {b}just{/b} a movie. I'm certainly going to have a bit of homework to catch up with since I'm joining in the middle of the year."
            m "{i}He nods {/i} that's fair, I expect nothing less nor more"
            "Mat shoots you a sly smile before pulling out a slip of paper from his bag and writting down his address and number."
            m "Heres my number so we can talk about the details for tonight and the address for the magic. Feel free to crash at my place anytime. {i}He winks at you{/i}"
            "You feel a small blush caress your cheeks before being called to attention by the gym teacher."
            jump signs_home
        "{b}Lie{/b}Sorry...I'm busy later":
            $ mat_love_score -= 5
            m "Oh...that's cool, I understand"
            jump choices

label exie_invite:
    "You look over into Exie's eyes once more and notice his eyes jittering around a bit in thought."
    e "Hey [player_name], if you're up for it- I have a couple of mulitplayer games back home...if you'd- maybe- like to come over tonight? {i}His eyes shly dart back and forth between you {/i}"
    menu:
        "Sure thing! I love video games!":
            "His eyes light up at your excitement and he grabs a pen and paper from his backpack."
            "He scribbles on the paper before giving it to you."
            e "Here! My address, come after school whenever!"
            jump signs_home
        "I'm not sure, I'm not too great at video games but I'd love to try":
            e "Oh! S-sorry, I know not everyone likes my interests...but I'm sure we can do something fun"
            "He grabs a pen and paper from his backpack. He scribbles on the paper before giving it to you."
            e "Here! My address, come after school whenever!"
            jump signs_home
        "{b}Lie{/b}Sorry...I'm busy later":
            $ exie_love_score -= 5
            e "Oh...that's cool, I understand"
            jump choices

label trance_invite:
    "You look over to Trance, noticing he's half closed his book, holding his place with one of his fingers. He shly looks down in thought, his glasses sliding down his face."
    player_name "Hey, you all right?"
    "He looks up at you calmly and smiles as he pushes his glasses back in place."
    t "Yeah... I was just wondering {i}He pauses for a few moments before continuing{/i} if you'd like help catching up on the topics for classes. I can go over the material as well as a few study skills."
    menu:
        "I'd love to, thanks":
            player_name "I hope you won't mind, I know that schools each start off differently with their studies so I'm sure it'll be tricky to get me on the right page."
            t "It's no trouble,{i}He chuckles{/i} it'll be fun to handle a challenge. N-not that you're a challenge, that is."
            "You smile fondly at him as he pulls a note out of his backpack and writes on it before handing it to you."
            t "Here's my address, feel free to come over tonight, I don't have any plans {i}He winks{/i}"
            jump signs_home
        "{b}Lie{/b}Sorry...I'm busy later":
            $ trance_love_score -= 5
            t "Oh...that's cool, I understand"
            jump choices


label signs_home:
    "You arrive at the house before you, checking the address that was written for you with the one on google maps. It looked to be the right address but you were a bit nervous for this...date?You weren't sure you could call it a date, especially since you just met the guy but the idea of it being a date left a fuzzy feeling in your chest."
    if mat_love_score >= 10:
        jump mat_date
    elif exie_love_score >= 10:
        jump exie_date
    elif trance_love_score >= 10:
        jump trance_date
    else:
        "How the frick did you get to this screen??"
        return


label mat_date:
    "As you walk up to the front porch you can see Mat through the windows, lounging on the living room couch."
    "You smile as you notice him swipping through reels on instagram"
    jump mat_movie

label exie_date:
    "As you start to walk up to the front porch the door opens and Exie peeks through the opening."
    e "Hi [player_name]! Glad you could make it!"

label trance_date:
    "As you walk up to the front porch you can see Mat through the windows, lounging on the living room couch."
    "He notices you with a lazy look and calls to Trance as you ring the door bell"
