export default class Filtre {

    #aData;

    constructor(domParent) {
        this.domParent = domParent;
    }

    /**
     * Applique les filtres sur le tableau de des oeuvres
     * @param {array} data -le tableau des oeuvres
     * @param {object} oCatFiltre -objet avec sa categorie et valeur
     * @param {string} applique - string de la zone ou appliqué la mention du filtre appliqué
     * @returns 
     */

    appliquerFiltre(data, oCatFiltre, applique) {

        applique.innerHTML = `<strong>Filtre appliqué: </strong>` + oCatFiltre.valeur;
        const aOeuvresFiltre = data.filter((oeuvre) => {
            return (oeuvre[oCatFiltre.categorie] == oCatFiltre.valeur);
        });
        return aOeuvresFiltre;
    }

    /**
     * Établit les catégorie à rechercher dans le tableau
     * @param {array} data 
     */
    setCat(data) {

        this.#aData = [];

        /* Set la categorie de filtre par type */

        let valeurFiltre = [];
        let valEtEtiquette = [];

        data.forEach((oeuvre) => {
            valeurFiltre.push(oeuvre.SousCategorieObjet);
        })
        valeurFiltre = [...new Set(valeurFiltre)];
        valeurFiltre.forEach((element) =>
            valEtEtiquette.push(
                {
                    categorie: "SousCategorieObjet",
                    valeur: element,
                    etiquette: element
                }
            )
        );

        this.#aData.push(valEtEtiquette);

        /* Set la categorie de filtre par arrondissement */

        valeurFiltre = [];
        valEtEtiquette = [];

        data.forEach((oeuvre) => {
            valeurFiltre.push(oeuvre.Arrondissement);
        })
        valeurFiltre = [...new Set(valeurFiltre)];
        valeurFiltre.forEach((element) =>
            valEtEtiquette.push(
                {
                    categorie: "Arrondissement",
                    valeur: element,
                    etiquette: element
                }
            )
        );

        this.#aData.push(valEtEtiquette);

        return this.#aData;
    }

  
}