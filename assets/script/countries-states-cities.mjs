export default class PaysEtatsVille {

    #URL = "https://api.countrystatecity.in/v1/countries";

   constructor(){

    const headers = new Headers();
    headers.append("X-CSCAPI-KEY", "RW9yWWZRSG5OWUh3YXBmbFNZQmJ3WHRPYlB0d0FoakFaMWlpTnpKOA==");
    
    this.requestOptions = {
       method: 'GET',
       headers: headers,
       redirect: 'follow'

    };
    

   }

    async listerPays(){

        let resultat;
        let response = await fetch(this.#URL, this.requestOptions);
        resultat = await response.json();
    
        return resultat;
       
    }

    async listerEtats(pays){
      
        let resultat;
        let response = await fetch(this.#URL+"/"+pays+"/states", this.requestOptions);
        resultat = await response.json();
    
        return resultat;
    }

    async listerVilles(pays, etats){
        
        let resultat;
        let response = await fetch(this.#URL+"/"+pays+"/states/"+etats+"/cities", this.requestOptions);
        resultat = await response.json();
    
        return resultat;
    }

}