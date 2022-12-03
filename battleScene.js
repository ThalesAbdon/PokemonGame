const battleBackgroundImage = new Image();
battleBackgroundImage.src = "./IMG/battleBackgrounds.png";
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: battleBackgroundImage,
});

let lapras;
let charmeleon;
let renderedSprites;
let battleAnimationId;
let queue;

function initBattle() {
  document.querySelector("#userInterface").style.display = "block";
  document.querySelector("#battleLog").style.display = "none";
  document.querySelector("#barraDeVidaInimiga").style.width = "100%";
  document.querySelector("#barraDeVidaPlayer").style.width = "100%";
  document.querySelector("#attacksBox").replaceChildren();

  lapras = new Monster(monsters.Lapras);
  charmeleon = new Monster(monsters.Charmeleon);
  renderedSprites = [lapras, charmeleon];
  queue = [];

  charmeleon.attacks.forEach((attack) => {
    const button = document.createElement("button");
    button.innerHTML = attack.name;
    document.querySelector("#attacksBox").append(button);
  });

  //ativar botões de ataque
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const selectedSkill = attacks[e.currentTarget.innerHTML];
      charmeleon.attack({
        attack: selectedSkill,
        atacado: lapras,
        renderedSprites,
      });

      if (lapras.health <= 0) {
        queue.push(() => {
          lapras.faint();
        });

        queue.push(() => {
          //fade back to black
          gsap.to("#overlappingDiv", {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(battleAnimationId);
              animate();
              document.querySelector("#userInterface").style.display = "none";
              gsap.to("#overlappingDiv", {
                opacity: 0,
              });
              battle.started = false;
              audio.Map.play();
            },
          });
        });
      }

      // Enemy attacks
      const randomAttack =
        lapras.attacks[Math.floor(Math.random() * lapras.attacks.length)];
      queue.push(() => {
        lapras.attack({
          attack: randomAttack,
          atacado: charmeleon,
          renderedSprites,
        });

        if (charmeleon.health <= 0) {
          queue.push(() => {
            charmeleon.faint();
          });
          queue.push(() => {
            //fade back to black
            gsap.to("#overlappingDiv", {
              opacity: 1,
              onComplete: () => {
                cancelAnimationFrame(battleAnimationId);
                animate();
                document.querySelector("#userInterface").style.display = "none";
                gsap.to("#overlappingDiv", {
                  opacity: 0,
                });
                battle.started = false;
                audio.Map.play();
              },
            });
          });
        }
      });
    });
    button.addEventListener("mouseenter", (e) => {
      const attackType = attacks[e.currentTarget.innerHTML];
      document.querySelector("#attackType").innerHTML = attackType.type;
      document.querySelector("#attackType").style.color = attackType.color;
    });
    button.addEventListener("mouseleave", (e) => {
      const attackType = attacks[e.currentTarget.innerHTML];
      document.querySelector("#attackType").innerHTML = "";
    });
  });
}

function animateBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle);
  battleBackground.draw();
  console.log(battleAnimationId);
  lapras.draw();
  charmeleon.draw();
  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
}
animate();

document.querySelector("#battleLog").addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else e.currentTarget.style.display = "none";
});
