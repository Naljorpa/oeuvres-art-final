
import Affichage from "./Affichage.mjs";
import Routeur from "./Routeur.mjs";
import Catalogue from "./Catalogue.mjs";
import Filtre from "./Filtre.mjs";
import Recherche from "./Recherche.mjs";
import Tri from "./Tri.mjs";

export default class Application {

    #aData;

    constructor() {
        this.oCatalogue = new Catalogue();
        this.routeur = new Routeur();

        this.routeur.ajouterRoute("liste", this.routeListe.bind(this));
        //this.routeur.ajouterRoute("recherche", this.routeListe.bind(this));
        // //this.routeur.ajouterRoute("detail", this.routeDetail.bind(this));

        // this.routeur.ajouterRoute("", () => {
        //     console.log("accueil");
        //     this.routeur.naviguer("liste", true);
        // });

        this.routeur.demarrer();

        document.querySelector(".btn-rechercher").addEventListener("click", () => {
            const recherche = document.querySelector("[name='champs-rechercher']").value;
            console.log(this.routeur.getInfoRoute())
            let infoRoute = this.routeur.getInfoRoute();
            this.routeur.naviguer(infoRoute.route + "?recherche=" + recherche);
        })
    }


    async routeListe(paramRequete) {
        
        console.log(paramRequete);
        let parametre = paramRequete.parametre;
        let aRoute = paramRequete.route;
        console.log(parametre);
        console.log(aRoute);



        const params = {
            // ressource: "",
            cb: this.afficherOeuvres.bind(this)
        };

        let data = await this.oCatalogue.listerOeuvres(params);

        console.log(data);

        if (parametre.recherche) {
            console.log(data);
           
            let valeur;

            data = data.filter((element) => {
                let chaineArtiste;
                if (element.Artistes.length > 1) {
                    element.Artistes.forEach(element => {
                        chaineArtiste +=  element.Prenom + " " + element.Nom ;
                        if (element.NomCollectif !== null) {
                            chaineArtiste += element.NomCollectif;
                        }
    
                    });
                } else {
                    element.Artistes.forEach(element => {
                        chaineArtiste += element.Prenom + " " + element.Nom;
                        if (element.NomCollectif !== null) {
                            chaineArtiste += element.NomCollectif;
                        }
                    });
                }

                valeur = element.Titre + " " + chaineArtiste + " " + element.Arrondissement + " " + element.Technique + " " + element.SousCategorieObjet;
                console.log(valeur);
                return valeur.toLowerCase().includes(parametre.recherche.toLowerCase());
            });

            this.afficherOeuvres(data);
        }
    }

    afficherOeuvres(data) {

        const listeOeuvres = [];
        let gabarit = document.querySelector("#tmpl-carte-film");
        if (data) {
            this.#aData = data;
        }

        data.forEach(element => {


            /*Formate la date de fin de production et d'accession pour nous donner l'annee de production */
            let dateFinProd;
            if (typeof (element.DateFinProduction) == "string") {
                let date = new Date(parseInt(element.DateFinProduction.substring(6)));
                dateFinProd = date.getFullYear().toString();
            } else {
                dateFinProd = "non disponible";
            }

            /*Formate une variable chaine de caracteres nous fournissant les informations des createurs de l'oeuvre*/

            let chaineArtiste = "<p><strong>Artiste(s):</strong></p>";

            if (element.Artistes.length > 1) {
                element.Artistes.forEach(element => {
                    chaineArtiste += "<p>" + element.Prenom + " " + element.Nom + "<p>";
                    if (element.NomCollectif !== null) {
                        chaineArtiste += element.NomCollectif;
                    }

                });
            } else {
                element.Artistes.forEach(element => {
                    chaineArtiste += "<p>" + element.Prenom + " " + element.Nom + "<p>";
                    if (element.NomCollectif !== null) {
                        chaineArtiste += "<p><strong>Collectif: </strong>" + element.NomCollectif + "</p>";
                    }
                });
            }

            listeOeuvres.push({
                Titre: element.Titre,
                DateFinProduction: dateFinProd,
                Artistes: chaineArtiste,
                Arrondissement: element.Arrondissement,
                SousCategorieObjet: element.SousCategorieObjet,
                Technique: element.Technique
            })
        })

        let domCatalogue = document.querySelector(".catalogue");
        domCatalogue.innerHTML = "";
        let html = Affichage.afficher(gabarit, listeOeuvres);
        document.querySelector(".catalogue").innerHTML = html;
    }



