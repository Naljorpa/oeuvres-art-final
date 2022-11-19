export default class PaysEtatsVille {

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
        let response = await fetch("https://api.countrystatecity.in/v1/countries", this.requestOptions);
        resultat = await response.json();
    
        return resultat;

        
        // fetch("https://api.countrystatecity.in/v1/countries", this.requestOptions)
        // .then(response => response.text())
        // .then(result => console.log(result))
        // .catch(error => console.log('error', error));
       
    }

    async listerEtats(pays){
        console.log(pays);
        let resultat;
        let response = await fetch("https://api.countrystatecity.in/v1/countries/"+pays+"/states", this.requestOptions);
        resultat = await response.json();
    
        return resultat;
    }

    async listerVilles(pays, etats){
        let resultat;
        let response = await fetch("https://api.countrystatecity.in/v1/countries/"+pays+"/states/"+etats+"/cities", this.requestOptions);
        resultat = await response.json();
    
        return resultat;
    }

}