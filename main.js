let urlDolarOficial = 'https://dolarapi.com/v1/dolares/oficial'
let urlDolarBlue = 'https://dolarapi.com/v1/dolares/blue'
let valorActualDolar = 0;
let fechaActualizacion = document.querySelector('#fechaActualizacion')
const fecha = new Date();
const diaActual = fecha.getDate()
const mesActual = fecha.getMonth() + 1; 
const anioActual = fecha.getFullYear();
let dolarOficialCompra = document.querySelector('#dolarOficialCompra')
let dolarOficialVenta = document.querySelector('#dolarOficialVenta')
let dolarBlueCompra = document.querySelector('#dolarBlueCompra')
let dolarBlueVenta = document.querySelector('#dolarBlueVenta')


let valorImpPais = 0.3
let valorImpGan = 0.3


function getCotizacionOficial() {
  return new Promise((resolve, reject) => {
    fetch(urlDolarOficial)
      .then(response => response.json())
      .then(data => {
        //obtengo los datos en el arreglo data
        
        if(valorActualDolar !== data.compra){
          fechaActualizacion.innerText = diaActual + '/' + mesActual + '/' + anioActual;
          }
          dolarOficialCompra.innerText = '$ ' + data.compra;
          dolarOficialVenta.innerText = '$ ' + data.venta;
      
          /*
          dolarBlueCompra.innerText = '$' + data[1].casa.compra;
          dolarBlueVenta.innerText =  '$' + data[1].casa.venta;
      */
          valorActualDolar = data.compra;

        // Retorna el valor deseado
        resolve(data.venta);

      })
      .catch(error => {
        reject(error);
      });
  });
}

function getCotizacionBlue() {
    return new Promise((resolve, reject) => {
      fetch(urlDolarBlue)
        .then(response => response.json())
        .then(data => {
          //obtengo los datos en el arreglo data
          
          if(valorActualDolar !== data.compra){
            fechaActualizacion.innerText = diaActual + '/' + mesActual + '/' + anioActual;
            }
            dolarBlueCompra.innerText = '$ ' + data.compra;
            dolarBlueVenta.innerText = '$ ' + data.venta;
        
            /*
            dolarBlueCompra.innerText = '$' + data[1].casa.compra;
            dolarBlueVenta.innerText =  '$' + data[1].casa.venta;
        */
            valorActualDolar = data.compra;
    
  
          // Retorna el valor deseado
          resolve(data.venta);
        })
        .catch(error => {
          reject(error);
        });
    });
  
}

let valorDolarOficial;
let valorDolarBlue;

async function callGetCotizacionOficial() {
  try {
    const response = await getCotizacionOficial();
    let dolar = response;
    valorDolarOficial = parseFloat(dolar);
  } catch (error) {
    console.log(error);
  }
}

async function callGetCotizacionBlue() {
    try {
      const response = await getCotizacionBlue();
      let dolar = response;
      valorDolarBlue = parseFloat(dolar);
    } catch (error) {
      console.log(error);
    }
}



callGetCotizacionOficial();
callGetCotizacionBlue();

  /* --------------------           ----------------------------- */

 
                        



  document.getElementById("valorImpuestoPais").innerHTML=0;
  document.getElementById("valorImpuestoGanancia").innerHTML=0;
  document.getElementById("valorTotalOficial").innerHTML=0;

 function pesosDolaresOficial(valNum) {
     valNum = valNum.replace(/\./g,'')
     valNum = valNum.replace(/\,/g,'.')
     var conversionConFormato = new Intl.NumberFormat("es-ES").format(parseFloat(valNum/valorDolarOficial).toFixed(2))
     if(isNaN(valNum)){
             document.getElementById("inputDolaresOficial").value=0;  
             calcularImpuestos(false);
         } else {
             if(valNum > -1){
                 let miles = conversionConFormato.split(',');
                 if((miles[0] < 10000)&&(miles[0]>999)){
                     let arr = conversionConFormato.split('');
                     if (typeof(miles[1]) === 'undefined') {
                         miles[1] = 0
                     }
                     conversionConFormato = arr[0] + '.' + arr[1] + arr[2] + arr[3] + ',' + miles[1]
                     
                 }
                 document.getElementById("inputDolaresOficial").value=conversionConFormato;
                 calcularImpuestos(true);
             } else {
                 document.getElementById("inputDolaresOficial").value='Ingrese valor positivo.'
                 calcularImpuestos(false);
             }
            
     }
    
 }
                       
 function dolaresPesosOficial(valNum) {
     valNum = valNum.replace(/\./g,'')
     valNum = valNum.replace(/\,/g,'.')
     console.log('valoDolarOficial', valorDolarOficial)
     var conversionConFormato = new Intl.NumberFormat("es-ES").format(parseFloat(valNum*valorDolarOficial).toFixed(2))
     if(isNaN(valNum)){
             document.getElementById("inputPesosOficial").value=0;
             calcularImpuestos(false);
         } else {
             if(valNum > -1){
                 let miles = conversionConFormato.split(',');
                 if((miles[0] < 10000)&&(miles[0]>999)){
                     let arr = conversionConFormato.split('');
                     if (typeof(miles[1]) === 'undefined') {
                         miles[1] = 0
                     }
                     conversionConFormato = arr[0] + '.' + arr[1] + arr[2] + arr[3] + ',' + miles[1]
                     
                 }
                 document.getElementById("inputPesosOficial").value=conversionConFormato;
                 calcularImpuestos(true);
             } else {
                 document.getElementById("inputPesosOficial").value='Ingrese valor positivo.'
                 calcularImpuestos(false);
             }
            
     }
    
    
 }



