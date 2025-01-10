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

let rows = 20
let colums = 10
let cell_size = 30
let game_board = []
for(let i=0; i < rows; i+=1){
    game_board.push(new Array(colums).fill(0))
}
function create_field(){
    field.style.display = 'grid'
    field.style.gridTemplateRows = `repeat(${rows}, ${cell_size}px)`
    field.style.gridTemplateColums = `repeat(${colums}, ${cell_size}px)`
    field.style.width = `${colums*cell_size}px`
    field.style.height = `${rows*cell_size}px`
    for(let i=0; i < rows * colums; i += 1){
        let cell = document.createElement('div')
        cell.style.border = '2px, solid, white'
        cell.style.boxSizing = 'border-box'
        field.appendChild(cell)
    }
}

create_field()


let cur_fig = {
    shape: [
        [1,1,1]
        [0,0,1]
    ],
    x: 3,
    y: 0
}






