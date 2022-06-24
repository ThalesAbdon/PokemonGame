const canvas = document.querySelector('canvas')
const k = canvas.getContext('2d')
console.log(battleZonesDados)

canvas.width = 1024
canvas.height = 576

const collisionsMap = []
for ( let i = 0; i < collisions.length; i += 60){
    collisionsMap.push(collisions.slice(i,60 + i)) 
}

const battleZoneMap = []
for ( let i = 0; i < battleZonesDados.length; i += 60){
    battleZoneMap.push(battleZonesDados.slice(i,60 + i)) 
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

const battleZones = []

battleZoneMap.forEach( (row,auxHeight) =>{
    row.forEach( (symbol,auxWidth) => {
        if(symbol ===  7986)
        battleZones.push(new Fronteira({position: {
            x: auxWidth * Fronteira.width + offset.x,
            y: auxHeight * Fronteira.height + offset.y

        }}))
    })
})

console.log(battleZones)

const image = new Image()
image.src = './IMG/map.png'

const playerDownImagem = new Image()
playerDownImagem.src = './IMG/PlayerDown.png' 

const playerUpImagem = new Image()
playerUpImagem.src = './IMG/PlayerTop.png' 

const playerLeftImagem = new Image()
playerLeftImagem.src = './IMG/PlayerEsquerda.png' 

const playerRightImagem = new Image()
playerRightImagem.src = './IMG/PlayerDireita.png' 

const player = new Sprite({
    position:{
        x: canvas.width /2 -  128 /4 /2  -105, 
        y:canvas.height / 2 - 128 / 2 
    },
    image:playerDownImagem,
    frames: {
        max:4
    },
    sprites:{
        up: playerUpImagem,
        left: playerLeftImagem,
        right: playerRightImagem,
        down: playerDownImagem
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




const movimentos = [background,...fronteiras, ...battleZones]

function boxCollider({box1, box2}){
    return(
       box1.position.x + box1.width >= (box2.position.x + 32) && 
       box1.position.x <= (box2.position.x - 32) + box2.width &&
       box1.position.y <= (box2.position.y - 32) + box2.height &&
       box1.position.y + box1.height >= (box2.position.y + 16)
    )
}


function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    fronteiras.forEach(fronteira => {
        fronteira.draw()

        if(
            boxCollider({
                box1: player,
                box2: fronteira
            })
        ){
            console.log("Colidindo!")
        }
    })

    battleZones.forEach((battleZone) =>{
        battleZone.draw()
    })
    player.draw()

    if(keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed){
        for ( let i = 0; i < battleZones.length; i++){
            const battleZone = battleZones[i]
            const overTouchArea = 
                (Math.min(
                    player.position.x + player.width,
                    battleZone.position.x + battleZone.width
                )- 
                Math.max(player.position.x, battleZone.position.x)) *
 
                 (Math.min(
                    player.position.y + player.height,
                    battleZone.position.y + battleZone.height
                 ) -
                  Math.max(player.position.y, battleZone.position.y))               
          if(
              boxCollider({
                  box1: player,
                  box2: battleZone
              }) && 
              overTouchArea > (player.width * player.height) / 4 &&
              Math.random() < 0.05
          ){
              console.log("ZONA DE BATALHA!")
              break
          }
        }

    }


      let movimentando = true;
      player.movimentando = false;
      if(keys.w.pressed && lastKey === 'w') {
        player.movimentando = true;
        player.image = player.sprites.up

          for ( let i = 0; i < fronteiras.length; i++){
              const fronteira = fronteiras[i]
            if(
                boxCollider({
                    box1: player,
                    box2: {...fronteira,position: {
                        x: fronteira.position.x,
                        y: fronteira.position.y + 5
                    }}
                })
            ){
                movimentando = false
                break
            }
          }


          
          if(movimentando)
          movimentos.forEach(movimento => {
              movimento.position.y += 5
          })
    }
      else if(keys.a.pressed && lastKey === 'a') {
        player.movimentando = true;
        player.image = player.sprites.left
        for ( let i = 0; i < fronteiras.length; i++){
            const fronteira = fronteiras[i]
          if(
              boxCollider({
                  box1: player,
                  box2: {...fronteira,position: {
                      x: fronteira.position.x + 5,
                      y: fronteira.position.y 
                  }}
              })
          ){
              console.log("Colidindo!")
              movimentando = false
              break
          }
        }
        
        if(movimentando)
        movimentos.forEach(movimento => {
            movimento.position.x += 5
        })
        }
      else if(keys.s.pressed && lastKey === 's') {
        player.movimentando = true;
        player.image = player.sprites.down
        for ( let i = 0; i < fronteiras.length; i++){
            const fronteira = fronteiras[i]
          if(
              boxCollider({
                  box1: player,
                  box2: {...fronteira,position: {
                      x: fronteira.position.x,
                      y: fronteira.position.y - 5 
                  }}
              })
          ){
              console.log("Colidindo!")
              movimentando = false
              break
          }
        }
        
        if(movimentando)
        movimentos.forEach(movimento => {
            movimento.position.y -= 5
        })
        }
      else if(keys.d.pressed && lastKey === 'd') {
        player.movimentando = true;
        player.image = player.sprites.right
        for ( let i = 0; i < fronteiras.length; i++){
            const fronteira = fronteiras[i]
          if(
              boxCollider({
                  box1: player,
                  box2: {...fronteira,position: {
                      x: fronteira.position.x - 5,
                      y: fronteira.position.y 
                  }}
              })
          ){
              console.log("Colidindaaaa!")
              movimentando = false
              break
          }
        }
        
        if(movimentando)
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





