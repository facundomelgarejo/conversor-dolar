let url = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales'
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
let dolarTuristaCompra = document.querySelector('#dolarTuristaCompra')
let dolarTuristaVenta = document.querySelector('#dolarTuristaVenta')






function getCotizacion() {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Realiza tus operaciones con los datos obtenidos
        
        if(valorActualDolar !== data[0].casa.compra){
          fechaActualizacion.innerText = diaActual + '/' + mesActual + '/' + anioActual;
          }
          dolarOficialCompra.innerText = '$' + data[0].casa.compra;
          dolarOficialVenta.innerText = '$' + data[0].casa.venta;
      
          dolarBlueCompra.innerText = '$' + data[1].casa.compra;
          dolarBlueVenta.innerText =  '$' + data[1].casa.venta;
      
          dolarTuristaCompra.innerText =  data[6].casa.compra;
          dolarTuristaVenta.innerText = '$' + data[6].casa.venta;
      
      
          valorActualDolar = data[0].casa.compra;
  

        // Retorna el valor deseado
        resolve(data[0].casa.venta);
      })
      .catch(error => {
        reject(error);
      });
  });
}
var valorDolar;

async function callGetCotizacion() {
  try {
    const response = await getCotizacion();
    var dolar = response;
    console.log(dolar)
    dolar = dolar.replace(/\,/g,'.')
    valorDolar = parseFloat(dolar);
                        console.log("valor del dolar hoy: ", valorDolar)
                       
                        
                       
                        
  } catch (error) {
    console.log('Ocurrió un error:', error);
  }
}

callGetCotizacion();

  /* --------------------           ----------------------------- */

  var dolar = dolarOficialVenta;
                        



  document.getElementById("valorImpuestoPais").innerHTML=0;
                        document.getElementById("valorImpuestoGanancia").innerHTML=0;
                        document.getElementById("valorTotal").innerHTML=0;

                        function pesosDolares(valNum) {
                            valNum = valNum.replace(/\./g,'')
                            valNum = valNum.replace(/\,/g,'.')
                            var conversionConFormato = new Intl.NumberFormat("es-ES").format(parseFloat(valNum/valorDolar).toFixed(2))

                            if(isNaN(valNum)){
                                    document.getElementById("inputDolares").value=0;  
                                    calcularImpuestos(false);
                                } else {
                                    if(valNum > -1){
                                        let miles = conversionConFormato.split(',');

                                        if((miles[0] < 10000)&&(miles[0]>999)){
                                            let arr = conversionConFormato.split('');
                                            if (typeof(miles[1]) === 'undefined') {
                                                miles[1] = 00
                                            }
                                            conversionConFormato = arr[0] + '.' + arr[1] + arr[2] + arr[3] + ',' + miles[1]
                                            console.log(arr)
                                        }
                                        document.getElementById("inputDolares").value=conversionConFormato;
                                        calcularImpuestos(true);
                                    } else {
                                        document.getElementById("inputDolares").value='Ingrese valor positivo.'
                                        calcularImpuestos(false);
                                    }
                                   
                            }
                           
                        }
                       
                        function dolaresPesos(valNum) {
                            valNum = valNum.replace(/\./g,'')
                            valNum = valNum.replace(/\,/g,'.')
                            var conversionConFormato = new Intl.NumberFormat("es-ES").format(parseFloat(valNum*valorDolar).toFixed(2))

                            if(isNaN(valNum)){
                                    document.getElementById("inputPesos").value=0;
                                    calcularImpuestos(false);
                                } else {
                                    if(valNum > -1){
                                        let miles = conversionConFormato.split(',');

                                        if((miles[0] < 10000)&&(miles[0]>999)){
                                            let arr = conversionConFormato.split('');
                                            if (typeof(miles[1]) === 'undefined') {
                                                miles[1] = 00
                                            }
                                            conversionConFormato = arr[0] + '.' + arr[1] + arr[2] + arr[3] + ',' + miles[1]
                                            console.log(arr)
                                        }

                                        document.getElementById("inputPesos").value=conversionConFormato;
                                        calcularImpuestos(true);
                                    } else {
                                        document.getElementById("inputPesos").value='Ingrese valor positivo.'
                                        calcularImpuestos(false);
                                    }
                                   
                            }
                           
                           
                        }

                        function calcularImpuestos(bool){
                           
                            var valorPesos = document.getElementById("inputPesos").value;
                           
                            valorPesos = valorPesos.replace(/\./g,'')
                            valorPesos = valorPesos.replace(/\,/g,'.')
                            valorPesos = (parseFloat(valorPesos))

                            if(isNaN(valorPesos)||(!bool)){
                                document.getElementById("valorImpuestoPais").innerHTML=0;
                                document.getElementById("valorImpuestoGanancia").innerHTML=0;
                                document.getElementById("valorTotal").innerHTML=0;
                            } else {
                                pesosImpuestoPais=new Intl.NumberFormat("es-ES").format(parseFloat((valorPesos)*0.35).toFixed(2))
                                pesosImpuestoGanancia=new Intl.NumberFormat("es-ES").format(parseFloat((valorPesos)*0.30).toFixed(2))
                                pesosTotal=new Intl.NumberFormat("es-ES").format(parseFloat((valorPesos)*1.65).toFixed(2))

                                //Add . in 1.000
                                let arrMiles1 = pesosImpuestoPais.split(',');
                                   
                                    if((arrMiles1[0] < 10000)&&(arrMiles1[0]>999)){
                                        let arr = pesosImpuestoPais.split('');
                                        if (typeof(arrMiles1[1]) === 'undefined') {
                                            arrMiles1[1] = 00
                                        }
                                        pesosImpuestoPais = arr[0] + '.' + arr[1] + arr[2] + arr[3] + ',' + arrMiles1[1]
                                        console.log(arr)
                                    }
                               
                                let arrMiles2 = pesosImpuestoGanancia.split(',');
                                    if((arrMiles2[0] < 10000)&&(arrMiles2[0]>999)){
                                        let arr = pesosImpuestoGanancia.split('');
                                        if (typeof(arrMiles2[1]) === 'undefined') {
                                            arrMiles2[1] = 00
                                        }
                                        pesosImpuestoGanancia = arr[0] + '.' + arr[1] + arr[2] + arr[3] + ',' + arrMiles2[1]
                                        console.log(arr)
                                    }

                                let arrMiles3 = pesosTotal.split(',');
                                    if((arrMiles3[0] < 10000)&&(arrMiles3[0]>999)){
                                        let arr = pesosTotal.split('');
                                        if (typeof(arrMiles3[1]) === 'undefined') {
                                            arrMiles3[1] = 00
                                        }
                                        pesosTotal = arr[0] + '.' + arr[1] + arr[2] + arr[3] + ',' + arrMiles3[1]
                                        console.log(arr)
                                    }
                                document.getElementById("valorImpuestoPais").innerHTML=pesosImpuestoPais;
                                document.getElementById("valorImpuestoGanancia").innerHTML=pesosImpuestoGanancia;
                                document.getElementById("valorTotal").innerHTML=pesosTotal;
                            }

                        }