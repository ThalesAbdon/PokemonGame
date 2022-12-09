let musicActivated = true;
class Sprite {
  constructor({
    position,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
  }) {
    this.position = position;
    this.image = new Image();
    this.frames = { ...frames, value: 0, elapsed: 0 };
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.image.src = image.src;
    this.animate = animate;
    this.sprites = sprites;
    this.opacity = 1;
    this.rotation = rotation;
  }

  draw() {
    k.save();
    k.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );
    k.rotate(this.rotation);
    k.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    );
    k.globalAlpha = this.opacity;
    k.drawImage(
      this.image,
      this.frames.value * this.width,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    );
    k.restore();
    if (!this.animate) return;
    if (this.frames.max > 1) {
      this.frames.elapsed++;
    }

    if (this.frames.elapsed % this.frames.hold === 0) {
      if (this.frames.value < this.frames.max - 1) {
        this.frames.value++;
      } else {
        this.frames.value = 0;
      }
    }
  }
}

class Monster extends Sprite {
  constructor({
    position,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    isEnemy = false,
    name,
    attacks,
  }) {
    super({
      position,
      image,
      frames,
      sprites,
      animate,
      rotation,
    });
    this.health = 100;
    this.isEnemy = isEnemy;
    this.name = name;
    this.attacks = attacks;
  }

  faint() {
    document.querySelector("#battleLog").innerHTML = this.name + " Fainted!";
    gsap.to(this.position, {
      y: this.position.y + 1,
    });
    gsap.to(this, {
      opacity: 0,
    });
    audio.battle.stop();
    audio.victory.play();
  }

  attack({ attack, atacado, renderedSprites }) {
    document.querySelector("#battleLog").style.display = "block";
    document.querySelector("#battleLog").innerHTML =
      this.name + " used " + attack.name;

    let barraDeVida = "#barraDeVidaInimiga";
    if (this.isEnemy) barraDeVida = "#barraDeVidaPlayer";

    let rotation = 1;
    if (this.isEnemy) rotation = -2.4;

    atacado.health -= attack.damage;

    switch (attack.name) {
      case "Tackle":
        const timeline = gsap.timeline();

        let distanciaDoImpacto = 20;
        if (this.isEnemy) distanciaDoImpacto = -20;

        timeline
          .to(this.position, {
            x: this.position.x - distanciaDoImpacto,
          })
          .to(this.position, {
            x: this.position.x + distanciaDoImpacto * 2.5,
            duration: 0.1,
            OnComplete: () => {
              audio.tackleHit.play();
              gsap.to(barraDeVida, {
                width: atacado.health + "%",
              });
              gsap.to(atacado.position, {
                x: atacado.position.x + distanciaDoImpacto,
                y: atacado.position.y - 5,
                yoyo: true,
                repeat: 1,
                duration: 0.13,
              });
              gsap.to(atacado, {
                opacity: 0,
                repeat: 1,
                yoyo: true,
                duration: 0.11,
              });
            },
          })
          .to(this.position, {
            x: this.position.x,
          });
        break;

      case "Fireball":
        audio.initFireball.play();
        const fireballImage = new Image();
        fireballImage.src = "./IMG/fireball.png";
        const fireball = new Sprite({
          position: {
            x: this.position.x + 200,
            y: this.position.y + 90,
          },

          image: fireballImage,
          frames: {
            max: 4,
            hold: 10,
          },
          animate: true,
          rotation: this.rotation,
        });
        renderedSprites.push(fireball);
        gsap.to(fireball.position, {
          x: atacado.position.x,
          y: atacado.position.y,
          duration: 0.4,
          onComplete: () => {
            audio.fireballHit.play();
            gsap.to(barraDeVida, {
              width: atacado.health + "%",
            });

            gsap.to(atacado, {
              opacity: 0,
              repeat: 1,
              yoyo: true,
              duration: 0.11,
            });

            renderedSprites.pop();
          },
        });
        break;
      case "Iceball":
        audio.initIceball.play();
        const iceballImage = new Image();
        iceballImage.src = "./IMG/iceball.png";
        const iceball = new Sprite({
          position: {
            x: this.position.x + 50,
            y: this.position.y + 90,
          },

          image: iceballImage,
          frames: {
            max: 4,
            hold: 10,
          },
          animate: true,
          rotation: this.rotation,
        });
        renderedSprites.push(iceball);
        gsap.to(iceball.position, {
          x: atacado.position.x + 120,
          y: atacado.position.y + 50,
          duration: 0.6,
          onComplete: () => {
            audio.iceballHit.play();
            gsap.to(barraDeVida, {
              width: atacado.health + "%",
            });

            gsap.to(atacado, {
              opacity: 0,
              repeat: 1,
              yoyo: true,
              duration: 0.15,
            });

            renderedSprites.pop();
          },
        });
        break;
    }
  }
}

class Fronteira {
  static width = 88;
  static height = 88;
  constructor({ position }) {
    this.position = position;
    this.width = 87.9;
    this.height = 87.9;
  }

  draw() {
    k.fillStyle = "rgba(255,0,0,0.1)";
    k.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
