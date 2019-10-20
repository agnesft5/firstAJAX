//Variable global:
let objProduct;

//Botons
let enviarButton = document.querySelector(".banner__sendbutton");
let inputCodigo = document.getElementById("codigoProducto");
let cantidadButton = document.querySelector(".banner2__cantidadbutton");
let volverButton = document.querySelector(".banner3__volverbutton");
let divContenidor = document.querySelector(".initial__banner");
let banner1 = document.querySelector(".body__banner");
let banner2 = document.querySelector(".body__banner2");
let banner3 = document.querySelector(".body__banner3");




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
   //Imprimir valor nutrients
   let valorCarbohidratos = imprimirValor(nutrients,"carbohydrates_100g");
   let valorGrasas = imprimirValor(nutrients,"fat_100g");
   let valorEnergia = imprimirValor(nutrients,"energy_100g");
   let valorAzucar = imprimirValor(nutrients,"sugars_100g");
   let valorSaturadas = imprimirValor(nutrients,"saturated-fat_100g");
   let valorSal = imprimirValor(nutrients,"salt_100g");
   let valorProteinas = imprimirValor(nutrients,"proteins_100g");
   let valorFibra = imprimirValor(nutrients,"fiber_100g");
   //Imprimir foto
   let link = buscarImg(product);
   let fotoProductb2 = document.querySelector(".cardb2__image");
   fotoProductb2.src = link;
   let fotoProductb3 = document.querySelector(".cardb3__image");
   fotoProductb3.src = link;
   //Imprimir nom del producte
   let productName = buscarProductName(product);
   let fotoProductFooterb2 = document.querySelector(".cardb2__footer");
   fotoProductFooterb2.innerHTML = productName;
   let fotoProductFooterb3 = document.querySelector(".cardb3__footer");
   fotoProductFooterb3.innerHTML = productName;
   //Imprimir quantitat
   let quantity = buscarCantidad(product);
   let quantityProductb2 = document.querySelector(".quantity__inputb2");
   quantityProductb2.innerHTML = ` ${quantity}`;
   let quantityProductb3 = document.querySelector(".quantity__inputb3");
   quantityProductb3.innerHTML = `${quantity}`;

   //Multiplicar per quanitat
   let CHPorCantidad = calclularPorCantidad (valorCarbohidratos,quantity);
   let CHCantidad = document.querySelector("#carbohydrates_cantidad");
   CHCantidad.innerHTML = CHPorCantidad;
   let GrasasPorCantidad = calclularPorCantidad (valorGrasas,quantity);
   let GrasasCantidad = document.querySelector("#fat_cantidad");
   GrasasCantidad.innerHTML = GrasasPorCantidad;
   let EnergiaPorCantidad = calclularPorCantidad (valorEnergia,quantity);
   let EnergiaCantidad = document.querySelector("#energy_cantidad");
   EnergiaCantidad.innerHTML=EnergiaPorCantidad;
   let AzucarPorCantidad = calclularPorCantidad (valorAzucar,quantity);
   let AzucarCantidad = document.querySelector("#sugars_cantidad");
   AzucarCantidad.innerHTML = AzucarPorCantidad;
   let SaturadasPorCantidad = calclularPorCantidad (valorSaturadas,quantity);
   let SaturadasCantidad = document.querySelector("#saturated-fat_cantidad");
   SaturadasCantidad.innerHTML = SaturadasPorCantidad;
   let SalPorCantidad = calclularPorCantidad (valorSal,quantity);
   let SalCantidad = document.querySelector("#salt_cantidad");
   SalCantidad.innerHTML = SalPorCantidad;
   let ProteinasPorCantidad = calclularPorCantidad (valorProteinas,quantity);
   let ProteinasCantidad = document.querySelector("#proteins_cantidad");
   ProteinasCantidad.innerHTML = ProteinasPorCantidad;
   let FibraPorCantidad = calclularPorCantidad (valorFibra,quantity);
   let FibraCantidad = document.querySelector("#fiber_cantidad");
   FibraCantidad.innerHTML = FibraPorCantidad;
};

function imprimirValor(nutrients,nombreMacro){
   let valor = buscarMacroNutriente(nutrients, nombreMacro);
   let infoMacro = document.querySelector("#"+nombreMacro);
   infoMacro.innerHTML = `${valor}`;
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
        }else if(nutriente == undefined){
            datoFinal = "0";
        }
    }
    return datoFinal;
}

//Funció per treure l'objecte de les fotos
function buscarImg(producto){
    let link = "";
    if (producto["selected_images"]["front"]["display"]["fr"] != undefined){
        link = producto["selected_images"]["front"]["display"]["fr"];
    }else if (producto["selected_images"]["front"]["display"]["es"] != undefined){
        link = producto["selected_images"]["front"]["display"]["es"];
    }else if (producto["selected_images"]["front"]["display"]["en"] != undefined){
        link = producto["selected_images"]["front"]["display"]["en"];
    }
    return link;
}

//Funció per treure el nom de l'aliment
function buscarProductName (producto){
    let productName = "";
    productName = producto["product_name"];
    console.log(productName);
    return productName;
}

//Funció per treure el gramatge de l'aliment
function buscarCantidad (producto){
    let quantity ="";
    quantity = producto["quantity"];
    return quantity;
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
    banner3.className="banner bg-orange text-center body__banner3 d-none";
});

cantidadButton.addEventListener("click",()=>{
    banner1.className="banner text-center body__banner d-none";
    banner2.className="banner bg-orange text-center body__banner2 d-none";
    banner3.className="banner bg-orange text-center body__banner3"
    ereseValue();
});

volverButton.addEventListener("click",()=>{
    banner1.className="banner text-center body__banner";
    banner2.className="banner bg-orange text-center body__banner2 d-none";
    banner3.className="banner bg-orange text-center body__banner3 d-none"
    ereseValue();
});

function ereseValue(){
    inputCodigo.value="";
};

function calclularPorCantidad (valor,cantidad){
    let resultadoPorCantidad = (valor/100)*cantidad;
    return resultadoPorCantidad;
};

//Codi:8422904015553
//737628064502
