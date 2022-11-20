export default class Catalogue {

  #URL = "/assets/data/oeuvresdonneesouvertes.json";

  constructor() {

  }

  async listerOeuvres() {

    let resultat;
    let response = await fetch(this.#URL);
    resultat = await response.json();
    return resultat;

  }

  async listerUneOeuvre(id) {

    let resultat;
    id = id || "";
    let response = await fetch(this.#URL);
    resultat = await response.json();

    return resultat;

  }

}
