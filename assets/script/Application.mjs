
import Affichage from "./Affichage.mjs";
import Routeur from "./Routeur.mjs";
import Catalogue from "./Catalogue.mjs";
import Filtre from "./Filtre.mjs";
import Tri from "./Tri.mjs";
import PaysEtatsVille from "./Countries-states-cities.mjs";

export default class Application {

    #aData;

    constructor() {

        const noeudCatalogue = document.querySelector(".catalogue");
        const noeudTri = document.querySelector(".tri");
        const noeudFiltre = document.querySelector(".liste-categorie");
        const btnGrille = document.querySelector(".btnGrille");
        const btnListe = document.querySelector(".btnListe");

        this.oCatalogue = new Catalogue();
        this.routeur = new Routeur();
        this.oPaysEtatsVille = new PaysEtatsVille();
        this.oFiltre = new Filtre(noeudFiltre);
        this.oTri = new Tri();

        this.routeur.ajouterRoute("liste", this.routeListe.bind(this));
        this.routeur.ajouterRoute("detail", this.routeDetail.bind(this));

        this.routeur.ajouterRoute("", () => {
            console.log("accueil");
            this.routeur.naviguer("liste", true);
        });

        this.routeur.demarrer();


        /** Écoute le le bouton recherche et construit l'url de la recherche*/
        document.querySelector(".btn-rechercher").addEventListener("click", () => {
            const recherche = document.querySelector("[name='champs-rechercher']").value;
            let infoRoute = this.routeur.getInfoRoute();
            let route = infoRoute.route[0];

            this.routeur.naviguer(route + "?recherche=" + recherche);
        })

        /** Écoute le type de tri et l'ordre de celui-ci et construit l'url du tri*/
        noeudTri.addEventListener("click", (e) => {
            let cible = e.target;
            let infoRoute = this.routeur.getInfoRoute();
            let route = infoRoute.route[0];
            let typeTri = noeudTri.querySelector('input[name="tri"]:checked');

            if (cible.classList.contains("asc") && typeTri !== null) {
                const asc = "asc";
                const tri = typeTri.value;
                this.routeur.naviguer(route + "?ordre=" + asc + "&tri=" + tri);
            }

            if (cible.classList.contains("desc") && typeTri !== null) {
                const desc = "desc";
                const tri = typeTri.value;
                this.routeur.naviguer(route + "?ordre=" + desc + "&tri=" + tri);
            }
        })

        /** Écoute le type de filtre et construit son url*/
        noeudFiltre.addEventListener("click", (e) => {
            let cible = e.target;
            let infoRoute = this.routeur.getInfoRoute();
            let route = infoRoute.route[0];
            let dataFiltre;

            if (cible.dataset.jsActif == "0") {
                let elActif = noeudFiltre.querySelector("[data-js-actif='1']");
                if (elActif) {
                    elActif.dataset.jsActif = "0";
                }

                cible.dataset.jsActif = "1";
            }

            if (cible.classList.contains("choixFiltre")) {
                dataFiltre = {
                    cat: cible.dataset.jsCat,
                    valeur: cible.dataset.jsCatValeur
                };
                this.routeur.naviguer(route + "?categorie=" + dataFiltre.cat + "&valeur=" + dataFiltre.valeur);
            }
        });

        /*Écoute le clic sur les boutons de display en liste et en grille et affiche le tout selon la sélection*/

        btnListe.addEventListener("click", () => {
            if (noeudCatalogue.classList.contains("catalogue-grille")) {
                noeudCatalogue.classList.replace("catalogue-grille", "catalogue-liste");
            }

        });

        btnGrille.addEventListener("click", () => {
            if (noeudCatalogue.classList.contains("catalogue-liste")) {
                noeudCatalogue.classList.replace("catalogue-liste", "catalogue-grille");
            }
        });


    }

