class Sprite {
    constructor({position,image,frames = {max : 1, hold: 10}, sprites, animate = false, isEnemy = false}){
        this.position = position
        this.image = image
        this.frames = {...frames, value: 0, elapsed: 0}
        
        this.image.onload = () =>{
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
            console.log(this.width)
            console.log(this.height)
        }
        this.animate = animate;
        this.sprites = sprites
        this.opacity = 1
        this.health = 100
        this.isEnemy = isEnemy
    }

    draw(){
        k.save()
        k.globalAlpha = this.opacity
        k.drawImage(
            this.image,
            this.frames.value *  this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height)
        k.restore()
            if(!this.animate) return
            if(this.frames.max > 1){
                this.frames.elapsed++
            }

            if(this.frames.elapsed % this.frames.hold === 0){

            if(this.frames.value < this.frames.max -1){
               this.frames.value++;
            }else{
                this.frames.value = 0
            }
        }
        }
    attack({attack,atacado}){
        const timeline = gsap.timeline()
        this.health -= attack.damage
        
        let distanciaDoImpacto = 20
        if(this.isEnemy) distanciaDoImpacto = -20

        let barraDeVida = '#barraDeVidaInimiga'
        if(this.isEnemy) barraDeVida ='#barraDeVidaPlayer'

         timeline.to(this.position, {
            x: this.position.x - distanciaDoImpacto
         }).to(this.position, {
            x: this.position.x + distanciaDoImpacto * 2.5 ,
            duration: 0.1,
            OnComplete: () => {
            gsap.to(barraDeVida, {
                width: this.health + '%'

            })
            gsap.to(atacado.position, {
                x: atacado.position.x + distanciaDoImpacto,
                y: atacado.position.y - 5,
                yoyo: true,
                repeat: 1,
                duration: 0.13
            })
            gsap.to(atacado, {
                opacity: 0,
                repeat: 1,
                yoyo: true,
                duration: 0.11
            })
            }
         }).to(this.position, {
            x: this.position.x
         })
    }    
}

class Fronteira {
    static width = 88
    static height = 88
    constructor({position}){
       this.position = position 
       this.width = 87.9
       this.height = 87.9
    }

    draw(){
        k.fillStyle = 'rgba(255,0,0,0.1)'
        k.fillRect(this.position.x, this.position.y, this.width,this.height)
    }
}
