var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Variables pour la manipulation de DOM
var startBtn = document.getElementById("startBtn");
var player1 = document.getElementById("player1");
var player2 = document.getElementById("player2");
var span = document.getElementById("span");
var body = document.body;
// const selectStage: HTMLElement | null = document.getElementById("stageChoice");
var selectStage = document.querySelectorAll(".selectStageMoment");
// document.querySelector(".selectStageMoment");
var selectStageId = document.getElementById("stageChoice");
var screenHeight = window.innerHeight;
var screenWidth = window.innerWidth;
var stage = document.getElementById("stage");
var numberOfStage = Math.floor(Math.random() * 5) + 1;
console.log(selectStageId);
if ((startBtn === null || startBtn === void 0 ? void 0 : startBtn.className) !== "startBtnGetOut") {
    selectStage === null || selectStage === void 0 ? void 0 : selectStage.forEach(function (stageselect) {
        stageselect.addEventListener("click", function (e) {
            var target = e.target;
            if (e.target instanceof HTMLImageElement) {
                console.log(e.target.id);
                if (stage && e.target.id === "stage1") {
                    stage.src = e.target.src;
                }
                if (stage && e.target.id === "stage2") {
                    stage.src = e.target.src;
                }
                if (stage && e.target.id === "stage3") {
                    stage.src = e.target.src;
                }
                if (stage && e.target.id === "stage4") {
                    stage.src = e.target.src;
                }
                if (stage && e.target.id === "stage5") {
                    stage.src = e.target.src;
                }
            }
        });
    });
}
// ____________________________________________________________
/* Ajustement dynamique des éléments en fonction de
la taille ecran de l'utilisateur */
body.style.width = "".concat(screenWidth, "px");
body.style.height = "".concat(screenHeight, "px");
if (stage) {
    stage.style.height = "".concat(screenHeight, "px");
    stage.style.width = "".concat(screenWidth, "px");
}
if (span) {
    span.style.left = "".concat(screenWidth / 2 - 150, "px");
}
if (startBtn) {
    startBtn.style.left = "".concat(screenWidth / 2 - 100, "px");
}
if (selectStageId) {
    selectStageId.style.left = "".concat(screenWidth / 2 - 300, "px");
}
// -------------------------------------
// Variables pour les Intervales des animations
var intervalSmoke;
var intervalSmoke2;
var intervalPlayer1Moved;
var intervalPlayer2Moved;
var intervalPlayer1Attack;
var intervalPlayer2Attack;
var intervalPlayer1Death;
// Varaibles pour les compteurs des intervales
var i = 1;
var iattack = 1;
var i2 = 1;
var j = 1;
var k = 1;
var l = 1;
// --------------------------------------------
// Class principales "Hero" et "Weapon"
var Hero = /** @class */ (function () {
    function Hero(name, power, life) {
        this.name = name;
        this.power = power;
        this.life = life;
    }
    Hero.prototype.attack = function (opponent) {
        var dammage = this.power;
        opponent.life = opponent.life - this.power;
        console.log("".concat(this.name, " \u00E0 attaqu\u00E9 ").concat(opponent.name, " de ").concat(this.power, " points. Il reste ").concat(opponent.life, " pts de vie \u00E0 ").concat(opponent.name));
        if (opponent.life <= 0) {
            console.log("".concat(opponent.name, " viens de succomb\u00E9"));
        }
        return opponent.life;
    };
    // Differents Get pour recuperer toutes les propriétées si besoin
    Hero.prototype.getLife = function () {
        return this.life;
    };
    Hero.prototype.getName = function () {
        return this.name;
    };
    Hero.prototype.getPower = function () {
        return this.power;
    };
    // Set pour ajuster la vie en fonction du combat
    Hero.prototype.setLife = function (value) {
        this.life = value;
    };
    Hero.prototype.isAlive = function () {
        if (this.life <= 0) {
            console.log("".concat(this.name, " viens de succomber !"));
            return false;
        }
        else {
            return true;
        }
    };
    return Hero;
}());
var Weapon = /** @class */ (function () {
    function Weapon(name, dammage) {
        this.name = name;
        this.dammage = dammage;
    }
    return Weapon;
}());
// -------------------------------------------
// Les 3 class filles
var HeroAxe = /** @class */ (function (_super) {
    __extends(HeroAxe, _super);
    function HeroAxe(name, power, life) {
        var _this = _super.call(this, name, power, life) || this;
        _this.weapon = new Weapon("Axe", 10);
        return _this;
    }
    HeroAxe.prototype.attack = function (opponent) {
        // Choix de otus mettre dans des varibles pour une meilleurs visibilité
        var opponentlife = opponent.getLife();
        var opponentName = opponent.getName();
        var power = this.getPower();
        var dammage = this.weapon.dammage;
        // -----------------------------------------------
        if (opponent instanceof HeroSword) {
            power = power + dammage * 2;
        }
        opponent.setLife(opponentlife - power);
        console.log("".concat(this.getName(), " \u00E0 attaquer ").concat(opponentName, " de ").concat(power));
    };
    return HeroAxe;
}(Hero));
var HeroSword = /** @class */ (function (_super) {
    __extends(HeroSword, _super);
    function HeroSword(name, power, life) {
        var _this = _super.call(this, name, power, life) || this;
        _this.weapon = new Weapon("Sword", 10);
        return _this;
    }
    HeroSword.prototype.attack = function (opponent) {
        var opponentlife = opponent.getLife();
        var opponentName = opponent.getName();
        var power = this.getPower();
        var dammage = this.weapon.dammage;
        if (opponent instanceof HeroSpear) {
            power = power + dammage * 2;
        }
        opponent.setLife(opponentlife - power);
        console.log("".concat(this.getName(), " \u00E0 attaquer ").concat(opponentName, " de ").concat(power));
    };
    return HeroSword;
}(Hero));
var HeroSpear = /** @class */ (function (_super) {
    __extends(HeroSpear, _super);
    function HeroSpear(name, power, life) {
        var _this = _super.call(this, name, power, life) || this;
        _this.weapon = new Weapon("Spear", 10);
        return _this;
    }
    HeroSpear.prototype.attack = function (opponent) {
        var opponentlife = opponent.getLife();
        var opponentName = opponent.getName();
        var power = this.getPower();
        var dammage = this.weapon.dammage;
        if (opponent instanceof HeroAxe) {
            power = power + dammage * 2;
        }
        opponent.setLife(opponentlife - power);
        console.log("".concat(this.getName(), " \u00E0 attaquer ").concat(opponentName, " de ").concat(power));
    };
    return HeroSpear;
}(Hero));
// --------------------------------------------
// Creation de mes 3 Heros
var babou = new HeroAxe("babou", 10, 2000);
var arthur = new HeroSword("Arthur", 10, 200);
var lancelot = new HeroSpear("lancelot", 30, 150);
// ----------------------------------------------
// Differentes fonctions pour les animations sur le DOM
function playerMoved() {
    intervalSmoke = setInterval(function () {
        if (player1) {
            player1.src = "/src/Assets/Smoke/Smoke VFX B".concat(i, ".png");
            i++;
            if (i === 11) {
                clearInterval(intervalSmoke);
                i = 1;
            }
        }
    }, 100);
    if (player1) {
        setTimeout(function () {
            intervalPlayer1Moved = setInterval(function () {
                player1.src = "/src/Assets/PlayerSword/Static/Static".concat(i, ".png");
                i++;
                if (i === 11) {
                    i = 1;
                }
            }, 100);
        }, 1000);
    }
}
function player1Attack() {
    intervalPlayer1Attack = setInterval(function () {
        if (player1) {
            player1.src = "/src/Assets/PlayerSword/Attack/Attack".concat(iattack, ".png");
            iattack++;
            if (iattack === 8) {
                clearInterval(intervalPlayer1Attack);
                iattack = 1;
            }
        }
    }, 100);
}
function player2Attack() {
    intervalPlayer2Attack = setInterval(function () {
        if (player2) {
            player2.src = "/src/Assets/Player2/attack/CharAttack".concat(i2, ".png");
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
    intervalPlayer1Death = setInterval(function () {
        if (player1) {
            player1.src = "/src/Assets/PlayerSword/Death/Death".concat(i, ".png");
            i++;
            if (i === 11) {
                clearInterval(intervalPlayer1Death);
                i = 1;
            }
        }
    }, 100);
}
function playerMoved2() {
    intervalSmoke2 = setInterval(function () {
        if (player2) {
            player2.src = "/src/Assets/Player2/smoke2/Smoke VFX B".concat(l, " (1).png");
            l++;
            if (l === 11) {
                clearInterval(intervalSmoke2);
                l = 1;
            }
        }
    }, 100);
    if (player2) {
        setTimeout(function () {
            intervalPlayer2Moved = setInterval(function () {
                player2.src = "/src/Assets/Player2/moved/Char".concat(l, ".png");
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
function fight(fighter1, fighter2) {
    // Animation de debut de combat
    playerMoved();
    playerMoved2();
    // ---------------------------
    // SetTimeOut pour laisser le temps à nos Heros de faire leurs animations
    setTimeout(function () {
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
            }
            else if (!fighter1.isAlive()) {
                // Lancement des animations attack pour les 2 joueurs
                player1Attack();
                player2Attack();
                // --------------------------------------------------
                // SettimeOut pour laisse les temps aux animations
                setTimeout(function () {
                    player1Death();
                }, 700);
                // SettimeOut pour laisse les temps aux animations
                setTimeout(function () {
                    if (span)
                        span.textContent = "".concat(fighter2
                            .getName()
                            .toUpperCase(), " \u00E0 LARGEMENT dominer ce combat !");
                }, 1000);
                console.log("".concat(fighter2.getName(), " \u00E0 dominer ce combat !"));
            }
            else if (!fighter2.isAlive()) {
                console.log("".concat(fighter1.getName(), " \u00E0 dominer ce combat !"));
            }
        }
    }, 3500);
}
// Ecouteur d'evenement pour lance le combat et les differentes animations
startBtn === null || startBtn === void 0 ? void 0 : startBtn.addEventListener("click", function (e) {
    selectStageId === null || selectStageId === void 0 ? void 0 : selectStageId.classList.remove("stageChoice");
    selectStageId === null || selectStageId === void 0 ? void 0 : selectStageId.classList.add("stageChoiceIsGetOut");
    if (startBtn) {
        startBtn.style.left = "-90rem";
    }
    fight(lancelot, babou);
});
// -----------------------------------------------------
