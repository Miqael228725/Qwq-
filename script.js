let info = document.querySelector('.info')
let btn_start = document.querySelector('.btn')
let main = document.querySelector('.main')
let field = document.querySelector('.field')
let n_fig = document.querySelector('.figure')
let is_start = false
let is_end = 0
btn_start.addEventListener('click', function(){
    main.style.display = 'flex'
    is_start = true
    anime({
        targets: '.info',
        translateY: '610px',
        duration: 500,
        easing: 'linear'
    }).finished.then(function(){
       info.style.display = 'none' 
       if (is_start && !is_end){
        gameinterval = setInterval(move_down, 1000)
        shapes()
    }
       
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
    if(can_move(cur_fig, 0, 1)){
        cur_fig.y += 1
        draw_fig(cur_fig)
    }
    else{
        draw_fig(cur_fig)
        anchored()
        shapes()
        update()
    }
    
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
            let rn_shape = Math.floor(Math.random()*all_fig.length)
            next_fig = all_fig[rn_shape]
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


document.addEventListener('keydown', function(event){
    if (main.style.display != 'none' && cur_fig){
        draw_fig(cur_fig, 0)
        if (event.key === 'a' || event.key === 'ArrowLeft' || event.key === 'A' || event.key === 'ф' || event.key === 'Ф'){
            if (can_move(cur_fig, -1, 0)){
                cur_fig.x -= 1  
            }
        }
        if (event.key === 'd' || event.key === 'ArrowRight' || event.key === 'D' || event.key === 'в' || event.key === 'В'){
            if (can_move(cur_fig, 1, 0)){
                cur_fig.x += 1 
            }
        }
        if (event.key === 's' || event.key === 'ArrowDown' || event.key === 'S' || event.key === 'ы' || event.key === 'Ы'){
            if (can_move(cur_fig, 0, 1)){
                cur_fig.y += 1
            }
        }
        if (event.key === 'w' || event.key === 'ArrowUp' || event.key === 'W' || event.key === 'ц' || event.key === 'Ц'){
            let rotated_fig = rotate(cur_fig.shape)
            if (can_rotate(rotated_fig, cur_fig.x, cur_fig.y)){
                cur_fig.shape = rotated_fig
            }
        }
        draw_fig(cur_fig)
    }
})




function can_move(obj, obj_x, obj_y){
    return obj.shape.every((row,i)=>{
        return row.every((cell,j)=>{
            if (cell){
                let new_x = obj.x + j + obj_x
                let new_y = obj.y + i + obj_y
                if (new_x < 0 || new_x >= colums || new_y >= rows){
                    return false
                }
                if (new_y >= 0 && game_board[new_y][new_x] === 1){
                    return false
                }
                
            }
            return true
        })})
}

function rotate(obj){
    let rotate_list = []
    for (let i=0; i < obj[0].length; i+=1){
        rotate_list[i] = []
        for(let j=obj.length-1; j >= 0; j-=1){
            rotate_list[i][obj.length-1-j] = obj[j][i]
        }
    }
    return rotate_list
}

function can_rotate(obj, obj_x, obj_y){
    return obj.every((row, i)=>{
        return row.every((cell,j)=>{
            if (cell){
                let new_x = obj_x + j
                let new_y = obj_y + i
                if (new_x < 0 || new_x >= colums || new_y >= rows){
                    return false
                }
                if (new_y >= 0 && game_board[new_y][new_x] === 1){
                    return false
                }
            }
            return true
        })
    })
}





function check_full_row(){
    for(let i=0; i < rows; i+=1){
        if(game_board[i].every(cell=>cell===1)){
            game_board.splice(i, 1)
            game_board.unshift(new Array(colums).fill(0))
            update()
        }
    }
    
}
function update(){
    for (let i=0; i< rows; i+=1){
        for(let j=0; j< colums; j+=1){
            let index = i * colums + j
            let element_cell = field.children[index]
            // element_cell.style.backgroundColor = ['', 'lightred'][game_board[i][j] === 1 ? 1 : 0]
            element_cell.style.backgroundColor = game_board[i][j] === 1 ? "lightred" : ''
        }
    }
}



function anchored(){
    cur_fig.shape.forEach((row, i) => {
        row.forEach((cell, j) => {
            if(cell){
                let fix_x = cur_fig.x + j
                let fix_y = cur_fig.y + i
                if(fix_x >= 0 && fix_x < colums && fix_y >= 0 && fix_y < rows){
                    game_board[fix_y][fix_x] = 1
                }
            }
        });
    });
    check_full_row()
    if_game_end()
    update()
}


function if_game_end(){
    if(game_board[0].some(cell=> cell === 1)){
        is_end = 1
        clearInterval(gameinterval)
        alert('Game over')
        window.location.reload()
    }
}





