# Consignes

Tu vas devoir trouver les informations suivantes et les tester au fur et à mesure dans ton programme pour expérimenter et comprendre comment TypeScript pourra t'aider à écrire ton meilleur code !

## Level 1

- Quels sont les différents type primitives de données en TypeScript ?

  -String "Pour les chaines de caractères"
  -Number "Pour les numeros"
  -Booleen "Pour true ou false"
  -Void "Pour des retour qui ne renvoie rien"
  -Any "Pour n'importe quel type" "A EVITER AU MAX"
  -Unknown "Pour les variables dont le types est inconnus lors de la programmation"
  -Null "Pour les valeurs qui sont null" "NULL est un type à part entiere"

  -Voici les principaux type premitifs en Typescript. Mais il en reste d'autres (symbol, never...)

- Comment typer un tableau ?

  Pour typer un tableau...
  -let array1:string []
  -let array2: Array<String>

- Quel est le type `any` ?

  -Comme expliquer ci-dessus, ce typage dit a Typescript que la variable (par exemple) peut etre de n'importe quel type. En gros, on desactive le typage sur cette variable. Ceci peut etre utile dans certains cas. mais c'est à éviter au maximun. Car on perd alors tous les avantages que Typescript peut nous offrir.

- Comment typer le retour d'une fonction ainsi que le type de ses paramètres ?

  -function Add(x:number, y:number)
  Ici, nous avons typer nos arguments
  -():number
  Là on type le retour de notre fonction

  function Add(x:number, y:number):number {
  return x+y
  }

**🎉🎉🎉Mettre à jour le tableau Github Project🎉🎉🎉**

## Level 2

- Qu'est ce qu'une classe ?

  -Une class est un moyen d'encapsuler plusieurs variables (de plusieurs types) et fonction. Un peu comme un model d'objet.

  -Ex...
  class Hero {
  name: string;
  power: string

  presentation(){
  console.log(`Hero: ${name} avec le poouvoir ${power}`)
  }
  }

- Qu'est ce qu'un constructeur de classe ?

  -Le constructor utilisé en POO (programmation orienté objet), est une methode speciale d'une class. Qui serviera quand nous crerons une nouvelle instance de cette class (nous allons voir ça juste après).

  -Continuons notre exemple...
  class Hero {
  name: string;
  power: string

      constructor(nom: string, power: string) {
        this.nom = nom
        this.power = power
      }

  presentation(){
  console.log(`Hero: ${name} avec le poouvoir ${power}`)
  }
  }

  Le constructor permet d'initialiser les variables de la class

- Qu'est ce qu'une instance de classe ?

  -Une nouvelle instance de Hero va etre un nouvelle objet creer à partir de notre class Hero. Elle aura les meme propriétés et fonction que notre class mère.

  -Ex....
  let superman = new Hero('Superman', 'Force surhumaine')
  let batman = new Hero('Batman', 'Compte en banque Infinie')

- Comment vérifier qu'une classe est d'une certaine instance ?

  -instanceof permet cela.
  console.log(superman instanceof Hero) nous renverra true
  console.log(superman instanceof car) nous renverra false

- Qu'est ce que `this` dans une classe ?

  -Dans le constructor, this.name = name signifie "prendre l'argument name et l'assigner à la propriété name de l'objet en cours de création".
  Dans le contexte d'une méthode de classe, il se réfère généralement à l'instance de la classe sur laquelle la méthode est appelée.
  this.name = "Superman"

- Qu'est ce qu'une méthode de classe ?

  -C'est une fonction qui est à l'interieur d'une class.
  Pour notre exemple,

  presentation(){
  console.log(`Hero: ${name} avec le poouvoir ${power}`)}
  est une methode de notre class Hero.
  Ici, notre methode fait la presentation de notre hero.

  superman.presentation()
  Hero: superman avec le pouvoir force surhumaine

- Qu'est ce que la visibilité des propriétés ?

  -La visibilité des propriétés détermine où ces propriétés ou méthodes peuvent être accessibles dans notre code. Il y a trois niveaux de visibilité :
  -public
  -private
  -protected

  -private est la visibilité par defaut. Visible de partout dans notre code. A l'interieur ou à l'exterieur de notre class

  -private, la visibilité ne peut être accessible qu'à l'intérieur de la classe où elle est définie.

  -protected est similair à private. Une propriété ou une méthode protected peut être accessible non seulement dans la classe où elle est définie, mais aussi dans toutes les classes qui en héritent

**🎉🎉🎉Mettre à jour le tableau Github Project🎉🎉🎉**

## Level 3

