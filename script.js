let info = document.querySelector('.info')
let btn_start = document.querySelector('.btn')
let main = document.querySelector('.main')
let field = document.querySelector('.field')

btn_start.addEventListener('click', function(){
    main.style.display = 'flex'
    anime({
        targets: '.info',
        translateY: '610px',
        duration: 500,
        easing: 'linear'
    }).finished.then(function(){
       info.style.display = 'none' 
       
       
    })

})

let rows = 30
let colums = 20
let cell_size = 30
let game_board = []
for(let i=0; i < rows; i+=1){
    game_board.push(new Array(colums).fill(0))
}
function create_field(){
    field.style.display = 'grid'
    field.style.gridTemplateRows = `repeat(${rows}, ${cell_size}px)`
    field.style.gridTemplateColumns = `repeat(${colums}, ${cell_size}px)`
    field.style.width = `${colums*cell_size}px`
    field.style.height = `${rows*cell_size}px`
    for(let i=0; i < rows * colums; i += 1){
        let cell = document.createElement('div')
        cell.style.border = '1px solid darkgrey'
        cell.style.boxSizing = 'border-box'
        field.appendChild(cell)
    }
}

create_field()


// let cur_fig = {
//     null
// }

let all_fig = [
    {
        shape: [
            [1,1,1,1]
        ],
        color: 'purple'
    },
    {
        shape: [
            [1,1,1],
            [0,0,1]
        ],
        color: 'blue'
    },
    {
        shape: [
            [0,1,0],
            [1,1,1]
        ],
        color: 'red'
    },
    {
        shape: [
            [0,0,1],
            [1,1,1]
        ],
        color: 'pink'
    },
    {
        shape: [
            [1,1],
            [1,1]
        ],
        color: 'magenta'
    },
    {
        shape: [
            [0,1,1],
            [1,1,0]
        ],
        color: 'cyan'
    },
    {
        shape: [
            [1,1,0],
            [0,1,1]
        ],
        color: 'orange'
    }
]

let cur_fig = null

function draw_fig(obj, val=1){
    obj.shape.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell){
                let x = obj.x+j
                let y = obj.y+i
                if (y >= 0 && y <= rows && x >= 0 && x <= colums-1){
                    let index = y*colums+x
                    let element_cell = field.children[index]
                    element_cell.style.backgroundColor = val ? obj.color : ''
                } 
            }
        });
    });
}


function move_down(){
    draw_fig(cur_fig, 0)
    cur_fig.y += 1
    draw_fig(cur_fig, 0)
}
if (main.style.display != 'none'){
    setInterval(move_down, 1000*3)
}











