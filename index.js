const canvas = document.querySelector('canvas')
const k = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
k.fillStyle = 'white';
k.fillRect(0,0,canvas.width,canvas.height)

const image = new Image()
image.src = './IMG/map.png'

const playerImagem = new Image()
playerImagem.src = './IMG/playerDown.png' 

class Sprite {
    constructor({position,velocity,image}){
        this.position = position
        this.image = image
    }

    draw(){
        k.drawImage(this.image, this.position.x, this.position.y)
    }
}

const background = new Sprite({
    position: {
        x: -650,
        y: -450
    },
    image: image
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    k.drawImage(playerImagem,
        0,
        0,
        playerImagem.width/4,
        playerImagem.height,
        canvas.width /2 -  playerImagem.width / 4 , 
        canvas.height / 2 - playerImagem.height / 2,
        playerImagem.width / 4,
        playerImagem.height)

      if(keys.w.pressed && lastKey === 'w') background.position.y += 5
      else if(keys.a.pressed && lastKey === 'a') background.position.x += 5
      else if(keys.s.pressed && lastKey === 's') background.position.y -= 5
      else if(keys.d.pressed && lastKey === 'd') background.position.x -= 5
      
      
}
animate()

let lastKey = ''

window.addEventListener('keydown' , (e) => {
    switch(e.key){
        case 'w':
           keys.w.pressed = true
           lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break         
    }
})

window.addEventListener('keyup' , (e) => {
    switch(e.key){
        case 'w':
           keys.w.pressed = false
           console.log("nao está sendo pressionado")
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break         
    }
})





