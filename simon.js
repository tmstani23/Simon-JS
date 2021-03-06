//Simon Game
//Initialize Global Variables
const SEQ_ARR = [1,2,3,4];
let USER_SEQ = "";
let SEQ_STRING = "";
let SEQ_LENGTH = 1;
let ITER = 0;
let USER_TURN = false;
let RESET_FLAG = true;
let HARD_FLAG = false;
let RANDOM_MODE = false;
//Initialize Sounds
const SOUND_1 = new Audio('https://raw.githubusercontent.com/tmstani23/Simon-JS/master/snds/simonSound1.mp3');
const SOUND_2 = new Audio('https://raw.githubusercontent.com/tmstani23/Simon-JS/master/snds/simonSound2.mp3');
const SOUND_3 = new Audio('https://raw.githubusercontent.com/tmstani23/Simon-JS/master/snds/simonSound3.mp3');
const SOUND_4 = new Audio('https://raw.githubusercontent.com/tmstani23/Simon-JS/master/snds/simonSound4.mp3');
const ERROR_SND = new Audio('https://raw.githubusercontent.com/tmstani23/Simon-JS/master/snds/doh.wav');
let SOUND_ARR = [SOUND_4, SOUND_3, SOUND_2, SOUND_1, ERROR_SND];
//Initialize Colors
var dRed = "#B2524C";
var bRed = "#FF1100";
var mGreen = "#98D9B2";
var lGreen = "#96FFC1";
var bGreen = "#00FF69";
//Save Checkbox Inputs to variables:
let hardCheck = document.querySelector("input[name=hard-check]");
let randomCheck = document.querySelector("input[name=random-check]");

//Add listener to the hardcore mode checkbox on change in status:
hardCheck.addEventListener( 'change', function() {
    //If it's checked set flag to true else set flag to false:
    if(this.checked) {
        HARD_FLAG = true;
    } else {
        HARD_FLAG = false;
    }
});
//Add listener to the random mode checkbox on change in status:
randomCheck.addEventListener( 'change', function() {
    if(this.checked) {
        RANDOM_MODE = true;
    } else {
        RANDOM_MODE = false;
    }
});
//Function that adds a secondary pause:
function hardPause(duration, change){
    setTimeout(function() {
        //If change is argument is true:
        if(change === true){
            //Change background color of last button in the sequence:
            changeBGround(true);
        }
    }, duration);
}
//Function that plays the sequence with pauses and button bgcolor changes included:
function playSeq(duration) {
    setTimeout(function () {    
        //play sound for current sequence value:
        playSound(SEQ_STRING[ITER] - 1);
        //change background color of corresponding button:
        changeBGround(false, SEQ_STRING[ITER]); 
        //Increase counter:
        ITER++;
        
        //If current iteration is less than the sequence length:
        if (ITER < SEQ_STRING.length) {            
            //Reset the error message to blank:
            displayMsg("error-p", "");
            //Play the sequence again:
            playSeq(1000);             
        }
        //If the current iteration has reached the end of the sequence:
        if(ITER === SEQ_STRING.length) {
            //Pause for one second and change the last button's bg color:
            hardPause(1000, true);
            //Reset iteration to zero and set user turn flag on:
            ITER = 0;
            USER_TURN = true;
        }
        
    }, duration);       
}
//Change background color function:
function changeBGround(clear, where) {
    //set button id variable to current sequence value:
    let dispIdCurr = 'button' + where
    //Cycle through all buttons:
    for(i=1;i<=4; i++) {
        let changeButton = 'button' + i;
        //if current iteration button = button id passed into changeBground function:
        if(changeButton == dispIdCurr) {
            //Change the background color to bright green:
            document.getElementById(dispIdCurr).style.backgroundColor = bGreen;
        }
        //Else change it to dark red:
        else {
            document.getElementById(changeButton).style.backgroundColor = dRed;
        }
    }
    //If clear argument is set, change last button in the sequence bg color to dark red:
    if(clear === true) {
        let dispId = 'button' + SEQ_STRING[SEQ_STRING.length - 1];
        document.getElementById(dispId).style.backgroundColor = dRed;
        clear = false;
    }
}
//Function that generates a sequence of n length:
function genSequence(length) {
    //If random mode is off:
    if(!RANDOM_MODE) {
        //Add a random number from the sequence value array to the end of the sequence string:
        let randomInt = Math.floor(Math.random() * Math.floor(4));
        SEQ_STRING += SEQ_ARR[randomInt];
    }
    //If random mode is on:
    if(RANDOM_MODE) {
        //Reset the sequence string to blank:
        SEQ_STRING = ""; 
        //Create a random string of numbers as long as the current seq string length:
        for(i=0; i<length; i++) {
            let randomInt = Math.floor(Math.random() * Math.floor(4));
            SEQ_STRING += SEQ_ARR[randomInt];
        }
    }
    console.log(SEQ_STRING);
    //Display a current sequence count to the screen:
    let dispCount = SEQ_STRING.length;
    displayMsg("seq-display", `Sequence Length: ` + dispCount);
    //end user turn and play the generated sequence:
    USER_TURN = false;
    playSeq(2000);
    return;
}
//Function that plays button and error sounds:
function playSound(index) {
    
    //If the input argument is the error soun reduce volume to 1/4:
        if(SOUND_ARR[index] === ERROR_SND) {
            SOUND_ARR[index].volume = 0.25;
        }
    //if using the chrome browser:
    if(window.chrome) {
        
        //Load sound pause any already playing sounds and play the current:
        SOUND_ARR[index].load();
        SOUND_ARR[index].pause();
        SOUND_ARR[index].play(); 
    }
    else {
        SOUND_ARR[index].pause();
        SOUND_ARR[index].play(); 
    }
}
//Function that controls what happens when the user selects a button:
function userMove(num) {
    //If it's not the users turn display a message to the screen and end the function:
    if(!USER_TURN) {
        displayMsg("error-p","Wait your turn.");
        return;
    }
    let sndIndex = num-1;
    //Add on user clicked button number to the current user sequence:
    USER_SEQ += num;
    //Play corresponding sound;
    playSound(sndIndex);
    //Change corresponding button's bg color:
    changeBGround(false, num);
    //Add a 1 second pause then change button color back to red:
    hardPause(1000, true);
    let currentIndex = USER_SEQ.length - 1;
    //convert current seq string number to an integer:
    let genSeqVal = parseInt(SEQ_STRING[currentIndex]);    
    console.log(genSeqVal);
    //If user presses a wrong button:
    if(num != genSeqVal) {
        verifySeq();
    }
    //If it's the last number/button in the sequence:
    if(USER_SEQ.length === SEQ_STRING.length) {
        //Run verify sequence function:
        verifySeq();
    }
}
//This function verifies whether the user wins or loses the game
    //and determines the next steps
