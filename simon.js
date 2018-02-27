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


// let pausing = setTimeout(addDelay, 750);
        
// clearTimeout();


function addDelay() {
    console.log("adding 0.75 sec delay...");
}
//create 1 random sequence of n length:
function genSequence(length) {
    //generate random number between 0 and 3:
    
    
    //console.log(randomInt);
    
    for(i=0; i<length; i++) {
        //add 3/4 delay between each addition to the sequence:
        
        let randomInt = Math.floor(Math.random() * Math.floor(4));
        SEQ_STRING += SEQ_ARR[randomInt];
    }
    console.log(SEQ_STRING);
    return SEQ_STRING;
}

//create +1 length escalating sequences up to 20:
//create user move sequence with buttons
function userMove(num) {
    
    
    
    
    //currentIndex += 1;
    USER_SEQ += num;
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
                console.log("numbers match" + num + genSeqVal);
            }
    //If user presses a wrong button they are notified and the same sequence plays again
        if(num != genSeqVal) {
            console.log("incorrect number" + num + genSeqVal);
            //notify user:
            //play current sequence:

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