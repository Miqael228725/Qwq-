let info = document.querySelector('.info')
let btn_start = document.querySelector('.btn')
let main = document.querySelector('.main')
let field = document.querySelector('.field')
let n_fig = document.querySelector('.figure')
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
    let cell_list = []
    field.style.display = 'grid'
    field.style.gridTemplateRows = `repeat(${rows}, ${cell_size}px)`
    field.style.gridTemplateColumns = `repeat(${colums}, ${cell_size}px)`
    field.style.width = `${colums*cell_size}px`
    field.style.height = `${rows*cell_size}px`
    for(let i=0; i < rows * colums; i += 1){
        let cell = document.createElement('div')
        cell.style.border = '1px solid darkgrey'
        cell.style.boxSizing = 'border-box'


// В данном отрывке кода я пытался найти последнюю строку и задать ей цвет (в последствии прозрачный) чтобы добавить коллизию, чтобы фигуры не падали в out of bounds
        cell.classList.add('.cell')
        let lastRow = rows[rows.length - 1];
        cell.id = `${i}`
        cell_list.appendChild(cell)
    let last_cell = cell_list[-1]
    let last_row = last_cell.y
    for (let i=0; cell_list; i+=1){
        if (cell.y == last_row){
            cell.style.backgroundColor = 'red'
        }
    }
        field.appendChild(cell)
        // cell.forEach(q => {
        //     if (q.y == lastRow){
        //         q.style.backgroundColor = 'red'
        //     }
        // });

   

   

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
    draw_fig(cur_fig)
}


let next_fig = null

function shapes() {
        if (!next_fig){
            let rn_shape = Math.floor(Math.random()*all_fig.length)
            next_fig = all_fig[rn_shape]
        }
        cur_fig = {
            shape: next_fig.shape,
            color: next_fig.color,
            y:0,
            x: Math.floor(colums/2)}
            create_fig()
}


function create_fig(){
    n_fig.innerHTML = ''
    next_fig.shape.forEach(row => {
        let r_div = document.createElement('div')
        r_div.style.display = 'flex'
        row.forEach(cell => {
            let cell_div = document.createElement('div')
            cell_div.style.width = `${cell_size}px`
            cell_div.style.height = `${cell_size}px`
            cell_div.style.backgroundColor = cell ? next_fig.color : 'transparent'
            cell_div.style.border = '1px solid darkgrey'
            r_div.appendChild(cell_div)
        });
        n_fig.appendChild(r_div)
    });
}


setInterval(move_down, 1000*3)
    shapes()
// if (main.style.display != 'none'){
    
// }


