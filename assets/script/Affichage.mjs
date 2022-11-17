export default class Affichage {

    static afficher(gabarit, data, domParent){
        
        
        let html = "";
        if(!Array.isArray(data)){
            html += this.#genererNoeud(gabarit, data);
        }
        else {
            data.forEach((unElement)=>{
                html += this.#genererNoeud(gabarit, unElement)
            })   
        }
        if(domParent){
            domParent.insertAdjacentHTML("beforeend", html);
        }
       
        return html;
    }

    static #genererNoeud(gabarit, data){
        //let noeudDom = gabarit.cloneNode(true);
        let noeudDom = gabarit.innerHTML;
        for(let prop in data){
            let regex = new RegExp("\{\{"+prop+"\}\}", "g")
            noeudDom = noeudDom.replace(regex, data[prop]) 
        }
       
        return noeudDom;
    }

}