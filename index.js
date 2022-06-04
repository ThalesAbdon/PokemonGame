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

image.onload = () => {
    k.drawImage(image,-650,-450)
    k.drawImage(playerImagem,
        0,
        0,
        playerImagem.width/4,
        playerImagem.height,
        canvas.width /2 -  playerImagem.width / 4 , 
        canvas.height / 2 - playerImagem.height / 2,
        playerImagem.width / 4,
        playerImagem.height)
}



