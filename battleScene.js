const battleBackgroundImage = new Image();
battleBackgroundImage.src = "./IMG/battleBackgrounds.png";
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: battleBackgroundImage,
});

const laprasImage = new Image();
laprasImage.src = "./IMG/lapras.png";
const lapras = new Sprite({
  position: {
    x: 600,
    y: 175,
  },
  image: laprasImage,
  frames: {
    max: 33,
    hold: 5,
  },
  animate: true,
  isEnemy: true,
  name: "Lapras",
});

const charmeleonImage = new Image();
charmeleonImage.src = "./IMG/charmeleon.png";
const charmeleon = new Sprite({
  position: {
    x: 180,
    y: 220,
  },
  image: charmeleonImage,
  frames: {
    max: 76,
    hold: 8,
  },
  animate: true,
  name: "Charmeleon",
});

const renderedSprites = [];
function animateBattle() {
  window.requestAnimationFrame(animateBattle);
  battleBackground.draw();
  lapras.draw();
  charmeleon.draw();
  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
}

animateBattle();
const queue = [];
//ativar botões de ataque
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const selectedSkill = attacks[e.currentTarget.innerHTML];
    charmeleon.attack({
      attack: selectedSkill,
      atacado: lapras,
      renderedSprites,
    });
    queue.push(() => {
      lapras.attack({
        attack: attacks.Tackle,
        atacado: charmeleon,
        renderedSprites,
      });
    });
  });
});

document.querySelector("#battleLog").addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else e.currentTarget.style.display = "none";
});