function verifySeq() {
        //If the user sequence matches the full generated sequence:
        if(USER_SEQ === SEQ_STRING) {
            //if the user sequence length is 20:
            if(USER_SEQ.length === 20) {
                //Display win message to screen
                displayMsg("error-p", "Congratulations You Win!");
                //Turn off user turn and reset flag, end function:
                USER_TURN = false;
                //Turn off reset flag and end function:
                RESET_FLAG = false;
                return;
            }
            
            //Otherwise:
            //Increase the sequence length by 1:
            SEQ_LENGTH ++;
            //Reset the user sequence to blank:
            USER_SEQ = "";
            //Turn off user turn:
            USER_TURN = false;
            //Generate a new sequence with the new length:
            genSequence(SEQ_LENGTH);
        }
        //If any other condition:
        else {
            //If hardcore mode is checked
            if(HARD_FLAG === true) {
                //Display message to screen, reset game, and end function:
                displayMsg("error-p", "Incorrect Sequence");
                playSound(4);
                resetGame();
                return;
            }
            //Otherwise:
            //Reset user sequence and end turn:
            USER_SEQ = "";
            USER_TURN = false;
            //Display error message to screen:
            displayMsg("error-p","Incorrect Sequence");
            //play error sound
            playSound(4);
            //play current sequence:
            playSeq(2000);
        }
}
//Function that resets the game:
function resetGame() {
    //If not user turn don't allow reset:
    if(!USER_TURN) {
        displayMsg("error-p","Wait your turn.");
        return;
    }
    //reset global variables:
    USER_SEQ = "";
    SEQ_STRING = "";
    SEQ_LENGTH = 1;
    ITER = 0;
    USER_TURN = false;
    RESET_FLAG = true;
    //Start a new game:
    startGame();
}
//Function that starts the game:
function startGame() {
    //If the game was just reset:
    if(RESET_FLAG === true) {
        //Set reset flag back to false:
        RESET_FLAG = false;
        //Generate a new sequence and end the function:
        genSequence(SEQ_LENGTH);
        return;
    }
    else {
        //Display a message that the game is in progress and end the function:
        displayMsg("error-p","Game in Progress. Reset to start over.");
        return;
    }
}
//Function that displays a message to the screen:
function displayMsg(where, msg) {
    //Get display element based on function input argument and display input message:
    document.getElementById(where).innerHTML = msg;
}

