export default class Catalogue {

  #URL = "/assets/data/oeuvresdonneesouvertes.json";

  constructor() {

  }

  async listerOeuvres(params) {

    let resultat;
    let response = await fetch(this.#URL);
    resultat = await response.json();

    if(params.cb){

      params.cb(resultat);
  }

  return resultat;
  
  }

  //   data.forEach(element => {


  //     /*Formate la date de fin de production et d'accession pour nous donner l'annee de production */
  //     let dateFinProd;
  //     if (typeof (element.DateFinProduction) == "string") {
  //       let date = new Date(parseInt(element.DateFinProduction.substring(6)));
  //       dateFinProd = date.getFullYear().toString();
  //     } else {
  //       dateFinProd = "non disponible";
  //     }

  //     /*Formate une variable chaine de caracteres nous fournissant les informations des createurs de l'oeuvre*/

  //     let chaineArtiste = "<p><strong>Artiste(s):</strong></p>";

  //     if (element.Artistes.length > 1) {
  //       element.Artistes.forEach(element => {
  //         chaineArtiste += "<p>" + element.Prenom + " " + element.Nom + "<p>";
  //         if (element.NomCollectif !== null) {
  //           chaineArtiste += element.NomCollectif;
  //         }

  //       });
  //     } else {
  //       element.Artistes.forEach(element => {
  //         chaineArtiste += "<p>" + element.Prenom + " " + element.Nom + "<p>";
  //         if (element.NomCollectif !== null) {
  //           chaineArtiste += "<p><strong>Collectif: </strong>" + element.NomCollectif + "</p>";
  //         }
  //       });
  //     }

  //     listeOeuvres.push({
  //       Titre: element.Titre,
  //       DateFinProduction: dateFinProd,
  //       Artistes : chaineArtiste,
  //       Arrondissement: element.Arrondissement,
  //       SousCategorieObjet: element.SousCategorieObjet,
  //       Technique: element.Technique
  //     })
  //   })
  //   params.cb(listeOeuvres)
  // })
  // return listeOeuvres;
  // }



  // #aData;

  // constructor(domParent) {
  //   this.domParent = domParent;
  // }


  // /**
  //  * 
  //  * @param {array} data -l'array des oeuvres
  //  */

  // setOeuvres(data) {
  //   this.#aData = data;
  // }

  // /**
  //  * Construit le catalogue listant les oeuvres
  //  * Retourne le DOM des oeuvres selon les data passées
  //  */

  // rendu() {

  //   let chaineHTML = "";
  //   this.#aData.forEach((oeuvre) => {

  //     /*Formate la date de fin de production et d'accession pour nous donner l'annee de production */

  //     let dateAccession;
  //     if (typeof (oeuvre.DateAccession) == "string") {
  //       let date = new Date(parseInt(oeuvre.DateAccession.substring(6)));
  //       dateAccession = date.getFullYear().toString();
  //     } else {
  //       dateAccession = "non disponible";
  //     }


  //     /*Construction des cartes qui iront dans le DOM*/

  //                               </div>
  //                               <dialog class="modal-ouvert">
  //                                   <header>
  //                                       <h2>${oeuvre.Titre} </h2>
  //                                       ${chaineArtiste}
  //                                       <p><strong>Titre variante:</strong></p>
  //                                       <small>${oeuvre.TitreVariante}</small>
  //                                       <p><strong>Année de fin de production:</strong></p>
  //                                       <small>${dateFinProd}</small>
  //                                       <p><strong>Année d'accession:</strong></p>
  //                                       <small>${dateAccession} </small>
  //                                  </header>
  //                                  <div class="contenu">
  //                                       <p><strong>Emplacement:</strong></p>
  //                                       <small>Arrondissement: ${oeuvre.Arrondissement}<br> Parc: ${oeuvre.Parc}<br>Batiment: ${oeuvre.Batiment}<br> Adresse: ${oeuvre.AdresseCivique}<br> Latitude/Longitude ${oeuvre.CoordonneeLatitude}/${oeuvre.CoordonneeLongitude}</small>
  //                                       <p><strong>Technique:</strong></p>
  //                                       <small>${oeuvre.Technique} </small>
  //                                       <p><strong>Matériaux:</strong></p>
  //                                       <small>${oeuvre.Materiaux}</small>
  //                                       <p><strong>Type:</strong></p>
  //                                       <small>${oeuvre.SousCategorieObjet}</small>
  //                                       <p><strong>Dimensions générales:</strong></p>
  //                                       <small>${oeuvre.DimensionsGenerales}</small>
  //                                       <p><strong>Mode d'acquisition:</strong></p>
  //                                       <small>${oeuvre.ModeAcquisition}</small>
  //                                       <p><strong>Support:</strong></p>
  //                                       <small>${oeuvre.Support}</small>
  //                                       <button class="button fermer-button">Fermer</button>
  //                               </div>
  //                               </dialog>
  //                           </article>

  //                           `;

  //   });

  //   this.domParent.innerHTML = chaineHTML;
  // }

}
