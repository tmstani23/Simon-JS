//Simon Game

//Includes:


//Plays a sound for each part of the sequence and when user click corresponding button 
//If user presses a wrong button they are notified and the same sequence plays again
//User can see how many steps are in current sequence
//User can click a reset button to start the game over with 1 sequence
//Strict Mode: If the user makes an incorrect click they are notified and the game resets to 1 sequence
//Win Game: User is notified after successfully completing 20 step sequence and then game resets.

//escalating series of random button presses
const SEQ_ARR = [1,2,3,4];
let USER_SEQ = "";
let SEQ_STRING = "";
let SEQ_LENGTH = 3;

//create 1 random sequence of n length:
function genSequence(length) {
    //generate random number between 0 and 3:
    
    
    //console.log(randomInt);
    
    for(i=0; i<length; i++) {
        let randomInt = Math.floor(Math.random() * Math.floor(4));
        SEQ_STRING += SEQ_ARR[randomInt];
        
    }
    console.log(SEQ_STRING);
    return SEQ_STRING;
}

//create +1 length escalating sequences up to 20:
//create user move sequence with buttons
function userMove(position) {
    
    USER_SEQ += position;
    console.log(USER_SEQ);
    if(SEQ_LENGTH === USER_SEQ.length) {
        verifySeq(USER_SEQ);
    }
    
}

//After user inputs correct sequence
    //Same sequence is repeated back with an additional step
//create verify sequence function:
function verifySeq(inputSeq) {
    if(inputSeq.length === SEQ_STRING.length) {
        
        if(USER_SEQ === SEQ_STRING) {
            console.log("string verified");
        }
        else {
            console.log("incorrect string");
        }
        
    }
}

genSequence(SEQ_LENGTH);
// if(SEQ_LENGTH < 20) {
//     console.log(genSequence(SEQ_LENGTH));
//     SEQ_LENGTH ++;
// };