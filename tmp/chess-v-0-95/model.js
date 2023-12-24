class Model {
    constructor() {
        this.boardArr = new Array(FIELD_HEIGHT);
        for (let i = 0; i < this.boardArr.length; i++) {
            this.boardArr[i] = new Array(FIELD_WIDTH);
        }

        for (let i = 0; i < FIELD_HEIGHT; i++) {
            for (let j = 0; j < FIELD_WIDTH; j++) {
                this.boardArr[i][j] = EMPTY;
            }
        }

        this.whoMoves = WHITE_COLOR
        this.didKingMove = [false, false]  //first is w, second is b
        this.didRookHmove = [false, false]  //first is w, second is b
        this.didRookAmove = [false, false]  //first is w, second is bа
    }


    //read only
    getBoardArrElementForThisId(id) {
        let firstChar = id.charAt(0)
        let secondChar = id.charAt(1)
        log(firstChar + '--' + secondChar)
        return this.boardArr[getLetterNumberFromTheLetterOnTheRealBoard(secondChar)][getNumberFromNumberOnTheRealBoardFrom(firstChar)]  // getLetterNumberFromTheLetterOnTheRealBoard(secondChar) ;  //getNumberFromNumberOnTheRealBoardFrom(firstChar)
    }

    putPiece(id, piece) {
        let firstChar = id.charAt(0)
        let secondChar = id.charAt(1)
        // this.boardArr[7][0] = new R(true)
        // log('numb:'+this.getBoardArrElementForThisId(field).type)
        this.boardArr[getLetterNumberFromTheLetterOnTheRealBoard(secondChar)][getNumberFromNumberOnTheRealBoardFrom(firstChar)] = piece
        // t(field)
    }

    makeFieldEmpty(id) {
        let firstChar = id.charAt(0)
        let secondChar = id.charAt(1)
        // this.boardArr[7][0] = new R(true)
        // log('numb:'+this.getBoardArrElementForThisId(field).type)
        this.boardArr[getLetterNumberFromTheLetterOnTheRealBoard(secondChar)][getNumberFromNumberOnTheRealBoardFrom(firstChar)] = EMPTY
        // t(field)
    }

    changeWhoMoves() {
        this.whoMoves = !this.whoMoves
    }
}

function saveCurrentModel() {
    savedModels.push(_.cloneDeep(currentModel))
}


