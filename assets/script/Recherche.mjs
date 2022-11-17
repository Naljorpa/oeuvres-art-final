export default class Recherche {

    #aData;

    constructor(data, dataRecherche) {
        this.#aData = data;

        /*Cette méthode de recherche couvre toute la banque de données des oeuvres en ignorant la case et les accents */

        dataRecherche = dataRecherche.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        let aOeuvresRecherche = [];

        this.#aData.forEach(oeuvre => {
            Object.values(oeuvre).forEach(val => {
                if (typeof (val) == "number") {
                    let newVal = val.toString();
                    if (newVal.includes(dataRecherche)) {
                        aOeuvresRecherche.push(oeuvre);
                    }
                }
                else if (Array.isArray(val)) {
                    if (typeof (val) == "object") {
                        val.forEach(element => {
                            Object.values(element).forEach(val => {
                                if (typeof (val) == "number") {
                                    let newVal = val.toString();
                                    if (newVal.includes(dataRecherche)) {
                                        aOeuvresRecherche.push(oeuvre);
                                    }
                                }
                                if (typeof (val) == "string") {
                                    let newVal = val.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");;
                                    if (newVal.includes(dataRecherche)) {
                                        aOeuvresRecherche.push(oeuvre);
                                    }
                                }
                            })
                        })
                    } else {
                        let newVal = val.implode().toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");;
                        if (newVal.includes(dataRecherche)) {
                            aOeuvresRecherche.push(oeuvre);
                        }
                    }
                }
                else if (typeof (val) == "string") {
                    if (val.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(dataRecherche)) {
                        aOeuvresRecherche.push(oeuvre);
                    }
                }
            })
        });

        /*Source du code suivant: https://bobbyhadz.com/blog/javascript-remove-duplicates-from-array-of-objects */
        const objectsUnique = [];

        const aOeuvresRechercheUnique = aOeuvresRecherche.filter(element => {
            const estCopie = objectsUnique.includes(element.NoInterne);

            if (!estCopie) {
                objectsUnique.push(element.NoInterne);

                return true;
            }
            return false;
        });

        return aOeuvresRechercheUnique;
    }




}