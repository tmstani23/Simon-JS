//Simon Game

//Includes:


//Plays a sound for each part of the sequence and when user click corresponding button 

//User can see how many steps are in current sequence
//User can click a reset button to start the game over with 1 sequence
//Strict Mode: If the user makes an incorrect click they are notified and the game resets to 1 sequence
//Win Game: User is notified after successfully completing 20 step sequence and then game resets.

//escalating series of random button presses
const SEQ_ARR = [1,2,3,4];
let USER_SEQ = "";
let SEQ_STRING = "";
let SEQ_LENGTH = 1;
let ITER = 0;
let USER_TURN = false;
let RESET_FLAG = true;
let HARD_FLAG = false;
let START_FLAG = true;
let DISP_COLOR = [];

const SOUND_1 = new Audio('snds/simonSound1.mp3');
const SOUND_2 = new Audio('snds/simonSound2.mp3');
const SOUND_3 = new Audio('snds/simonSound3.mp3');
const SOUND_4 = new Audio('snds/simonSound4.mp3');
const ERROR_SND = new Audio('snds/doh.wav');
let SOUND_ARR = [SOUND_4, SOUND_3, SOUND_2, SOUND_1, ERROR_SND];
let dRed = "B2524C";
let bRed = "FF1100";
let mGreen = "98D9B2";
let lGreen = "96FFC1";
let bGreen = "00FF69";

var checkbox = document.querySelector("input[name=checkbox]");

checkbox.addEventListener( 'change', function() {
    if(this.checked) {
        // Checkbox is checked..
        console.log("is checked");
        HARD_FLAG = true;
    } else {
        // Checkbox is not checked..
        console.log("isn't checked");
        HARD_FLAG = false;
    }
});

function hardPause(duration, change){
    
    setTimeout(function() {
        //console.log("hard pause");
        //console.log("changing background to purple");
        if(change === true){
            changeBGround(true);
        }
        
    }, duration);
}
function playSeq(duration) {
    
    setTimeout(function () {    
        
        
        //play sound for specific sequence value:
        //console.log(SEQ_STRING[ITER]);
        playSound(SEQ_STRING[ITER] - 1);
        //change background color:
        changeBGround(false, SEQ_STRING[ITER]); 
        //Increase counter:
        ITER++;
                            
        //console.log(SEQ_STRING.length);
        if (ITER < SEQ_STRING.length) {            
            //Reset the error message to blank:
            displayMsg("error-p", "");
            //Play the sequence again:
            playSeq(1000);             
        }
        if(ITER === SEQ_STRING.length) {
            //console.log('iter at string length');
            hardPause(1000, true);
            ITER = 0;
            USER_TURN = true;
        }
                              
    }, duration);       
}
//Change background color:
function changeBGround(clear, where) {
    //set button id variable to current sequence
    let dispIdCurr = 'button' + where
    //console.log(dispIdCurr + "background");
    //console.log(dispIdPrev);
    //Cycle through all buttons other than current and change background to purple
        //Unless it is
    for(i=1;i<=4; i++) {
        let changeButton = 'button' + i;
        //console.log(changeButton, dispIdCurr, where);
        if(changeButton == dispIdCurr) {
            document.getElementById(dispIdCurr).style.backgroundColor = bGreen;
        }
        else {
            document.getElementById(changeButton).style.backgroundColor = dRed;
        }
    }
   
    //if there is only one item in sequence change bg back to passive color:
    if(clear === true) {
        let dispId = 'button' + SEQ_STRING[SEQ_STRING.length - 1];
        document.getElementById(dispId).style.backgroundColor = dRed;
        clear = false;
        
    }
}
//Generate 1 random sequence of n length:
function genSequence(length) {
    //generate random number between 0 and 3:
    
    //If the sequence is longer than 20 end game:
    if(SEQ_LENGTH > 20) {
        displayMsg("error-p", "sequence longer than 20");
        return;
    }
    //console.log(randomInt);
    
    for(i=0; i<length; i++) {
        //add 3/4 delay between each addition to the sequence:
        //set flag and run timeout:
        let randomInt = Math.floor(Math.random() * Math.floor(4));
        SEQ_STRING += SEQ_ARR[randomInt];
        //console.log("afterpause");
    }
    console.log(SEQ_STRING);
    //Display sequence count to the user:
    let dispCount = SEQ_STRING.length;
    displayMsg("seq-display", `Sequence Length: ` + dispCount);
    USER_TURN = false;
    playSeq(1500);
    
    //reset iterator to 0
    //ITER = 0;
    return SEQ_STRING;
}
function playSound(index) {
    if(window.chrome) {
        SOUND_ARR[index].load();
        if(SOUND_ARR[index] === ERROR_SND) {
            SOUND_ARR[index].volume = 0.25;
            //console.log("reduce volume");
        }
        SOUND_ARR[index].pause();
        SOUND_ARR[index].play(); 
    }
    else {
        SOUND_ARR[index].play(); 
    }
    //SOUND_1.pause();
}
//create +1 length escalating sequences up to 20:
//create user move sequence with buttons
function userMove(num) {
    
    if(!USER_TURN) {
        displayMsg("error-p","Wait your turn");
        return;
    }
    let sndIndex = num-1;
    //currentIndex += 1;
    USER_SEQ += num;
    playSound(sndIndex);
    changeBGround(false, num);
    hardPause(1000, false);
    let currentIndex = USER_SEQ.length - 1;
    
    //Synchronize user moves with current sequence index positions:
    //console.log(USER_SEQ[currentIndex]);
    //check num against last number of gen sequence string:
        //get index position of number in user sequence
        //console.log(currentIndex);
        //check same index position of seqstring
        let genSeqVal = parseInt(SEQ_STRING[currentIndex]);    
        console.log(genSeqVal);
            //check if value at that index position = num
            if(num === genSeqVal) {
                //console.log("numbers match" + num + genSeqVal);
            }
    //If user presses a wrong button they are notified and the same sequence plays again
        if(num != genSeqVal) {
            console.log("incorrect number" + num + genSeqVal);
            console.log("hard flag status:" + HARD_FLAG);
            if(HARD_FLAG === true) {
                displayMsg("error-p", "Incorrect Sequence");
                playSound(4);
                // async function demo(){
                //     await sleep(4000);
                // }
                // demo();
                //hardPause(5000, true)
                resetGame();
                return;
            }
            //notify user:
            displayMsg("error-p","Incorrect Sequence");
            //reset user sequence:
            USER_SEQ = "";
            USER_TURN = false;
            //play error sound:
            //hardPause(5000, false);
            playSound(4)
            //play current sequence with 3 second pause at the start:
            playSeq(3000);

        }
        if(USER_SEQ.length === SEQ_STRING.length) {
            verifySeq();
        }
}

//After user inputs correct sequence
    //Same sequence is repeated back with an additional step
//create verify sequence function:
function verifySeq() {
    
        
        if(USER_SEQ === SEQ_STRING) {
            if(USER_SEQ.length === 20) {
                displayMsg("error-p", "You Win!");
                return;
            }
            SEQ_LENGTH ++;
            console.log("string verified");
            USER_SEQ = "";
            SEQ_STRING = "";
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
        //console.log(SEQ_LENGTH);
        genSequence(SEQ_LENGTH);
    }
    else {
        console.log("game in progress");
        return;
    }
}

function displayMsg(where, msg) {
    document.getElementById(where).innerHTML = msg;
}