    /**
     * Gère les routes et l'affichage dans la page de liste
     * @param {object} paramRequete //contient la route et des paramètres
     */
    async routeListe(paramRequete) {

        let parametre = paramRequete.parametre;
        let data = await this.oCatalogue.listerOeuvres();

        this.afficherOeuvres(data);
        this.oFiltre.setCat(data);
        this.oFiltre.rendu();


        /* Effectue la recherce (j'ai essayé de sortir ceci et la mettre dans sa propre classe mais sans succès) */
        if (parametre.recherche) {

            let valeur;

            data = data.filter((element) => {
                let chaineArtiste;
                if (element.Artistes.length > 1) {
                    element.Artistes.forEach(element => {
                        chaineArtiste += element.Prenom + " " + element.Nom;
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
                return valeur.toLowerCase().includes(parametre.recherche.toLowerCase());
            });

            this.afficherOeuvres(data);
        }

        /* Gère le tri des oeuvres par ordre asc ou desc */

        if (data && parametre.ordre) {
            let tabOrdonne = this.oTri.tri(data, parametre);
            this.afficherOeuvres(tabOrdonne);
        }

        let applique = document.querySelector(".applique");
        applique.innerHTML = "";
        if (data && parametre.categorie) {
            let aOeuvresFiltre = this.oFiltre.appliquerFiltre(data, parametre, applique);
            this.afficherOeuvres(aOeuvresFiltre);
        }

    }

    /**
    * Gère les routes et l'affichage dans la page de détail
    * @param {object} paramRequete //contient la route et des paramètres
    */
    async routeDetail(paramRequete) {
        let parametre = paramRequete.parametre;

        if (parametre.id) {
            let id = parametre.id;
            let data = await this.oCatalogue.listerUneOeuvre(id);
            let oeuvre;

            data.forEach(element => {
                if (id == element.NoInterne) {
                    oeuvre = element;
                }
            })

            this.afficherUnOeuvre(oeuvre);
        }
        else {
            this.routeur.naviguer("liste", true);
        }

    }

    /**
     * Gère l'affichage des oeuvres
     * @param {Array} data //Tableau des oeuvres à afficher
     */
    afficherOeuvres(data) {

        const listeOeuvres = [];
        let gabarit = document.querySelector("#tmpl-carte-oeuvre");
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
                Technique: element.Technique,
                NoInterne: element.NoInterne
            })
        })

