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

//Funció per guardar les dades
function guardarDatos(text){
   objProduct = JSON.parse(text) //objJSON
   let product = buscarProduct(objProduct);
   let nutrients = buscarNutrients(product);
   //dades
   imprimirValor(nutrients,"carbohydrates_100g");
   imprimirValor(nutrients,"fat_100g");
   let link = buscarImg(product);
   

// buscar elem por id o class y usar innerHTML
}

function imprimirValor(nutrients,nombreMacro){
   let valor = buscarMacroNutriente(nutrients, nombreMacro);
   let infoMacro = document.querySelector("#"+nombreMacro);
   infoMacro.innerHTML = `${valor}g`
}

//Funció per treure el producte
function buscarProduct(objJSON){
    return objJSON.product;
    /*
    let producto ="";
    for(let clave in objJSON){
        if(clave == "product"){
            producto = clave;
        }
    }
    return producto;
    */
}

//Funció per treure els nutrients
function buscarNutrients(producto){
    let nutriente = "";

    for (let clave in producto){
        if(clave == "nutriments"){
            nutriente = producto[clave];
        }
    }

    return nutriente;
}

//Funció per treure CH
function buscarMacroNutriente(nutriente,attr){

//return nutriente[attr];

    let datoFinal =""
    for (let clave in nutriente){
        if (clave == attr){
            datoFinal = nutriente[clave];
        }
    }
    return datoFinal;
}


//PATH FOTO objProduct.product["selected_images"]["front"]["display"]["es"]
//Funció per treure el objecte de les fotos
function buscarImg(producto){
    let link = "";
    link = producto["selected_images"]["front"]["display"]["es"];
    console.log(link);
    return link;
}


//Impresió producte per codi de barres
let productCode = "8422904015553"; //Codi de barres del producte
httpGet("https://cors-anywhere.herokuapp.com/https://world.openfoodfacts.org/api/v0/product/"+productCode+".json",guardarDatos);