    // this.#aData = oeuvres;
    // const noeudCatalogue = document.querySelector(".catalogue");
    // const noeudFiltre = document.querySelector(".liste-categorie");
    // const noeudTri = document.querySelector(".tri");
    // const applique = document.querySelector(".applique");

    // const btnRafraichir = document.querySelector(".rafraichir");

    // const btnGrille = document.querySelector(".btnGrille");
    // const btnListe = document.querySelector(".btnListe");

    // const inputRecherche = document.querySelector(".input-recherche");
    // const btnRechercher = document.querySelector(".btn-rechercher");

    // const oCatalogue = new Catalogue(noeudCatalogue);
    // const oFiltre = new Filtre(noeudFiltre);
    // const oTri = new Tri();

    // oCatalogue.setOeuvres(this.#aData);
    // oCatalogue.rendu();
    // oCatalogue.gestionDuModal();

    // oFiltre.setCat(this.#aData);
    // oFiltre.rendu();

    // /*Écoute le clic sur le bouton rechercher et effectue l'operation de recherche */

    // btnRechercher.addEventListener("click", () => {
    //     const oRecherche = new Recherche(this.#aData, inputRecherche.value);
    //     oCatalogue.setOeuvres(oRecherche);
    //     oCatalogue.rendu();
    //     oCatalogue.gestionDuModal();
    // });

    // /*Écoute le clic sur le bouton rechercher et effectue l'operation de tri */

    // noeudTri.addEventListener("click", (e) => {
    //     let cible = e.target;
    //     let typeTri = noeudTri.querySelector('input[name="tri"]:checked');

    //     if (cible.classList.contains("asc") && typeTri !== null) {
    //         const asc = "asc";
    //         const tri = typeTri.value;
    //         const tabTrie = oTri.tri(this.#aData, tri, asc);
    //         oCatalogue.setOeuvres(tabTrie);
    //         oCatalogue.rendu();
    //         oCatalogue.gestionDuModal();
    //     }
    //     if (cible.classList.contains("desc") && typeTri !== null) {
    //         const desc = "desc";
    //         const tri = typeTri.value;
    //         const tabTrie = oTri.tri(this.#aData, tri, desc);
    //         oCatalogue.setOeuvres(tabTrie);
    //         oCatalogue.rendu();
    //         oCatalogue.gestionDuModal();
    //     }

    // });


    // /*Écoute le clic sur les boutons de display en liste et en grille et affiche le tout selon la sélection*/

    // btnListe.addEventListener("click", () => {
    //     if (noeudCatalogue.classList.contains("catalogue-grille")) {
    //         noeudCatalogue.classList.replace("catalogue-grille", "catalogue-liste");
    //     }

    // });

    // btnGrille.addEventListener("click", () => {
    //     if (noeudCatalogue.classList.contains("catalogue-liste")) {
    //         noeudCatalogue.classList.replace("catalogue-liste", "catalogue-grille");
    //     }
    // });


    // /*Écoute le clic sur les filtres et retourne une nouvelle set de donnée filtrée*/

    // noeudFiltre.addEventListener("click", (e) => {
    //     let cible = e.target;
    //     if(cible.dataset.jsActif == "0"){
    //         let elActif = noeudFiltre.querySelector("[data-js-actif='1']");
    //         if(elActif){
    //             elActif.dataset.jsActif="0";
    //         }

    //         cible.dataset.jsActif="1";
    //     }

    //     if (cible.classList.contains("choixFiltre")) {
    //         const dataFiltre = {
    //             cat: cible.dataset.jsCat,
    //             valeur: cible.dataset.jsCatValeur
    //         };
    //         const aOeuvresFiltre = oFiltre.appliquerFiltre(this.#aData, dataFiltre, applique);
    //         oCatalogue.setOeuvres(aOeuvresFiltre);
    //         oCatalogue.rendu();
    //         oCatalogue.gestionDuModal();
    //     }
    // });

    // btnRafraichir.addEventListener("click", function () {
    //     console.log("click");
    //     location.reload();
    // })
    // }
}