        let domCatalogue = document.querySelector(".catalogue");
        domCatalogue.innerHTML = "";
        let html = Affichage.afficher(gabarit, listeOeuvres);
        document.querySelector(".catalogue").innerHTML = html;
    }

    /**
   * Gère l'affichage d'un oeuvre et aussi d'une parti du formulaire
   * @param {Object} oeuvre 
   */
    async afficherUnOeuvre(oeuvre) {

        let gabarit = document.querySelector("#tmpl-detail-oeuvre");

        /*Formate la date de fin de production et d'accession pour nous donner l'annee de production */
        let dateFinProd;
        if (typeof (oeuvre.DateFinProduction) == "string") {
            let date = new Date(parseInt(oeuvre.DateFinProduction.substring(6)));
            dateFinProd = date.getFullYear().toString();
        } else {
            dateFinProd = "non disponible";
        }

        /*Formate l'affichage des artistes en transformant le tableau d'object artiste en string injectable */
        let chaineArtiste = "<p><strong>Artiste(s):</strong></p>";

        if (oeuvre.Artistes.length > 1) {
            oeuvre.Artistes.forEach(element => {
                chaineArtiste += "<p>" + element.Prenom + " " + element.Nom + "<p>";
                if (element.NomCollectif !== null) {
                    chaineArtiste += element.NomCollectif;
                }

            });
        } else {
            oeuvre.Artistes.forEach(element => {
                chaineArtiste += "<p>" + element.Prenom + " " + element.Nom + "<p>";
                if (element.NomCollectif !== null) {
                    chaineArtiste += "<p><strong>Collectif: </strong>" + element.NomCollectif + "</p>";
                }
            });
        }

        /*Nouveau tableau pour injecter dans le template */
        let oeuvreDetail = {
            Titre: oeuvre.Titre,
            DateFinProduction: dateFinProd,
            Artistes: chaineArtiste,
            Arrondissement: oeuvre.Arrondissement,
            SousCategorieObjet: oeuvre.SousCategorieObjet,
            Technique: oeuvre.Technique,
            NoInterne: oeuvre.NoInterne,
            Parc: oeuvre.Parc,
            Batiment: oeuvre.Batiment,
            AdresseCivique: oeuvre.AdresseCivique,
            CoordonneeLatitude: oeuvre.CoordonneeLatitude,
            CoordonneeLongitude: oeuvre.CoordonneeLongitude,
            Materiaux: oeuvre.Materiaux,
            DimensionsGenerales: oeuvre.DimensionsGenerales,
            ModeAcquisition: oeuvre.ModeAcquisition,
            Support: oeuvre.Support,
        }

        let domCatalogue = document.querySelector(".catalogue");
        
        domCatalogue.innerHTML = "";

        Affichage.afficher(gabarit, oeuvreDetail, domCatalogue);

        this.afficherPays();

    }

    /*Fetch et affiche la liste le pays dans le formulaire */
    async afficherPays() {
        let data = await this.oPaysEtatsVille.listerPays();

        const domParent = document.querySelector(".zone-pays");
        const gabarit = document.querySelector("#tmpl-zone-pays");
        const gabaritOption = document.querySelector("#tmpl-option");

        let options = Affichage.afficher(gabaritOption, data);

        let pays = {
            pays: options
        }

        Affichage.afficher(gabarit, pays, domParent);

        let select = document.getElementById('pays-select');

        let paysChoisi;
        select.addEventListener('change', (event) => {
            paysChoisi = event.target.value;
            this.afficherEtats(paysChoisi);
        })
    }

    /*Fetch et affiche la liste le etats lié à un pays dans le formulaire */
    async afficherEtats(paysChoisi) {
        let data = await this.oPaysEtatsVille.listerEtats(paysChoisi);

        const gabarit = document.querySelector("#tmpl-zone-etats");
        const gabaritOption = document.querySelector("#tmpl-option");
        const domParent = document.querySelector(".zone-etats");
        const domVille = document.querySelector(".zone-villes");
        const domSubmit = document.querySelector(".zone-submit");
        const gabaritEtatsVide = document.querySelector("#tmpl-etats-vide");

        let options = Affichage.afficher(gabaritOption, data);

        if (data.length > 0) {
            domParent.innerHTML = "";
            domVille.innerHTML = "";

            let etats = {
                etats: options
            }

            Affichage.afficher(gabarit, etats, domParent);

            const select = document.getElementById('etats-select');

            let etatChoisi;
            select.addEventListener('change', (event) => {
                etatChoisi = event.target.value;
                this.afficherVilles(etatChoisi, paysChoisi);

            })

        } else {
            domParent.innerHTML = "";
            domVille.innerHTML = "";
            domSubmit.innerHTML = "";
            

            Affichage.afficher(gabaritEtatsVide, "", domParent);
        }

    }

    /*Fetch et affiche la liste le ville lié à un état dans le formulaire */
    async afficherVilles(etatChoisi, paysChoisi) {

        const gabarit = document.querySelector("#tmpl-zone-villes");
        const gabaritOption = document.querySelector("#tmpl-option");
        const gabaritVillesVide = document.querySelector("#tmpl-villes-vide");
        const domParent = document.querySelector(".zone-villes");

        let data = await this.oPaysEtatsVille.listerVilles(paysChoisi, etatChoisi);

        let options = Affichage.afficher(gabaritOption, data);
        
        if (data.length > 0) {
            
            domParent.innerHTML = "";

            let villes = {
                villes: options
            }

         Affichage.afficher(gabarit, villes, domParent);

            const select = document.getElementById('villes-select');

            select.addEventListener('change', () => {
                this.afficherSubmit();
            })
        } else {
            domParent.innerHTML = "";
            Affichage.afficher(gabaritVillesVide, "", domParent);
        }
    }
    /*Afficher le bouton submit*/
    afficherSubmit() {
        const domParent = document.querySelector(".zone-submit");

        let chaineSubmit = '<input class="submit" type="submit">';

        domParent.innerHTML = chaineSubmit;
    }



}