///Funció petició amb callback
function httpGet(theUrl, callback) {
    
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl);
    xmlHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    xmlHttp.send();
}

let objProduct;
//Funció per imprimir
function guardarJSON(text){
   objProduct = JSON.parse(text) //objJSON
   function buscarCH(objProduct){

   }
}

function buscarCH(objProduct){
    for(let clave in objProduct["product"]["nutriments"]){
        if(objProduct["product"]["nutriments"] == "carbohydrates_100g"){
        let productCH= objProduct["product"]["nutriments"][clave];
        }
    }
    console.log(productCH);
    return productCH;
};


//Impresió producte per codi de barres
let productCode = "8422904015553"; //Codi de barres del producte
httpGet("https://cors-anywhere.herokuapp.com/https://world.openfoodfacts.org/api/v0/product/"+productCode+".json",guardarJSON);



// //Com crec que s'ha de buscar la info
// for(let clave in objProduct["product"]["nutriments"]){
// 	if(objProduct["product"]["nutriments"] == "carbohydrates_100g"){
// 	console.log(objProduct["product"]["nutriments"][clave])
// 	}
// };


// //El que vull treure
// console.log(objProduct.product["nutriments"]["carbohydrates_100g"]);