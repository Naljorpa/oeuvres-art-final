/**
 * Représente le routeur de l'application. 
 * 
 * @see https://dev.to/thedevdrawer/single-page-application-routing-using-hash-or-url-9jh
 */
 export default class Routeur{
    #routeActive;
    #routes ={}

    /**
     * À l'instanciation du routeur, ajoute les gestionnaires d'événement sur les href déjà présent dans le DOM. 
     * @todo : Gérer l'ensemble des clics à partir d'un seul point d'attache (document) et appliquer la route s'il contient un hashbang
    //  */
    constructor(){
        window.addEventListener("popstate", this.dePopState.bind(this));

        document.querySelectorAll("[href^='#!/']").forEach((lien)=>{
            lien.addEventListener("click", (e)=>{
                e.preventDefault();
                let cible = e.target;
                let hash = cible.hash;
                console.log(hash)
                //console.log(e);
                history.pushState({}, "", hash);
                this.changerRoute(hash);

            });
        })
    }
    /**
     * Ajoute une route
     * @param {String} route 
     * @param {Function} cb 
     */
    ajouterRoute(route, cb){
        if(route.charAt(0)!="/")
        {
            route = "/"+route;
        }
        this.#routes[route] = {cb:cb};
        console.log (this.#routes)
        
    }
    /**
     * Force un changement de route ou une redirection.
     * @param {String} route 
     * @param {Boolean} redirection 
     */
    naviguer(route, redirection){
        if(route.charAt(0)!="/")
        {
            route = "/"+route;
        }
        let hash = `#!${route}`;
        if(redirection){
            history.replaceState({}, "", hash);
        }
        else{
            history.pushState({}, "", hash);
        }
        console.log(hash, route)
        this.changerRoute(hash);
    }
    /**
     * Méthode pour démarrer le routage, doit être chargé à la fin de l'ajout de route.
     */
    demarrer(){
        let hash = location.hash;
        if(!hash.includes("#!/")){
            hash = "#!/";
        }
        history.pushState({}, "", hash);
        this.changerRoute(hash);
        
    }
    /**
     * Gestionnaire d'événement de PopState. Ne doit pas être appelés directement.
     * @see mdn window.popstate
     * @param {PopStateEvent} e 
     */
    dePopState(e){
        console.log(e);
        let hash = location.hash;
        this.changerRoute(hash);
    }
    
    /**
     * Appelé sur le changement du hash ou sur le click sur un lien avec un hash bang
     * @todo - Valider que le hash est de la bonne forme, sinon 404
     */
    changerRoute(hash){
        let parametreRoute = this.getParamRoute(hash);
        console.log(parametreRoute);
        //this.#routeActive = hash.match("#!/(.*)$")[1].replace("/", "");
        this.#routeActive = parametreRoute.route[0];
        
        if(this.#routes[this.#routeActive]?.cb){
            this.#routes[this.#routeActive].cb(parametreRoute);
        }
    }
    /**
     * Permet de décoder les informations dans le hash (/route/subroute/subsub... ?cle=valeur&cle=valeur&cle=valeur)
     * @param {String} hash à décoder
     * @returns {Object} Parametre de la route {route : Array(), parametre : Array}
     */
    getParamRoute(hash){
        // Chaine type : #!/
        // Chaine type : #!/route
        // Chaine type : #!/route/:id
        // Chaine type : #!/route?cle=valeur&cle=valeur
        // Chaine type : #!/route/:id?cle=valeur&cle=valeur
        // Chaine type : #!/route/element/element/elementN/...
        let analyseRoute = hash.match("#!(.*)$");   // Conserve la / initiale, permet la route /
        
        const parametre = {};
        let route;
        let aRoute;
        if(analyseRoute){
            route = analyseRoute[1];
            // Sépare les query string cle=valeur
            if(route.includes("?")){
                let sParam = route.match("\\?(.*)$")[1]
                let aParam = sParam.split("&");
                for (let unParam of aParam){
                    let aTemp = unParam.split("=");
                    let cle = aTemp[0];
                    let valeur = aTemp[1]   
                    parametre[cle] = valeur
                }
            }
            // Traite la route pour les /route/element/element/elementN/...
            route = route.split("?")[0];    // Conserve la partie avant les queryString, si présent.
            if(route == "/"){            // Il y a un problème avec le cas #!/ 
                aRoute = [route];
            }    
            else{
                console.log(route)
                if(route.charAt(0)== "/"){
                    route = route.replace("/", ""); // Retrait du premier /
                }
                aRoute = route.split("/");  
                if(aRoute[aRoute.length-1] == ""){
                    aRoute.pop();
                }
                aRoute = aRoute.map(r => "/"+ r);   // Ajoute une / devant chaque partie de la route /test1/test2 devient "/test" et "/test"
                if(aRoute[0] == ""){
                    aRoute[0] = "/";
                }
            }
        }
        //console.log(analyseRoute)
        this.dataRoute = {
            parametre : parametre,
            route : aRoute,
        }
        return this.dataRoute;
    }

    /**
     * Getter des paramètres de la route active.
     * @returns {Object} Parametre de la route {route : Array(), parametre : Array}
     */
    getInfoRoute(){
        return this.dataRoute;
    }
}