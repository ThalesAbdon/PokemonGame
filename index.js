const canvas = document.querySelector('canvas')
const k = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
k.fillStyle = 'white';
k.fillRect(0,0,canvas.width,canvas.height)

const image = new Image()
image.src = './MAPA/mapTeste.png'


image.onload = () => {
    k.drawImage(image,-650,-450)
}