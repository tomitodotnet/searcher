
//https://raw.githubusercontent.com/Bootcamp-Espol/FSD02/main/S03D03/clase/recursos/products.json
//https://raw.githubusercontent.com/Bootcamp-Espol/FSD02/main/S03D03/clase/recursos/products.xml

//https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.json
//https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.xml

let URL = "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.json"
let URLxml = "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.xml"

function loadProducts (filtro){

  document.getElementById("idproductos").innerHTML="";
    requestJson( URL , filtro);
    requestXML( URLxml , filtro);


}


let requestJson = async ( myURL, filtro ) => {

    try {

      let response = await fetch( myURL ); 
      let result = await response.json() ;
      
      let plantilla = obtieneElememtos("Json", result, filtro);
      
      let productos  = document.getElementById("idproductos");  
      productos.innerHTML = productos.innerHTML + plantilla;



    } catch (error) {

      /* Fallo: Procese el error */
      
      console.log( error );

    }

  }

  let requestXML = async ( myURL, filtro ) => {

    try {

      let response = await fetch( myURL ); 
      let result = await response.text() /* Convierte el response a texto */
      let xml = (new DOMParser()).parseFromString(result, 'application/xml');

      let plantilla = obtieneElememtos("XML", xml, filtro);
      
      let productos  = document.getElementById("idproductos");  
      productos.innerHTML = productos.innerHTML + plantilla;



    } catch (error) {

      /* Fallo: Procese el error */
      
      console.log( error );

    }

  }


const obtieneElememtos = (tipo , lista, buscado) =>{

  let elememtos = "";
  let listaproductos = "";
  listaproductos  = lista;
  if (tipo === "XML")
      {
        listaproductos = lista.getElementsByTagName("product");
      }

  //listaproductos.forEach(element => {
   for (let element of listaproductos){
      let src = "";
      let name = "";
      let type = "";
      let price = "";
      if (tipo === "XML")
      {
         src = element.getElementsByTagName("src")[0].innerHTML;
         name = element.getElementsByTagName("name")[0].innerHTML;
         type = element.getElementsByTagName("type")[0].innerHTML;
         price = element.getElementsByTagName("price")[0].innerHTML;
  
      }else{
        src = element.src;
        name = element.name;
        type = element.type;
        price = element.price;
 
      }
   
      let filtrado = "";
      filtrado = buscado;
      if (filtrado==="" || name.includes(filtrado)  || type.includes(filtrado)  || filtrado ===" "){

          let dato = `
          <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
          <div class="card card-blog card-plain">
            <div class="card-header p-0 mt-n4 mx-3">
              <a class="d-block shadow-xl border-radius-xl">
                <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
              </a>
            </div>
            <div class="card-body p-3">
              <p class="mb-0 text-sm">${type}</p>
              <a href="javascript:;">
                <h5>
                  ${name}
                </h5>
              </a>
              <p class="mb-4 text-sm">
                <b>Price: </b> $ ${price}
              </p>
            </div>
          </div>
        </div>
              `;

        elememtos = elememtos + dato;
      }

  };

  return elememtos;

}

  
document.addEventListener("DOMContentLoaded", (event) => {
    
  loadProducts("");

});

let boton = document.getElementById("filter");
let txt = document.getElementById("text");

boton.addEventListener('click', (event) => {
    let filtrar = txt.value ;

    loadProducts(filtrar);

});


