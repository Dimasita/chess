const divSquare = '<div id = "s$coord" class = "square $color"></div>';
const divFigure = '<div id = "f$coord" class = "figure">$figure<div>';
let map;
let leftDiagonal;
let rightDiagonal;
let blackLeftDiagonal;
let blackRightDiagonal;
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
        $('.figure').draggable();
    }

    function setDroppable() {
        $( '.square').droppable({
            drop: function( event, ui ) {
                let fromCoord = ui.draggable.attr('id').substring(1);
                let toCoord = this.id.substring(1);
                moveFigure(fromCoord, toCoord);
            }
        });
    }

    function moveFigure(fromCoord, toCoord) {
        figure = map[fromCoord];

        blackPawnTern(fromCoord, toCoord);
        whitePawnTern(fromCoord, toCoord);


    }

    function showFigures(figures) {
        for (let coord = 0; coord < 64; coord++)
            showFigureAt(coord, figures.charAt(coord));
    }

    function showFigureAt(coord, figure) {
        map[coord] = figure;
        $('#s' + coord).html(divFigure
            .replace('$coord', coord)
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
            case 'P' : return '&#9817';
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

    // Функции проверки

    function whitePawnTern(fromCoord, toCoord) {
        console.log(fromCoord)
         leftDiagonal = fromCoord - 9;
         rightDiagonal = fromCoord - 7;

        if ( (figure === 'P') && (fromCoord - 47 >= 1 ) && (fromCoord - toCoord === 16) && (isEmpty(toCoord) ) ) {
            showFigureAt(fromCoord, '1');
            showFigureAt(toCoord, figure);
            console.log('Фигура походила с клетки ' + fromCoord + ' на клетку ' + toCoord)
        }
        else if ( (figure === 'P') && (fromCoord - toCoord === 8) && (isEmpty(toCoord) )) {
            showFigureAt(fromCoord, '1');
            showFigureAt(toCoord, figure);
            console.log('Фигура походила с клетки ' + fromCoord + ' на клетку ' + toCoord)
        }
        else if ( (figure === 'P')  && (!isEmpty(leftDiagonal) ) && (leftDiagonal == toCoord) ) {
            showFigureAt(fromCoord, '1');
            showFigureAt(toCoord, figure);
            console.log('Фигура походила с клетки ' + fromCoord + ' на клетку ' + toCoord)
        }
        else if ( (figure === 'P')  && (!isEmpty(rightDiagonal) ) && (rightDiagonal == toCoord) ){
            showFigureAt(fromCoord, '1');
            showFigureAt(toCoord, figure);
            console.log('Фигура походила с клетки ' + fromCoord + ' на клетку ' + toCoord)
        }
        else if (figure === 'P') {
            showFigureAt(fromCoord, figure)
        }
    }


    function blackPawnTern(fromCoord, toCoord) {
        blackRightDiagonal = Number(fromCoord) + 9;
        blackLeftDiagonal = Number(fromCoord) + 7;

        if ( (figure === 'p') && (fromCoord - 7 < 9 ) && (toCoord - fromCoord === 16) && (isEmpty(toCoord) ) ) {
            showFigureAt(fromCoord, '1');
            showFigureAt(toCoord, figure);
            console.log('Фигура походила с клетки ' + fromCoord + ' на клетку ' + toCoord)
        }
        else if ( (figure === 'p') && (toCoord - fromCoord === 8) && (isEmpty(toCoord) ) ) {
            showFigureAt(fromCoord, '1');
            showFigureAt(toCoord, figure);
            console.log('Фигура походила с клетки ' + fromCoord + ' на клетку ' + toCoord)
        }
        else if ( (figure === 'p')  && (!isEmpty(blackLeftDiagonal) ) && (blackLeftDiagonal == toCoord) ) {
            showFigureAt(fromCoord, '1');
            showFigureAt(toCoord, figure);
            console.log('Фигура походила с клетки ' + fromCoord + ' на клетку ' + toCoord)
        }
        else if ( (figure === 'p')  && (!isEmpty(blackRightDiagonal) ) && (blackRightDiagonal == toCoord) ){
            showFigureAt(fromCoord, '1');
            showFigureAt(toCoord, figure);
            console.log('Фигура походила с клетки ' + fromCoord + ' на клетку ' + toCoord)
        }
        else if (figure === 'p') showFigureAt(fromCoord, figure);

    }

    function isEmpty(toCoord) {
        if (document.getElementById('f' + toCoord).textContent === '')
            return true;
        else
           return  false
    }
