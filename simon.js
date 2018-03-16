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
const SOUND_1 = new Audio('snds/simonSound1.mp3');
const SOUND_2 = new Audio('snds/simonSound2.mp3');
const SOUND_3 = new Audio('snds/simonSound3.mp3');
const SOUND_4 = new Audio('snds/simonSound4.mp3');
const ERROR_SND = new Audio('snds/doh.wav');
let SOUND_ARR = [SOUND_4, SOUND_3, SOUND_2, SOUND_1, ERROR_SND];
//Initialize Colors
let dRed = "B2524C";
let bRed = "FF1100";
let mGreen = "98D9B2";
let lGreen = "96FFC1";
let bGreen = "00FF69";
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
    playSeq(1500);
    return;
}
//Function that plays button and error sounds:
function playSound(index) {
    //if using the chrome browser:
    if(window.chrome) {
        //If the input argument is the error soun reduce volume to 1/4:
        if(SOUND_ARR[index] === ERROR_SND) {
            SOUND_ARR[index].volume = 0.25;
        }
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
        //If hardcore mode is selected:
        if(HARD_FLAG === true) {
            //Display incorrect sequence message to the screen:
            displayMsg("error-p", "Incorrect Sequence!");
            //Play error message sound:
            playSound(4);
            //Reset the game:
            resetGame();
            return;
        }
        //Else notify the user, reset the user sequence to blank, play error sound
        displayMsg("error-p","Incorrect Sequence");
        //reset user sequence:
        USER_SEQ = "";
        USER_TURN = false;
        playSound(4)
        //play current sequence with 3 second pause at the start:
        playSeq(3000);
    }
    //If it's the last number/button in the sequence:
    if(USER_SEQ.length === SEQ_STRING.length) {
        //Run verify sequence function:
        verifySeq();
    }
}

//After user inputs correct sequence
    //Same sequence is repeated back with an additional step
//create verify sequence function:
function verifySeq() {
    //Edit this function to fix random sequence generation:
        
        if(USER_SEQ === SEQ_STRING) {
            if(USER_SEQ.length === 20) {
                displayMsg("error-p", "Congratulations You Win!");
                //Turn off use turn and reset flag
                USER_TURN = false;
                RESET_FLAG = false;
                return;
            }
            SEQ_LENGTH ++;
            console.log("string verified");
            USER_SEQ = "";
            //SEQ_STRING = "";
            USER_TURN = false;
            genSequence(SEQ_LENGTH);
        }
        else {
            console.log("incorrect string");
            if(HARD_FLAG === true) {
                displayMsg("error-p", "Incorrect Sequence");
                resetGame();
                return;
            }
            //reset user sequence:
            USER_SEQ = "";
            USER_TURN = false;
            //play error sound
            //play current sequence:
            playSeq(1500);
        }
}

function resetGame() {
    //reset global variables:
    USER_SEQ = "";
    SEQ_STRING = "";
    SEQ_LENGTH = 1;
    ITER = 0;
    USER_TURN = false;
    RESET_FLAG = true;
    //Reset game display messages:
    //displayMsg("error-p", "");
    //displayMsg("seq-display", SEQ_LENGTH);

    //Play warning sound:
    
    //Do a 1 second hard pause:

    //Start new sequence:
    startGame();
    //set reset flag back to false:
    RESET_FLAG = false;
}

function startGame() {
    if(RESET_FLAG === true) {
        
        RESET_FLAG = false;
        genSequence(SEQ_LENGTH);
        return;
    }
    else {
        console.log("game in progress");
        displayMsg("error-p","Game in Progress. Reset to start over.");
        return;
    }
}

function displayMsg(where, msg) {
    document.getElementById(where).innerHTML = msg;
}

