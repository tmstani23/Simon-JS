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
let SEQ_LENGTH = 3;
let ITER = 0;
let USER_TURN = false;

const SOUND_1 = new Audio('snds/simonSound1.mp3');
const SOUND_2 = new Audio('snds/simonSound2.mp3');
const SOUND_3 = new Audio('snds/simonSound3.mp3');
const SOUND_4 = new Audio('snds/simonSound4.mp3');
let SOUND_ARR = [SOUND_1, SOUND_2, SOUND_3, SOUND_4];

        
// clearTimeout();
//document.getElementById("button1").onmousedown = function() {playSound(0)}

function playSeq() {
    USER_TURN = false;
    setTimeout(function () {    
                  
        console.log(SEQ_STRING[ITER])
        ITER++;
        ;                     
        //console.log(SEQ_STRING.length);
        if (ITER < SEQ_STRING.length) {            
           playSeq();             
        }
        //USER_TURN = true;                       
     }, 3000)
     
     //Reset iterator to 0 once it reaches sequence length
     if(ITER === SEQ_STRING.length) {
         ITER = 0;
     }
    
}
//create 1 random sequence of n length:
function genSequence(length) {
    //generate random number between 0 and 3:
    
    
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
    playSeq();
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
        displayMsg("Wait your turn");
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
        console.log(currentIndex);
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
            displayMsg("Incorrect Sequence");
            //play error sound
            //play current sequence:
            playSeq();

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
            console.log("string verified");
        }
        else {
            console.log("incorrect string");
        }
        
}

function displayMsg(msg) {
    document.getElementById("errorP").innerHTML = msg;
}


genSequence(SEQ_LENGTH);
// if(SEQ_LENGTH < 20) {
//     console.log(genSequence(SEQ_LENGTH));
//     SEQ_LENGTH ++;
// };