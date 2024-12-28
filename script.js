let info = document.querySelector('.info')
let btn_start = document.querySelector('.btn')
let main = document.querySelector('.main')

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
