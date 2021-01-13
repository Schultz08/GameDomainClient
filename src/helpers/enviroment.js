let APIURL = "";

https://git.heroku.com/jas-gamedomain.git


switch(window.location.hostname){
    case "localhost" || "127.0.0.1":
        APIURL = "http://localhost:3000";
        break;
    
    case "https://git.heroku.com/jas-gamedomain.git":
    APIURL = "https://git.heroku.com/jas-gamedomain.git"
}

export default APIURL;