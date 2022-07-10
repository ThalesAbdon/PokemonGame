class Sprite {
    constructor({position,image,frames = {max : 1, hold: 10}, sprites, animate = false}){
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
    }

    draw(){
       
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
        k.fillStyle = 'rgba(255,0,0,0.2'
        k.fillRect(this.position.x, this.position.y, this.width,this.height)
    }
}
