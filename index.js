//Variable global:
let objProduct;

//Botons
let enviarButton = document.querySelector(".banner__sendbutton");
let inputCodigo = document.getElementById("codigoProducto");
let volverButton = document.querySelector(".banner2__volverbutton");
let divContenidor = document.querySelector(".initial__banner");
let banner1 = document.querySelector(".body__banner");
let banner2 = document.querySelector(".body__banner2");



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

//Funció per guardar les dades
function guardarDatos(text){
   objProduct = JSON.parse(text) //objJSON
   let product = buscarProduct(objProduct);
   let nutrients = buscarNutrients(product);
   //dades
   imprimirValor(nutrients,"carbohydrates_100g");
   imprimirValor(nutrients,"fat_100g");
   let link = buscarImg(product);
   let fotoProduct = document.querySelector(".card__image");
   fotoProduct.src = link;
   let productName = buscarProductName(product);
   let fotoProductFooter = document.querySelector(".card__footer");
   fotoProductFooter.innerHTML = productName;

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

//Funció per treure Macro Nutrients
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

//Funció per treure l'objecte de les fotos
function buscarImg(producto){
    let link = "";
    if (producto["selected_images"]["front"]["display"]["fr"] != undefined){
        link = producto["selected_images"]["front"]["display"]["fr"];
    }else{
        link = producto["selected_images"]["front"]["display"]["es"]
    }
    console.log(link);
    return link;
}

//Funció per treure el nom de l'aliment
function buscarProductName (producto){
    let productName = "";
    productName = producto["product_name"];
    console.log(productName);
    return productName;
}


//Impresió producte per codi de barres
function canviarLink(){
    let productCode = inputCodigo.value;
    httpGet("https://cors-anywhere.herokuapp.com/https://world.openfoodfacts.org/api/v0/product/"+productCode+".json",guardarDatos);
}

enviarButton.addEventListener("click",()=>{
    canviarLink();
    banner1.className="banner text-center body__banner d-none";
    banner2.className="banner bg-orange text-center body__banner2";
});

volverButton.addEventListener("click",()=>{
    banner1.className="banner text-center body__banner";
    banner2.className="banner bg-orange text-center body__banner2 d-none";
    ereseValue();
});

function ereseValue(){
    inputCodigo.value="";
};
//Codi:8422904015553