function calcularImpuestos(bool){
    var valorPesos = document.getElementById("inputPesosOficial").value;
   
    valorPesos = valorPesos.replace(/\./g,'')
    valorPesos = valorPesos.replace(/\,/g,'.')
    valorPesos = (parseFloat(valorPesos))
    if(isNaN(valorPesos)||(!bool)){
        document.getElementById("valorImpuestoPais").innerHTML=0;
        document.getElementById("valorImpuestoGanancia").innerHTML=0;
        document.getElementById("valorTotal").innerHTML=0;
    } else {
        pesosImpuestoPais=new Intl.NumberFormat("es-ES").format(parseFloat((valorPesos)*valorImpPais).toFixed(2))
        pesosImpuestoGanancia=new Intl.NumberFormat("es-ES").format(parseFloat((valorPesos)*valorImpGan).toFixed(2))
        pesosTotal=new Intl.NumberFormat("es-ES").format(parseFloat((valorPesos)*1.65).toFixed(2))
        //Add . in 1.000
        let arrMiles1 = pesosImpuestoPais.split(',');
           
            if((arrMiles1[0] < 10000)&&(arrMiles1[0]>999)){
                let arr = pesosImpuestoPais.split('');
                if (typeof(arrMiles1[1]) === 'undefined') {
                    arrMiles1[1] = 0
                }
                pesosImpuestoPais = arr[0] + '.' + arr[1] + arr[2] + arr[3] + ',' + arrMiles1[1]
                
            }
       
        let arrMiles2 = pesosImpuestoGanancia.split(',');
            if((arrMiles2[0] < 10000)&&(arrMiles2[0]>999)){
                let arr = pesosImpuestoGanancia.split('');
                if (typeof(arrMiles2[1]) === 'undefined') {
                    arrMiles2[1] = 0
                }
                pesosImpuestoGanancia = arr[0] + '.' + arr[1] + arr[2] + arr[3] + ',' + arrMiles2[1]
                
            }
        let arrMiles3 = pesosTotal.split(',');
            if((arrMiles3[0] < 10000)&&(arrMiles3[0]>999)){
                let arr = pesosTotal.split('');
                if (typeof(arrMiles3[1]) === 'undefined') {
                    arrMiles3[1] = 0
                }
                pesosTotal = arr[0] + '.' + arr[1] + arr[2] + arr[3] + ',' + arrMiles3[1]
                
            }
        document.getElementById("valorImpuestoPais").innerHTML= '$ ' + pesosImpuestoPais;
        document.getElementById("valorImpuestoGanancia").innerHTML='$ ' + pesosImpuestoGanancia;
        document.getElementById("valorTotalOficial").innerHTML=pesosTotal;
    }
}



function pesosDolaresBlue(valNum) {
  valNum = valNum.replace(/\./g,'')
  valNum = valNum.replace(/\,/g,'.')
  var conversionConFormato = new Intl.NumberFormat("es-ES").format(parseFloat(valNum/valorDolarBlue).toFixed(2))
  if(isNaN(valNum)){
          document.getElementById("inputDolaresBlue").value=0;
      } else {
          if(valNum > -1){
              let miles = conversionConFormato.split(',');
              if((miles[0] < 10000)&&(miles[0]>999)){
                  let arr = conversionConFormato.split('');
                  if (typeof(miles[1]) === 'undefined') {
                      miles[1] = 0
                  }
                  conversionConFormato = arr[0] + '.' + arr[1] + arr[2] + arr[3] + ',' + miles[1]
                  
              }
              document.getElementById("inputDolaresBlue").value=conversionConFormato;
              
          } else {
              document.getElementById("inputDolaresBlue").value='Ingrese valor positivo.'
              
          }
         
  }
 
}


function dolaresPesosBlue(valNum) {
  valNum = valNum.replace(/\./g,'')
  valNum = valNum.replace(/\,/g,'.')
  var conversionConFormato = new Intl.NumberFormat("es-ES").format(parseFloat(valNum*valorDolarBlue).toFixed(2))
  if(isNaN(valNum)){
          document.getElementById("inputPesosBlue").value=0;
      } else {
          if(valNum > -1){
              let miles = conversionConFormato.split(',');
              if((miles[0] < 10000)&&(miles[0]>999)){
                  let arr = conversionConFormato.split('');
                  if (typeof(miles[1]) === 'undefined') {
                      miles[1] = 0
                  }
                  conversionConFormato = arr[0] + '.' + arr[1] + arr[2] + arr[3] + ',' + miles[1]
                 
              }
              document.getElementById("inputPesosBlue").value=conversionConFormato;
              document.getElementById("valorTotalBlue").innerHTML=conversionConFormato;
          } else {
              document.getElementById("inputPesosBlue").value='Ingrese valor positivo.'
              document.getElementById("valorTotalBlue").innerHTML=conversionConFormato;
          }
         
  }
 
 
}