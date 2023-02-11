////////////////////////////////////////////////////////// controller ///////////////////////////////////////////////////////////////////////////////////////////////////////////// 
'use strict';

const UP_CURSOR_KEY = 'ArrowUp';
const DOWN_CURSOR_KEY = 'ArrowDown';
const RIGHT_CURSOR_KEY = 'ArrowRight';
const LEFT_CURSOR_KEY = 'ArrowLeft';

function initListeners() {
    document.body.addEventListener("keydown", (event) => {
        if (event.isComposing || event.keyCode === 229) {
            return;
        }
        let enteredKey = event.key
        // document.body.innerHTML += enteredKey;

        switch (enteredKey) {
            case UP_CURSOR_KEY: currY += MOVE_STEP;
                break;
            case DOWN_CURSOR_KEY: currY -= MOVE_STEP;
                break;
            case RIGHT_CURSOR_KEY: currX += MOVE_STEP;
                break;
            case LEFT_CURSOR_KEY: currX -= MOVE_STEP;
                break;
        }  //switch
    });  //ddEventListener("keydown"
}  //function initListeners() 