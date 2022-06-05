const canvas = document.querySelector('canvas')
const k = canvas.getContext('2d')



canvas.width = 1024
canvas.height = 576

const collisionsMap = []

for ( let i = 0; i < collisions.length; i += 60){
    collisionsMap.push(collisions.slice(i,60 + i)) 
}

class Fronteira {
    static width = 87.9
    static height = 87.2
    constructor({position}){
       this.position = position 
       this.width = 87.9
       this.height = 87.2
    }

    draw(){
        k.fillStyle = 'blue'
        k.fillRect(this.position.x, this.position.y, this.width,this.height)
    }
}

const fronteiras = []
const offset = {
    x: -650,
    y: -450
}


collisionsMap.forEach( (row,auxHeight) =>{
    row.forEach( (symbol,auxWidth) => {
        if(symbol ===  7985)
        fronteiras.push(new Fronteira({position: {
            x: auxWidth * Fronteira.width + offset.x,
            y: auxHeight * Fronteira.height + offset.y

        }}))
    })
})


const image = new Image()
image.src = './IMG/map.png'

const playerImagem = new Image()
playerImagem.src = './IMG/playerDown.png' 

class Sprite {
    constructor({position,velocity,image,frames = {max : 1}}){
        this.position = position
        this.image = image
        this.frames = frames
        
        this.image.onload = () =>{
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
            console.log(this.width)
            console.log(this.height)
        }

    }

    draw(){
       
        k.drawImage(
            this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height)
    }
}

const player = new Sprite({
    position:{
        x: canvas.width /2 -  128 /4 /2  -105, 
        y:canvas.height / 2 - 128 / 2 
    },
    image:playerImagem,
    frames: {
        max:4
    }
})


const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
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

const testFronteira = new Fronteira({
    position:{
        x: 400,
        y: 400
    }
})



const movimentos = [background, testFronteira]
function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    // fronteiras.forEach(fronteira => {
    //     fronteira.draw()
    // })
    testFronteira.draw()
    player.draw()

    if(player.position.x + player.width >= testFronteira.position.x && 
       player.position.x <= testFronteira.position.x + testFronteira.width &&
       player.position.y <= testFronteira.position.y + testFronteira.height &&
       player.position.y + player.height >= testFronteira.position.y){
        console.log("Colidindo!")
    }

      


      if(keys.w.pressed && lastKey === 'w') {
          movimentos.forEach(movimento => {
              movimento.position.y += 5
          })
    }
      else if(keys.a.pressed && lastKey === 'a') {
        movimentos.forEach(movimento => {
            movimento.position.x += 5
        })
        }
      else if(keys.s.pressed && lastKey === 's') {
        movimentos.forEach(movimento => {
            movimento.position.y -= 5
        })
        }
      else if(keys.d.pressed && lastKey === 'd') {
        movimentos.forEach(movimento => {
            movimento.position.x -= 5
        })
        }
      
      
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





