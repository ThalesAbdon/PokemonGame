const monsters = {
  Charmeleon: {
    position: {
      x: 180,
      y: 220,
    },
    image: {
      src: "./IMG/charmeleon.png",
    },
    frames: {
      max: 76,
      hold: 8,
    },
    animate: true,
    name: "Charmeleon",
    attacks: [attacks.Tackle, attacks.Fireball],
  },
  Lapras: {
    position: {
      x: 600,
      y: 175,
    },
    image: {
      src: "./IMG/lapras.png",
    },
    frames: {
      max: 33,
      hold: 5,
    },
    animate: true,
    isEnemy: true,
    name: "Lapras",
    attacks: [attacks.Tackle, attacks.Iceball],
  },
};
