import {
  createApp,
  ref,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

// Page actuelle en string. Utilisé dans les v-if
const page = ref("accueil");

// Informations utilisés par la page actuelle
const page_infos = ref(null);

const musiques = ref([]);
const recherche_texte = ref("");
const musique_selectionner = ref(null);
const balise_audio = ref(null);
const depart_minuteur = ref(null);
const duree_musique = ref(null);
const volume = ref(0.5);

fetch("data/chansons.json").then((resp) => {
  resp.json().then((contenu_json) => {
    musiques.value = contenu_json;
  });
});

/**
 * Change de page vers `nouvelle_page`.
 * Possibilité de passer un deuxième paramètre pour transférer de l'info à la nouvelle page
 * @param {string} nouvelle_page
 * @param {any} nouvelle_info
 */
function changerPage(nouvelle_page, nouvelle_info = null) {
  page.value = nouvelle_page;
  page_infos.value = nouvelle_info;
}

// function play(e) {
//     video_tag.value.play()
// }

// function load(e) {
//     temps_total.value = video_tag.value.duration
// }

function filtrerMusiques(musique) {
  // recherche par texte
  let recherche = recherche_texte.value;

  let texte = musique.titre;
  texte += " " + musique.artiste;
  texte = texte.toLowerCase();

  if (texte.indexOf(recherche) == -1) {
    return false;
  }

  // Si on est rendu ici sans faire de return false, tout est OK
  return true;
}

function chargementMusique() {
  depart_minuteur.value = balise_audio.value.currentTime;
  duree_musique.value = balise_audio.value.duration;
}

function play() {
  balise_audio.value.play();
}

function stop() {
  balise_audio.value.pause();
}

function musiqueParId(id) {
  for (let musique of musiques.value) {
    if (musique.id == id) {
      return musique;
    }
  }
}

function conversionMinute(temps) {
  let minutes = Math.floor(temps / 60);
  let secondes = Math.floor(temps - minutes * 60);

  if (secondes < 10) {
    return minutes + ":" + 0 + secondes;
  }
  return minutes + ":" + secondes;
}

function selectionnerMusique(musique) {
  musique_selectionner.value = musique;
}

function diminuer_volume() {
  if (balise_audio.value.volume >= 0.1) {
    balise_audio.value.volume -= 0.1;
  }
}
function augmenter_volume() {
  if (balise_audio.value.volume <= 1) {
    balise_audio.value.volume += 0.1;
  }
}

const root = {
  setup() {
    return {
      page,
      page_infos,
      musiques,
      recherche_texte,
      musique_selectionner,
      duree_musique,
      depart_minuteur,
      balise_audio,
      volume,

      changerPage,
      play,
      stop,
      filtrerMusiques,
      musiqueParId,
      selectionnerMusique,
      conversionMinute,
      chargementMusique,
      augmenter_volume,
      diminuer_volume,
    };
  },
};

createApp(root).mount("#app");
