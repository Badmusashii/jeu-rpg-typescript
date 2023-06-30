// Variables pour la manipulation de DOM
const startBtn: HTMLElement | null = document.getElementById("startBtn");
const player1: HTMLImageElement | null = document.getElementById(
  "player1"
) as HTMLImageElement;
const player2: HTMLImageElement | null = document.getElementById(
  "player2"
) as HTMLImageElement;
let span: HTMLElement | null = document.getElementById("span");
const body: HTMLElement = document.body;
let screenHeight: number = window.innerHeight;
let screenWidth: number = window.innerWidth;
let stage: HTMLImageElement | null = document.getElementById(
  "stage"
) as HTMLImageElement;
// ____________________________________________________________

/* Ajustement dynamique des éléments en fonction de 
la taille ecran de l'utilisateur */
body.style.width = `${screenWidth}px`;
body.style.height = `${screenHeight}px`;
if (stage) {
  stage.style.height = `${screenHeight}px`;
  stage.style.width = `${screenWidth}px`;
}
if (span) {
  span.style.left = `${screenWidth / 2 - 150}px`;
}
if (startBtn) {
  startBtn.style.left = `${screenWidth / 2 - 100}px`;
}
// -------------------------------------

// Variables pour les Intervales des animations
let intervalSmoke: NodeJS.Timeout;
let intervalSmoke2: NodeJS.Timeout;
let intervalPlayer1Moved: NodeJS.Timeout;
let intervalPlayer2Moved: NodeJS.Timeout;
let intervalPlayer1Attack: NodeJS.Timeout;
let intervalPlayer2Attack: NodeJS.Timeout;
let intervalPlayer1Death: NodeJS.Timeout;
// Varaibles pour les compteurs des intervales
let i: number = 1;
let iattack: number = 1;
let i2: number = 1;
let j: number = 1;
let k: number = 1;
let l: number = 1;
// --------------------------------------------

// Class principales "Hero" et "Weapon"
class Hero {
  private name: string;
  private power: number;
  private life: number;
  public weapon?: Weapon;

  constructor(name: string, power: number, life: number) {
    this.name = name;
    this.power = power;
    this.life = life;
  }

  attack(opponent: Hero): number | void {
    let dammage: number = this.power;
    opponent.life = opponent.life - this.power;
    console.log(
      `${this.name} à attaqué ${opponent.name} de ${this.power} points. Il reste ${opponent.life} pts de vie à ${opponent.name}`
    );
    if (opponent.life <= 0) {
      console.log(`${opponent.name} viens de succombé`);
    }
    return opponent.life;
  }
  // Differents Get pour recuperer toutes les propriétées si besoin
  getLife(): number {
    return this.life;
  }
  getName(): string {
    return this.name;
  }
  getPower(): number {
    return this.power;
  }

  // Set pour ajuster la vie en fonction du combat
  setLife(value: number): void {
    this.life = value;
  }

  isAlive(): boolean {
    if (this.life <= 0) {
      console.log(`${this.name} viens de succomber !`);
      return false;
    } else {
      return true;
    }
  }
}
class Weapon {
  name: string;
  dammage: number;

  constructor(name: string, dammage: number) {
    this.name = name;
    this.dammage = dammage;
  }
}
// -------------------------------------------

// Les 3 class filles
class HeroAxe extends Hero {
  constructor(name: string, power: number, life: number) {
    super(name, power, life);
    this.weapon = new Weapon("Axe", 10);
  }
  attack(opponent: Hero): number | void {
    // Choix de otus mettre dans des varibles pour une meilleurs visibilité
    let opponentlife: number = opponent.getLife();
    let opponentName: string = opponent.getName();
    let power: number = this.getPower();
    let dammage: number = this.weapon!.dammage;
    // -----------------------------------------------

    if (opponent instanceof HeroSword) {
      power = power + dammage * 2;
    }
    opponent.setLife(opponentlife - power);
    console.log(`${this.getName()} à attaquer ${opponentName} de ${power}`);
  }
}
class HeroSword extends Hero {
  constructor(name: string, power: number, life: number) {
    super(name, power, life);
    this.weapon = new Weapon("Sword", 10);
  }
  attack(opponent: Hero): number | void {
    let opponentlife: number = opponent.getLife();
    let opponentName: string = opponent.getName();
    let power: number = this.getPower();
    let dammage: number = this.weapon!.dammage;

    if (opponent instanceof HeroSpear) {
      power = power + dammage * 2;
    }
    opponent.setLife(opponentlife - power);

    console.log(`${this.getName()} à attaquer ${opponentName} de ${power}`);
  }
}
class HeroSpear extends Hero {
  constructor(name: string, power: number, life: number) {
    super(name, power, life);
    this.weapon = new Weapon("Spear", 10);
  }
  attack(opponent: Hero): number | void {
    let opponentlife: number = opponent.getLife();
    let opponentName: string = opponent.getName();
    let power: number = this.getPower();
    let dammage: number = this.weapon!.dammage;

    if (opponent instanceof HeroAxe) {
      power = power + dammage * 2;
    }
    opponent.setLife(opponentlife - power);

    console.log(`${this.getName()} à attaquer ${opponentName} de ${power}`);
  }
}
// --------------------------------------------

