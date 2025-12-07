# NutriRecherche

NutriRecherche est une application composée de deux parties : un front-end en Node.js et un back-end en Scala. Ce projet permet d’explorer et de rechercher des informations nutritionnelles à partir des données OpenFoodFacts.

## Prérequis

Avant de commencer, assurez-vous d’avoir installé :

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (version 16 ou supérieure recommandée)
* [npm](https://www.npmjs.com/) (généralement inclus avec Node.js)
* [Scala](https://www.scala-lang.org/) et [sbt](https://www.scala-sbt.org/) pour le back-end

## Installation et lancement

### 1. Cloner le dépôt

```bash
git clone https://github.com/Yamnyr/NutriRecherche.git
cd NutriRecherche
```

### 2. Lancer le front-end

```bash
cd openfoodfacts-front
npm install
npm run dev
```

Le front-end sera disponible à l’adresse [http://localhost:3000](http://localhost:3000) par défaut.

### 3. Lancer le back-end

Ouvrez un autre terminal et naviguez vers le projet Scala :

```bash
cd scala-3-project-template
sbt clean update compile
sbt run
```

Le back-end sera démarré et pourra communiquer avec le front-end.

## Structure du projet

```
NutriRecherche/
├─ openfoodfacts-front/   # Front-end Node.js / React
└─ scala-3-project-template/  # Back-end Scala / SBT
```

## Contribuer

Les contributions sont les bienvenues !
Merci de créer une branche pour vos modifications et de soumettre un pull request.

## License

Ce projet est sous licence MIT.
