const divSquare = '<div id = "s$coord" class = "square $color"></div>';
const divFigure = '<div id = "f$coord" class = "figure" slot="$ycoord">$figure<div>';
let map;
let leftDiagonal;
let rightDiagonal;
let blackLeftDiagonal;
let blackRightDiagonal;
let firstOfficerPositiveDiagonal;
let firstOfficerNegativeDiagonal;
let secondOfficerPositiveDiagonal;
let secondOfficerNegativeDiagonal;
let xPositiveRake;
let xNegativeRake;
let yPositiveRake;
let yNegativeRake;
let blackOfficerPosition;
let xKing;
let yKing;


let whiteSymbols = ['♙', '♖', '♘', '♗', '♔', '♕']
let blackSymbols = ['♟', '♜', '♞', '♝', '♚', '♛']
    $(document).ready(function () {
       start();


    });
    function start() {
        map = new Array(64);
        fillTable();
        showFigures('rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR');
    }

    function fillTable() {
        $('.table').html('');
        for (let coord = 0; coord < 64; coord++)
            $('.table').append(divSquare
                .replace('$coord', coord)
                .replace('$color',
                    isGreenSquareAt(coord) ? 'green' : 'white'));
        setDroppable();
    }

    function setDraggable() {
        $('.figure').draggable({ containment: ".table", scroll: false });
    }

    function setDroppable() {
        $( '.square').droppable({
            drop: function( event, ui ) {
                let fromCoord = ui.draggable.attr('id').substring(1);
                let toCoord = this.id.substring(1);
                isWhiteSquare(toCoord);
                isBlackSquare(toCoord);
                moveFigure(fromCoord, toCoord);



            }
        });
    }

    function moveFigure(fromCoord, toCoord) {
        figure = map[fromCoord];
        blackPawnTern(fromCoord, toCoord);
        whitePawnTern(fromCoord, toCoord);
        whiteHorse (fromCoord, toCoord);
        blackHorse(fromCoord, toCoord)
        whiteOfficerSquares(fromCoord, toCoord);
        blackOfficerSquares(fromCoord, toCoord);
        whiteOfficer(fromCoord, toCoord);
        blackOfficer(fromCoord, toCoord);
        whiteRake(fromCoord, toCoord);
        blackRake(fromCoord, toCoord);
        whiteQueen(fromCoord, toCoord);
        blackQueen(fromCoord, toCoord);
        whiteKing(fromCoord, toCoord);
        blackKing(fromCoord, toCoord);
    }

    function showFigures(figures) {
        for (let coord = 0; coord < 64; coord++)
            showFigureAt(coord, figures.charAt(coord));
    }

    function showFigureAt(coord, figure) {
        map[coord] = figure;
        $('#s' + coord).html(divFigure
            .replace('$coord', coord)
            .replace('$ycoord', Math.trunc(coord/8))
            .replace('$figure', getChessSymbol(figure)));
        setDraggable()
    }

    function getChessSymbol(figure) {
        switch (figure) {
            case 'K' : return '&#9812';
            case 'Q' : return '&#9813';
            case 'R' : return '&#9814';
            case 'B' : return '&#9815';
            case 'N' : return '&#9816';
            case 'P' : return '♙';
            case 'k' : return '&#9818';
            case 'q' : return '&#9819';
            case 'r' : return '&#9820';
            case 'b' : return '&#9821';
            case 'n' : return '&#9822';
            case 'p' : return '&#9823';
            default : return ''
        }
    }

    function isGreenSquareAt(coord) {
        return (coord % 8 + Math.floor(coord / 8)) % 2;
    }

    // Ходы фигур

    function whitePawnTern(fromCoord, toCoord) {
         leftDiagonal = fromCoord - 9;
         rightDiagonal = fromCoord - 7;

        if ( (figure === 'P') && (fromCoord - 47 >= 1 ) && (fromCoord - toCoord === 16) && (isEmpty(toCoord) ) && !isWhiteSquare(toCoord)
            && !isWhiteSquare((Number(fromCoord) - 8)) && !isOneLine(fromCoord, toCoord) ) {
            showFigureAt(fromCoord, '1');
            showFigureAt(toCoord, figure);
        }
        else if ( (figure === 'P') && (fromCoord - toCoord === 8) && (isEmpty(toCoord) ) && !isWhiteSquare(toCoord) && !isOneLine(fromCoord, toCoord) ) {
            showFigureAt(fromCoord, '1');
            showFigureAt(toCoord, figure);
        }
        else if ( (figure === 'P')  && (!isEmpty(leftDiagonal) ) && (leftDiagonal == toCoord) && !isWhiteSquare(toCoord) && !isOneLine(fromCoord, toCoord) ) {
            showFigureAt(fromCoord, '1');
            showFigureAt(toCoord, figure);
        }
        else if ( (figure === 'P')  && (!isEmpty(rightDiagonal) ) && (rightDiagonal == toCoord) && !isWhiteSquare(toCoord)  && !isOneLine(fromCoord, toCoord) ){
            showFigureAt(fromCoord, '1');
            showFigureAt(toCoord, figure);
        }
        else if (figure === 'P') {
            showFigureAt(fromCoord, figure)
        }
    }

    function blackPawnTern(fromCoord, toCoord) {
        blackRightDiagonal = Number(fromCoord) + 9;
        blackLeftDiagonal = Number(fromCoord) + 7;
        if ( (figure === 'p') && (fromCoord - 7 < 9 ) && (toCoord - fromCoord === 16) && (isEmpty(toCoord) )
            && !isBlackSquare(toCoord) && !isBlackSquare(Number(fromCoord)+8)  && !isOneLine(fromCoord, toCoord) ) {
            showFigureAt(fromCoord, '1');
            showFigureAt(toCoord, figure);
        }
        else if ( (figure === 'p') && (toCoord - fromCoord === 8) && (isEmpty(toCoord) ) && !isBlackSquare(toCoord) && !isOneLine(fromCoord, toCoord) ) {
            showFigureAt(fromCoord, '1');
            showFigureAt(toCoord, figure);
        }
        else if ( (figure === 'p')  && (!isEmpty(blackLeftDiagonal) ) && (blackLeftDiagonal == toCoord) && !isBlackSquare(toCoord)  && !isOneLine(fromCoord, toCoord) ) {
            showFigureAt(fromCoord, '1');
            showFigureAt(toCoord, figure);
        }
        else if ( (figure === 'p')  && (!isEmpty(blackRightDiagonal) ) && (blackRightDiagonal == toCoord) && !isBlackSquare(toCoord)  && !isOneLine(fromCoord, toCoord) ){
            showFigureAt(fromCoord, '1');
            showFigureAt(toCoord, figure);
        }
        else if (figure === 'p') showFigureAt(fromCoord, figure);

    }

    function whiteHorse(fromCoord, toCoord) {
        if ( (figure === 'N') && ( (toCoord == fromCoord - 17) || (toCoord == fromCoord - 15)
            || (toCoord == fromCoord - 6) || ( toCoord == fromCoord - 10) || (toCoord == Number(fromCoord) +6 )
            || (toCoord == Number(fromCoord) + 10) || (toCoord == Number(fromCoord) + 15) || (toCoord == Number(fromCoord) + 17))
           && !isWhiteSquare(toCoord)){
            showFigureAt(fromCoord, '1');
            showFigureAt(toCoord, figure);
        }
        else if (figure === 'N') showFigureAt(fromCoord, figure);
    }

    function blackHorse(fromCoord, toCoord) {
        if ( (figure === 'n') && ( (toCoord == fromCoord - 17) || (toCoord == fromCoord - 15)
            || (toCoord == fromCoord - 6) || ( toCoord == fromCoord - 10) || (toCoord == Number(fromCoord) +6 )
            || (toCoord == Number(fromCoord) + 10) || (toCoord == Number(fromCoord) + 15) || (toCoord == Number(fromCoord) + 17))
            && !isBlackSquare(toCoord)){
            showFigureAt(fromCoord, '1');
            showFigureAt(toCoord, figure);
        }
        else if (figure === 'n') showFigureAt(fromCoord, figure);
    }

    function whiteOfficer(fromCoord, toCoord) {
        if ( (figure === 'B') && whiteOfficerSquares(fromCoord, toCoord) && !isWhiteSquare(toCoord) ){
            showFigureAt(fromCoord, '1');
            showFigureAt(toCoord, figure);

        }
        else if (figure === 'B') showFigureAt(fromCoord, figure);
    }

    function blackOfficer(fromCoord, toCoord, blackOfficerPosition) {
        if ( (figure === 'b') && blackOfficerSquares(fromCoord, toCoord) && !isBlackSquare(toCoord) ){
            showFigureAt(fromCoord, '1');
            showFigureAt(toCoord, figure);
            blackOfficerPosition = toCoord;
        }
        else if (figure === 'b') showFigureAt(fromCoord, figure);
    }

    function whiteRake(fromCoord, toCoord) {
        if ((figure === 'R') && rakeSquares(fromCoord, toCoord) && !isWhiteSquare(toCoord) ){
            showFigureAt(fromCoord, '1');
            showFigureAt(toCoord, figure);

        }
        else if (figure === 'R') showFigureAt(fromCoord, figure);
    }

    function blackRake(fromCoord, toCoord) {
        if ((figure === 'r') && rakeSquares(fromCoord, toCoord) && !isBlackSquare(toCoord) ){
            showFigureAt(fromCoord, '1');
            showFigureAt(toCoord, figure);

        }
        else if (figure === 'r') showFigureAt(fromCoord, figure);
    }

    function whiteQueen(fromCoord, toCoord) {
        if ((figure === 'Q') && ( rakeSquares(fromCoord, toCoord) || whiteOfficerSquares(fromCoord, toCoord) ) && !isWhiteSquare(toCoord) ){
            showFigureAt(fromCoord, '1');
            showFigureAt(toCoord, figure);
        }
        else if (figure === 'Q') showFigureAt(fromCoord, figure);
    }

    function blackQueen(fromCoord, toCoord) {
        if ((figure === 'q') && ( rakeSquares(fromCoord, toCoord) || blackOfficerSquares(fromCoord, toCoord) ) && !isBlackSquare(toCoord) ){
            showFigureAt(fromCoord, '1');
            showFigureAt(toCoord, figure);
        }
        else if (figure === 'q') showFigureAt(fromCoord, figure);
    }

    function whiteKing(fromCoord, toCoord) {
    if ( (figure ==='K') && (kingSquares(fromCoord, toCoord)) && !isWhiteSquare(toCoord) ){
        showFigureAt(fromCoord, '1');
        showFigureAt(toCoord, figure);
    }
    else if (figure === 'K') showFigureAt(fromCoord, figure);
    }

    function blackKing(fromCoord, toCoord) {
        if ( (figure ==='k') && (kingSquares(fromCoord, toCoord)) && !isBlackSquare(toCoord) ){
            showFigureAt(fromCoord, '1');
            showFigureAt(toCoord, figure);
        }
        else if (figure === 'k') showFigureAt(fromCoord, figure);
    }

    // Функции проверок

    function isWhiteSquare(toCoord) {
        if (whiteSymbols.indexOf(document.querySelector('#f'+toCoord).textContent)!== -1){
            return true
        }
        else
            return  false
    }

    function isBlackSquare(toCoord) {
        if (blackSymbols.indexOf(document.querySelector('#f'+toCoord).textContent)!== -1){
            return true
        }
        else
            return  false

    }

    function whiteOfficerSquares(fromCoord, toCoord) {
        if (figure ==='B') {
            let counter = 0
            let officerPosition = Number(fromCoord)
            firstOfficerPositiveDiagonal =
                ['f' + Number(officerPosition + 9), 'f' + Number(officerPosition + 18), 'f' + Number(officerPosition + 27),
                    'f' + Number(officerPosition + 36), 'f' + Number(officerPosition + 45), 'f' + Number(officerPosition + 54),
                    'f' + Number(officerPosition + 63)]
            firstOfficerNegativeDiagonal =
                ['f' + Number(officerPosition - 9), 'f' + Number(officerPosition - 18), 'f' + Number(officerPosition - 27),
                    'f' + Number(officerPosition - 36), 'f' + Number(officerPosition - 45), 'f' + Number(officerPosition - 54),
                    'f' + Number(officerPosition - 63)]
            secondOfficerNegativeDiagonal =
                ['f' + Number(officerPosition + 7), 'f' + Number(officerPosition + 14), 'f' + Number(officerPosition + 21),
                    'f' + Number(officerPosition + 28), 'f' + Number(officerPosition + 35), 'f' + Number(officerPosition + 42),
                    'f' + Number(officerPosition + 49)]
            secondOfficerPositiveDiagonal =
                ['f' + Number(officerPosition - 7), 'f' + Number(officerPosition - 14), 'f' + Number(officerPosition - 21),
                    'f' + Number(officerPosition - 28), 'f' + Number(officerPosition - 35), 'f' + Number(officerPosition - 42),
                    'f' + Number(officerPosition - 49)]

            if (firstOfficerNegativeDiagonal.indexOf(document.querySelector('#f' + toCoord).id) !== -1) {
                for (let i = 0; i < firstOfficerNegativeDiagonal.indexOf(document.querySelector('#f' + toCoord).id); i++) {

                    if ((document.querySelector('#' + firstOfficerNegativeDiagonal[i])).textContent === '')
                        counter = counter;
                    else counter++
                }
            } else if (secondOfficerPositiveDiagonal.indexOf(document.querySelector('#f' + toCoord).id) !== -1) {
                for (let i = 0; i < secondOfficerPositiveDiagonal.indexOf(document.querySelector('#f' + toCoord).id); i++) {

                    if ((document.querySelector('#' + secondOfficerPositiveDiagonal[i])).textContent === '')
                        counter = counter;
                    else counter++

                }
            } else if (firstOfficerPositiveDiagonal.indexOf(document.querySelector('#f' + toCoord).id) !== -1) {
                for (let i = 0; i < firstOfficerPositiveDiagonal.indexOf(document.querySelector('#f' + toCoord).id); i++) {

                    if ((document.querySelector('#' + firstOfficerPositiveDiagonal[i])).textContent === '')
                        counter = counter;
                    else counter++
                }
            } else if (secondOfficerNegativeDiagonal.indexOf(document.querySelector('#f' + toCoord).id) !== -1) {
                for (let i = 0; i < secondOfficerNegativeDiagonal.indexOf(document.querySelector('#f' + toCoord).id); i++) {

                    if ((document.querySelector('#' + secondOfficerNegativeDiagonal[i])).textContent === '')
                        counter = counter;
                    else counter++
                }
            } else counter++

            if (counter === 0) return true
            else return false
        }
    }

    function blackOfficerSquares(fromCoord, toCoord) {
        if (figure ==='b') {
            let counter = 0
            let officerPosition = Number(fromCoord)
            firstOfficerPositiveDiagonal =
                ['f' + Number(officerPosition + 9), 'f' + Number(officerPosition + 18), 'f' + Number(officerPosition + 27),
                    'f' + Number(officerPosition + 36), 'f' + Number(officerPosition + 45), 'f' + Number(officerPosition + 54),
                    'f' + Number(officerPosition + 63)]
            firstOfficerNegativeDiagonal =
                ['f' + Number(officerPosition - 9), 'f' + Number(officerPosition - 18), 'f' + Number(officerPosition - 27),
                    'f' + Number(officerPosition - 36), 'f' + Number(officerPosition - 45), 'f' + Number(officerPosition - 54),
                    'f' + Number(officerPosition - 63)]
            secondOfficerNegativeDiagonal =
                ['f' + Number(officerPosition + 7), 'f' + Number(officerPosition + 14), 'f' + Number(officerPosition + 21),
                    'f' + Number(officerPosition + 28), 'f' + Number(officerPosition + 35), 'f' + Number(officerPosition + 42),
                    'f' + Number(officerPosition + 49)]
            secondOfficerPositiveDiagonal =
                ['f' + Number(officerPosition - 7), 'f' + Number(officerPosition - 14), 'f' + Number(officerPosition - 21),
                    'f' + Number(officerPosition - 28), 'f' + Number(officerPosition - 35), 'f' + Number(officerPosition - 42),
                    'f' + Number(officerPosition - 49)]

            if (firstOfficerNegativeDiagonal.indexOf(document.querySelector('#f' + toCoord).id) !== -1) {
                for (let i = 0; i < firstOfficerNegativeDiagonal.indexOf(document.querySelector('#f' + toCoord).id); i++) {

                    if ((document.querySelector('#' + firstOfficerNegativeDiagonal[i])).textContent === '')
                        counter = counter;
                    else counter++
                }
            } else if (secondOfficerPositiveDiagonal.indexOf(document.querySelector('#f' + toCoord).id) !== -1) {
                for (let i = 0; i < secondOfficerPositiveDiagonal.indexOf(document.querySelector('#f' + toCoord).id); i++) {

                    if ((document.querySelector('#' + secondOfficerPositiveDiagonal[i])).textContent === '')
                        counter = counter;
                    else counter++

                }
            } else if (firstOfficerPositiveDiagonal.indexOf(document.querySelector('#f' + toCoord).id) !== -1) {
                for (let i = 0; i < firstOfficerPositiveDiagonal.indexOf(document.querySelector('#f' + toCoord).id); i++) {

                    if ((document.querySelector('#' + firstOfficerPositiveDiagonal[i])).textContent === '')
                        counter = counter;
                    else counter++
                }
            } else if (secondOfficerNegativeDiagonal.indexOf(document.querySelector('#f' + toCoord).id) !== -1) {
                for (let i = 0; i < secondOfficerNegativeDiagonal.indexOf(document.querySelector('#f' + toCoord).id); i++) {

                    if ((document.querySelector('#' + secondOfficerNegativeDiagonal[i])).textContent === '')
                        counter = counter;
                    else counter++
                }
            } else counter++

            if (counter === 0) return true
            else return false
        }
    }

    function rakeSquares (fromCoord, toCoord){
        let rakePosition = Number(fromCoord)
        let counter = 0
        xPositiveRake =
            ['f' + Number(rakePosition + 1), 'f' + Number(rakePosition + 2), 'f' + Number(rakePosition + 3),
            'f' + Number(rakePosition + 4), 'f' + Number(rakePosition + 5), 'f' + Number(rakePosition + 6),
            'f' + Number(rakePosition + 7)
            ]
        xNegativeRake =
            ['f' + Number(rakePosition - 1), 'f' + Number(rakePosition - 2), 'f' + Number(rakePosition - 3),
            'f' + Number(rakePosition - 4), 'f' + Number(rakePosition - 5), 'f' + Number(rakePosition - 6),
            'f' + Number(rakePosition - 7)
            ]
        yPositiveRake =
            ['f' + Number(rakePosition + 8), 'f' + Number(rakePosition + 16), 'f' + Number(rakePosition + 24),
            'f' + Number(rakePosition + 32), 'f' + Number(rakePosition + 40), 'f' + Number(rakePosition + 48),
            'f' + Number(rakePosition + 56)
            ]
        yNegativeRake =
            ['f' + Number(rakePosition - 8), 'f' + Number(rakePosition - 16), 'f' + Number(rakePosition - 24),
            'f' + Number(rakePosition - 32), 'f' + Number(rakePosition - 40), 'f' + Number(rakePosition - 48),
            'f' + Number(rakePosition - 56)
            ]
        if ( (xPositiveRake.indexOf(document.querySelector('#f' + toCoord).id) !== -1) &&
            (isOneLine(fromCoord, toCoord) ) ) {
            for (let i = 0; i < xPositiveRake.indexOf(document.querySelector('#f' + toCoord).id); i++) {

                if ((document.querySelector('#' + xPositiveRake[i])).textContent === '')
                    counter = counter;
                else counter++
            }
        }
        else if ( (xNegativeRake.indexOf(document.querySelector('#f' + toCoord).id) !== -1) &&
            (isOneLine(fromCoord, toCoord) ) ){
            for (let i = 0; i < xNegativeRake.indexOf(document.querySelector('#f' + toCoord).id); i++) {

                if ((document.querySelector('#' + xNegativeRake[i])).textContent === '')
                    counter = counter;
                else counter++
            }
        }
        else if ( yPositiveRake.indexOf(document.querySelector('#f' + toCoord).id) !== -1 ){
            for (let i = 0; i < yPositiveRake.indexOf(document.querySelector('#f' + toCoord).id); i++) {

                if ((document.querySelector('#' + yPositiveRake[i])).textContent === '')
                    counter = counter;
                else counter++
            }
        }
        else if ( yNegativeRake.indexOf(document.querySelector('#f' + toCoord).id) !== -1  ){
            for (let i = 0; i < yNegativeRake.indexOf(document.querySelector('#f' + toCoord).id); i++) {

                if ((document.querySelector('#' + yNegativeRake[i])).textContent === '')
                    counter = counter;
                else counter++
            }
        }
        else counter ++

        if (counter === 0) return true
        else return false
    }

    function kingSquares(fromCoord, toCoord){
        let kingPosition = Number(fromCoord)
        let counter = 0
        xKing = ['f' + Number(kingPosition - 1), 'f' + Number(kingPosition + 1)]
        yKing = ['f' + Number(kingPosition + 7), 'f' + Number(kingPosition + 8), 'f' + Number(kingPosition + 9),
            'f' + Number(kingPosition - 7), 'f' + Number(kingPosition - 8), 'f' + Number(kingPosition - 9)]
        if ( (xKing.indexOf(document.querySelector('#f' + toCoord).id) !== -1) &&
            (isOneLine(fromCoord, toCoord)) ){
            if (document.querySelector('#f'+toCoord).textContent ==='' && !blackOfficerSquares(blackOfficerPosition, toCoord)){
                counter = counter;
            }
            else counter++
        }
        else if (yKing.indexOf(document.querySelector('#f' + toCoord).id) !== -1){
            if (document.querySelector('#f'+toCoord).textContent ==='' && !blackOfficerSquares(blackOfficerPosition, toCoord))
                counter = counter;
            else counter++
        }
        else  counter++
        if (counter === 0) return true
        else return false
    }


    function isOneLine(fromCoord, toCoord) {
        if (document.querySelector('#f' + fromCoord).slot === document.querySelector('#f' + toCoord).slot) return true
        else return false
    }

    function isEmpty(toCoord) {
            if (document.getElementById('f' + toCoord).textContent === '')
                return true
            else
               return  false
        }
