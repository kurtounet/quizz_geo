// # Version 1
//firstLetter.normalize("NFD").replace(/[\u0300-\u036f]/g, "") => retire les accents d'un string (ici firstLetter)
// ## Fonctionnalités

// - Montrez les images une par une.
// - Le joueur doit saisir une réponse, tenter de la valider.
// - Si la réponse est bonne, il gagne 10 points et passe au pays suivant.
// - Il ne perds pas de point s’il se trompe, mais ne peux pas faire plus de 3 tentatives
// - Il peut demander 1 seul indice par image, mais il ne doit gagner que 5 points s’il trouve.
// - Ajoutez 20 pays/indices au total
// - Une fois la partie terminée, faites disparaître les images et le formulaire, faites apparaître le score final en gros au milieu de la page, ainsi qu’un bouton “Recommencer” qui relancera le jeu.

// ## Layout (disposition) de la page

// Pour la construction de la page, vous êtes libre de choisir ce qui vous convient. La seule demande est de réserver une partie de la page pour le score total en cours. Il peut avoir un score maximum de 200 points. Par exemple, vous pouvez présenter les images, indices et formulaire dans les 2/3 à gauche, et réserver le 1/3 restant à droite pour l’affichage du score total, le nombre d’image déjà passées, etc. (les infos globales du jeu).

// - Montrez les images une par une.
// formulaire
// compteur de tentatives
// bouton pour demander un indice
// ajouter 10 point si c'est bon, et 5 si indice
document.addEventListener("DOMContentLoaded", () => {
  const country = [
    { indice: "Tour Eiffel", pays: "France" },
    { indice: "Mur de Berlin", pays: "Allemagne" },
    { indice: "Sagrada Familia", pays: "Espagne" },
    { indice: "Taj Mahal", pays: "Inde" },
    /*
    { indice: "Colisée", pays: "Italie" },
    { indice: "Big Ben", pays: "Royaume-Uni" },
    { indice: "Feuille d'érable", pays: "Canada" },
    { indice: "Statue de la Liberté", pays: "États-Unis" },
    { indice: "Opéra de Sydney", pays: "Australie" },
    { indice: "Mont Fuji", pays: "Japon" },
    { indice: "Grande Muraille", pays: "Chine" },

    { indice: "Christ Rédempteur", pays: "Brésil" },
    { indice: "Chichen Itza", pays: "Mexique" },
    { indice: "Kremlin", pays: "Russie" },
    { indice: "Montagne de la Table", pays: "Afrique du Sud" },
    { indice: "Pyramides de Gizeh", pays: "Égypte" },
    { indice: "Petra", pays: "Jordanie" },
    { indice: "Maison de l'Opéra", pays: "Danemark" },
    { indice: "Aurores Boréales", pays: "Norvège" },
    { indice: "Burj Khalifa", pays: "Émirats Arabes Unis" },*/
  ];
  /* CONSTANTS */
  const MAIN_IMAGE = document.getElementById("mainImage");
  const SCORE = document.getElementById("score");
  const BOUTTON_SUBMIT = document.getElementById("boutonSubmit");
  const RESPONCE = document.getElementById("responce");
  const DEMANDE_INDICE = document.getElementById("demandeIndice");
  const INDICE = document.getElementById("indice");
  const ERROR = document.getElementById("error");
  const END_GAME = document.getElementById("endGame");
  // const  form = document.getElementById("monFormulaire");
  /* VARIALBLES */
  let erreur = 3;
  let score = 0;
  let index = 0;
  let url = "../endgame.html";
  let isIndice = false;
  console.log("START");
  console.log("é".toUpperCase());

  if (localStorage.hasOwnProperty("score")) {
    localStorage.removeItem("score");
  }
  /* FUNCTIONS */
  function addPoints() {
    if (isIndice) {
      score = score + 5;
      isIndice = false;
    } else {
      score = score + 10;
    }
    console.log(score);
  }
  function displayMessage() {
    END_GAME.innerText = "Bravo, vous avez gagnez " + score + " points";
  }
  function toPage() {
    localStorage.setItem("score", score);
    window.location.href = url;
  }
  function demanderIndice() {
    INDICE.innerText = country[index].indice;
    console.log(country[index].indice);
    isIndice = true;
  }
  function afficherScore() {
    SCORE.innerText = score;
  }
  function videLesChamp() {
    RESPONCE.value = "";
    INDICE.innerText = "";
    ERROR.innerText = "";
  }
  function displayImage() {
    MAIN_IMAGE.src = "assets/" + country[index].pays.toLowerCase() + ".jpg";
  }

  function verification() {
    if (index <= country.length - 3) {
      if (RESPONCE.value.toLowerCase() === country[index].pays.toLowerCase()) {
        index++;
        addPoints();
        displayImage();
        videLesChamp();
      } else {
        erreur--;
        ERROR.innerText =
          "Mauvaise réponse, il vous reste " + erreur + " tentatives";
        if (erreur === 0) {
          index++;
          erreur = 3;
          displayImage();
          videLesChamp();
        }
      }
      afficherScore();
    } else {
      toPage();
    }
  }
  /***********EVENTSLISTENERS*********/
  BOUTTON_SUBMIT.addEventListener("click", verification);
  DEMANDE_INDICE.addEventListener("click", demanderIndice);
  // BOUTTON_SUBMIT.addEventListener("click", validation);
});
