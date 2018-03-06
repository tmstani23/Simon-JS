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

const SOUND_1 = new Audio('snds/simonSound1.mp3');
const SOUND_2 = new Audio('snds/simonSound2.mp3');
const SOUND_3 = new Audio('snds/simonSound3.mp3');
const SOUND_4 = new Audio('snds/simonSound4.mp3');
let SOUND_ARR = [SOUND_4, SOUND_3, SOUND_2, SOUND_1];

        

//document.getElementById("button1").onmousedown = function() {playSound(0)}

function playSeq(duration, initialP) {
    
    setTimeout(function () {    
        //If initial p flag is set add an initial pause before continuing:  
        if(initialP === true) {
            initialP = false;
            console.log("initial pause");
            //playSeq(3000);
        }
        if(!initialP) {
            console.log(SEQ_STRING[ITER]);
            playSound(SEQ_STRING[ITER] - 1);
            ITER++;
            ;                     
            //console.log(SEQ_STRING.length);
            if (ITER < SEQ_STRING.length) {            
            playSeq(1000);             
            }
            if(ITER === SEQ_STRING.length) {
                ITER = 0;
                USER_TURN = true;
            }
        }        
        
        //USER_TURN = true;                       
     }, duration)
     
     //Reset iterator to 0 once it reaches sequence length
     
     //console.log(USER_TURN + "userturn");
    
}
//create 1 random sequence of n length:
function genSequence(length) {
    //generate random number between 0 and 3:
    
    //If the sequence is longer than 20 end game:
    if(SEQ_LENGTH > 20) {
        displayMsg("error-p", "sequence longer than 20");
    }
    //console.log(randomInt);
    
    for(i=0; i<length; i++) {
        //add 3/4 delay between each addition to the sequence:
        //set flag and run timeout:
        
        //console.log("beforepause");
        
        let randomInt = Math.floor(Math.random() * Math.floor(4));
        SEQ_STRING += SEQ_ARR[randomInt];
        //console.log("afterpause");
    }
    console.log(SEQ_STRING);
    //Display sequence count to the user:
    let dispCount = SEQ_STRING.length;
    displayMsg("seq-display", dispCount);
    USER_TURN = false;
    playSeq(2000, true);
    
    //reset iterator to 0
    //ITER = 0;
    return SEQ_STRING;
}
function playSound(val) {
    if(window.chrome) {
        SOUND_ARR[val].load();
        SOUND_ARR[val].play();
    }
    else {
        SOUND_1.play();
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
            //notify user:
            displayMsg("error-p","Incorrect Sequence");
            //reset user sequence:
            USER_SEQ = "";
            USER_TURN = false;
            //play error sound
            //play current sequence with 3 second pause at the start:
            playSeq(3000, true);

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
            //reset user sequence:
            USER_SEQ = "";
            USER_TURN = false;
            //play error sound
            //play current sequence:
            playSeq(2000, true);
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
    displayMsg("error-p", "");
    displayMsg("seq-display", SEQ_LENGTH);

    //Play warning sound:
    
    //Do a 1 second hard pause:

    //Start new sequence:
    startGame();
    //set reset flag back to false:
    RESET_FLAG = false;
}

function startGame() {
    if(RESET_FLAG === true) {
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



// if(SEQ_LENGTH < 20) {
//     console.log(genSequence(SEQ_LENGTH));
//     SEQ_LENGTH ++;
// };