class Piece {
    constructor(color) {
        this.type = EMPTY;
        this.number = -1;
        this.letter = -1;
        this.color = color
    }
}

//King
class K extends Piece {
    constructor(color) {
        super(color)
        this.type = KING;
    }
}


//Queen
class Q extends Piece {
    constructor(color) {
        super(color)
        this.type = QUEEN;
    }
}

//Rook
class R extends Piece {
    constructor(color) {
        super(color)
        this.type = ROOK;
    }
}

//Knight
class N extends Piece {
    constructor(color) {
        super(color)
        this.type = KNIGHT;
    }
}

//Bishop
class B extends Piece {
    constructor(color) {
        super(color)
        this.type = BISHOP;
    }
}

//Pawn
class P extends Piece {
    constructor(color) {
        super(color)
        this.type = PAWN;
    }
}

///////////////
function getLetterOnTheRealBoardFromLetterNumber(letter) {
    return LETTERS_ON_THE_REAL_BOARD.charAt(letter)
}

///////////////
function getNumberOnTheRealBoardFromNumber(number) {
    return EMPTY_STR + (8 - number)
}

///////////////
function getLetterNumberFromTheLetterOnTheRealBoard(letterOnTheRealBoard) {
    return BOARD_SIZE - letterOnTheRealBoard
}

///////////////
function getNumberFromNumberOnTheRealBoardFrom(numberOnTheRealBoard) {
    return LETTERS_ON_THE_REAL_BOARD.indexOf(numberOnTheRealBoard)
}

//////////////
