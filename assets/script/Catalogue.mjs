export default class Catalogue {

  #URL = "/assets/data/oeuvresdonneesouvertes.json";

  constructor() {

  }

  async listerOeuvres(params) {

    let resultat;
    let response = await fetch(this.#URL);
    resultat = await response.json();

    // if (params.cb) {

    //   params.cb(resultat);

    // }

    return resultat;

  }

  async listerUneOeuvre(params, id) {

    let resultat;
    id = id || "";
    let response = await fetch(this.#URL);
    resultat = await response.json();

    if (params.cb) {

      params.cb(resultat);

    }

    return resultat;

  }

}
