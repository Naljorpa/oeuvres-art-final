export default class Catalogue {

  #URL = "/assets/data/oeuvresdonneesouvertes.json";

  constructor() {

  }

  /**
   * Fetch et retourne la liste des oeuvres du json
   * @returns 
   */
  async listerOeuvres() {

    let resultat;
    let response = await fetch(this.#URL);
    resultat = await response.json();
    return resultat;

  }

 /**
  * Fetch et retourne un oeuvre du json grace a sont id
  * @param {String} id 
  * @returns 
  */
  async listerUneOeuvre(id) {

    let resultat;
    id = id || "";
    let response = await fetch(this.#URL);
    resultat = await response.json();

    return resultat;

  }

}