// Creation de mes 3 Heros
let babou = new HeroAxe("babou", 10, 2000);
let arthur = new HeroSword("Arthur", 10, 200);
let lancelot = new HeroSpear("lancelot", 30, 150);
// ----------------------------------------------

// Differentes fonctions pour les animations sur le DOM
function playerMoved() {
  intervalSmoke = setInterval(() => {
    if (player1) {
      player1.src = `/src/Assets/Smoke/Smoke VFX B${i}.png`;
      i++;
      if (i === 11) {
        clearInterval(intervalSmoke);
        i = 1;
      }
    }
  }, 100);
  if (player1) {
    setTimeout(() => {
      intervalPlayer1Moved = setInterval(() => {
        player1.src = `/src/Assets/PlayerSword/Static/Static${i}.png`;
        i++;
        if (i === 11) {
          i = 1;
        }
      }, 100);
    }, 1000);
  }
}
function player1Attack() {
  intervalPlayer1Attack = setInterval(() => {
    if (player1) {
      player1.src = `/src/Assets/PlayerSword/Attack/Attack${iattack}.png`;
      iattack++;
      if (iattack === 8) {
        clearInterval(intervalPlayer1Attack);
        iattack = 1;
      }
    }
  }, 100);
}
function player2Attack() {
  intervalPlayer2Attack = setInterval(() => {
    if (player2) {
      player2.src = `/src/Assets/Player2/attack/CharAttack${i2}.png`;
      console.log("A2");
      i2++;
      if (i2 === 8) {
        clearInterval(intervalPlayer2Attack);
        i2 = 1;
      }
    }
  }, 100);
}
function player1Death() {
  intervalPlayer1Death = setInterval(() => {
    if (player1) {
      player1.src = `/src/Assets/PlayerSword/Death/Death${i}.png`;
      i++;
      if (i === 11) {
        clearInterval(intervalPlayer1Death);
        i = 1;
      }
    }
  }, 100);
}
function playerMoved2() {
  intervalSmoke2 = setInterval(() => {
    if (player2) {
      player2.src = `/src/Assets/Player2/smoke2/Smoke VFX B${l} (1).png`;
      l++;
      if (l === 11) {
        clearInterval(intervalSmoke2);
        l = 1;
      }
    }
  }, 100);
  if (player2) {
    setTimeout(() => {
      intervalPlayer2Moved = setInterval(() => {
        player2.src = `/src/Assets/Player2/moved/Char${l}.png`;
        l++;
        if (l === 10) {
          l = 1;
        }
      }, 100);
    }, 1000);
  }
}
// -----------------------------------------------------

// Fonction pour les combat avec les differenes animations incluses
function fight(fighter1: Hero, fighter2: Hero) {
  // Animation de debut de combat
  playerMoved();
  playerMoved2();
  // ---------------------------

  // SetTimeOut pour laisser le temps à nos Heros de faire leurs animations
  setTimeout(() => {
    while (fighter1.isAlive() === true && fighter2.isAlive() === true) {
      /* Arret des 1ers animations. Remise de "i" et "l" à 1 
       pour assurer le bon fonctionnement des prochaines animations */
      clearInterval(intervalPlayer1Moved);
      i = 1;
      fighter1.attack(fighter2);
      clearInterval(intervalPlayer2Moved);
      l = 1;
      fighter2.attack(fighter1);

      // Lancement des conditions pour les differentes possibilité du combat
      if (!fighter1.isAlive() && !fighter2.isAlive()) {
        console.log("Exequo");
      } else if (!fighter1.isAlive()) {
        // Lancement des animations attack pour les 2 joueurs
        player1Attack();
        player2Attack();
        // --------------------------------------------------

        // SettimeOut pour laisse les temps aux animations
        setTimeout(() => {
          player1Death();
        }, 700);
        // SettimeOut pour laisse les temps aux animations
        setTimeout(() => {
          if (span)
            span.textContent = `${fighter2.getName()} à LARGEMENT dominer ce combat !`;
        }, 1000);
        console.log(`${fighter2.getName()} à dominer ce combat !`);
      } else if (!fighter2.isAlive()) {
        console.log(`${fighter1.getName()} à dominer ce combat !`);
      }
    }
  }, 3500);
}

// Ecouteur d'evenement pour lance le combat et les differentes animations
startBtn?.addEventListener("click", (e) => {
  // startBtn.classList.add("startBtnGetOut");
  if (startBtn) {
    startBtn.style.left = "-90rem";
  }
  fight(lancelot, babou);
});
// -----------------------------------------------------
