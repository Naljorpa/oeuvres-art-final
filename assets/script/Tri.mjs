export default class Tri {

    // //Source d'inspiration pour la stratégie suivante: https://bobbyhadz.com/blog/javascript-sort-array-with-null-last

    // /**
    //  * Méthode de tri par ordre ascendant et descendant sur le titre et le nom de famille du premier artiste de l'oeuvre. Les valeurs null sont renvoyées à la fin
    //  * @param {*} data 
    //  * @param {*} typeTri 
    //  * @param {*} elTri 
    //  * @returns 
    //  */

    // tri(data, typeTri, elTri) {
    //     let tabOrdonne;
    //     if (elTri == "asc") {
    //         if (typeTri == "titre") {
    //             tabOrdonne = data.sort((a, b) => {
    //                 if (a.Titre === null) { return 1; }
    //                 if (b.Titre === null) { return -1; }
    //                 if (a.Titre === b.Titre) { return 0; }
    //                 return a.Titre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") > b.Titre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") ? 1 : -1;
    //             });
    //         }
    //         if (typeTri == "artiste") {
    //             tabOrdonne = data.sort((a, b) => {
    //                 if (a.Artistes[0].Nom === null) { return 1; }
    //                 if (b.Artistes[0].Nom === null) { return -1; }
    //                 if (a.Artistes[0].Nom === b.Artistes[0].Nom) { return 0; }
    //                 return a.Artistes[0].Nom.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") > b.Artistes[0].Nom.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") ? 1 : -1;
    //             });
    //         }
    //     }
    //     if (elTri == "desc") {
    //         if (typeTri == "titre") {
    //             tabOrdonne = data.sort((a, b) => {
    //                 if (a.Titre === null) { return 1; }
    //                 if (b.Titre === null) { return -1; }
    //                 if (a.Titre === b.Titre) { return 0; }
    //                 return a.Titre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") < b.Titre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") ? 1 : -1;
    //             });
    //         }
    //         if (typeTri == "artiste") {
    //             tabOrdonne = data.sort((a, b) => {
    //                 if (a.Artistes[0].Nom === null) { return 1; }
    //                 if (b.Artistes[0].Nom === null) { return -1; }
    //                 if (a.Artistes[0].Nom === b.Artistes[0].Nom) { return 0; }
    //                 return a.Artistes[0].Nom.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") < b.Artistes[0].Nom.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") ? 1 : -1;
    //             });
    //         }
    //     }

    //     return tabOrdonne;
    // }
}