- Comment faire pour diviser notre programme en différents fichiers ? (ex: une classe dans un fichier que j'importe dans un autre)

  -Avec un systeme de module. On peut définir une classe dans un fichier et l'exporter à l'aide du mot-clé "export". Reprenons notre class Hero...

  export class Hero {
  name: string;
  power: string;

      constructor(name: string, power: string) {
          this.name = name;
          this.power = power;
      }

      displayHero() {
          console.log(`Héros: ${this.name}, Pouvoir: ${this.power}`);
      }

  }

  Ici, nous exportons notre class Hero.
  On peut ensuite l'importer dans un autre fichier.

  -import { Hero } from './chemin de notre fichier comportant la class Hero'

- Qu'est ce que l'héritage ?

  -C'est une nouvelle class qui heritera des propriétés d'une autre class deja existante.

  Reprenons notre class Hero, nous allons creer une nouvelle class SuperHero qui heritera de la class Hero;

  class SuperHero extends Hero {
  secretIdentity: string;

      constructor(name: string, power: string, secretIdentity: string) {
          super(name, power) "qui fait reference au 'name' 'power' de la class Hero
          this.secretIdentity = secretIdentity;
      }

      revealIdentity() {
          console.log(`Je suis ${this.name}, mais quand je ne suis pas en costume, je suis ${this.secretIdentity}`);
      }

  }

  Maintenant, une instance de SuperHero peut utiliser toutes les propriétés et méthodes de Hero, ainsi que la nouvelle propriété et méthode que nous avons ajoutées à SuperHero.

- Comment appeler le constructeur d'une classe mère ?

  -Avec le mot-clé "super". Ceci est généralement fait à l'intérieur du constructeur de la classe fille.

  -Ex...
  class SuperHero extends Hero {
  SuperPower: string;

      constructor(name: string, power: string) {
          super(name, power) "C'est ici que nous appellons le constructor de la class mere 'Hero'
          this.SuperPower = SuperPower;
      }

  }

- Comment appeler une méthode d'une classe mère ?

  -Avec le mot clef "this"
  -Ex...

  class SuperHero extends Hero {
  SecretIdentity: string;

      constructor(name: string, power: string) {
          super(name, power) "C'est ici que nous appellons le constructor de la class mere 'Hero'
          this.SecretIdentity = SecretIdentity;
      }
      superPresentation(){
        console.log(`mon identité secrete est ${
        this.secretIdentity
      } et ${this.presentation()}`) "ici on fait appel a la methode de la class mère"
      }

  }

- Qu'est ce que le polymorphism ?

  -le polymorphisme permet de traiter différents objets de manière similaire en utilisant une classe de base commune.

  -Ex...

  class animal....

  constructor.....

  son(){
  console.log(`l'animal fait un son`)
  }

  class chat extends animal....

  constructor....

  son(){
  console.log(`le chat miaule`)
  }

  class chien extends animal

  constructor....

  son(){
  console.log(`le chien aboie`)
  }

  -Nous avons creer 2 nouvelles class qui sont des sous-class de la class animal. Ces 3 class on la meme methode (son()). Mais cette methode aura un comportement diferrent en fonction de la class (animal, chat ou chien)

**🎉🎉🎉Mettre à jour le tableau Github Project🎉🎉🎉**

## Boss level

Met en pratique le fruit de tes recherches à travers cet exercice en binôme !

### Partie 1 : Héros

La classe `Hero` permet de créer des objets possédant les propriétés suivantes :

    name : string
    power : number
    life : number

​Et les méthodes

    attack(opponent: Hero)
    isAlive()

​La méthode `attack` a un paramètre `opponent` (de type `Hero`). Il faut réduire le nombre (`life`) de `opponent` d'autant de dégats (`power`) de l'attaquant.

​
_Exemple : Si Joan attaque Leon, cela sera représenté par :_

    joan.attack(leon)

​La méthode `isAlive` devrait retourner `true` si le nombre de points de vie du héros est supérieur à zéro et `false` sinon.

Crée deux instances de `Hero` et vérifie que les méthodes `attack` et `isAlive` fonctionnent.

**Contrainte à ajouter** : il faut maintenant faire en sorte que les propriétés `name`, `power`, `life` soient privées. Tu vas devoir créer des méthodes permettant d'accéder à leur valeur et de modifier leur valeur.

### Partie 2 : Armes

​
Crée une classe `Weapon` avec la propriété suivante :

    name : string

Ajoute l'attribut `weapon` (de type `Weapon`) à la classe `Hero` sans modifier le constructeur (ainsi `weapon` n'est pas initialisé).

Crée trois classes `HeroAxe`, `HeroSword` et `HeroSpear` qui héritent de `Hero`.

Ces trois classes appellent le constructeur de leur parent et initialisent `weapon` avec des instances de la classe `Weapon` dont les noms seront `axe`, `sword` ou `spear` selon le cas.

Dans les classes `HeroAxe`, `HeroSword` et `HeroSpear`, redéfinisse la méthode `attack` pour prendre en compte les cas suivants :

- `HeroAxe` : si le type de `opponent` est `HeroSword`, multiplier `power` par deux
- `HeroSword` : si le type de `opponent` est `HeroSpear`, multiplier `power` par deux
- `HeroSpear` : si le type de `opponent` est `HeroAxe`, multiplier `power` par deux

​
Astuce : utilise le mot-clé `super` pour appeler la méthode `attack` de la classe parente.

Crée des instances des trois classes `HeroAxe`, `HeroSword` et `HeroSpear` et vérifie que leurs méthodes `attack` fonctionnent correctement.
​

### Partie 3 : Bataille

Crée une boucle qui fait que deux instances de sous-classes `Hero` s'affrontent (elles attaquent en même temps).

Quand au moins l'une d'entre elles est morte, afficher `{heroName} wins`. Si les deux sont morts, afficher `It's a draw`.

**🎉🎉🎉Mettre à jour le tableau Github Project🎉🎉🎉**

---

**_Bonus 1 : Les dégâts de l'arme_**

_Ajoute une propriété `damage` à la classe `Weapon` et fait en sorte qu'elle soit initialisée par le constructeur._

_Modifie la méthode `attack` de `Hero` afin que les dégâts soient calculés de la façon suivante : la puissance du héro `power` + les dégâts de l'arme `power`_

**_Bonus 2 : Interface graphique_**

_Réalise une interface graphique pour l'application (par exemple, avec un choix de héros et d'armes, et un visuel sur les dégâts infligés)_
