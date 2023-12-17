import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function Home() {

const [opcion1, setopcion1]= useState([])//aqui se guardara el array para el select 1
const [opcion2, setopcion2]= useState([])//aqui se guardara el array para el select 2
const [m2, setm2] = useState(20)//aqui se guardara el valor elejido para los metros cuadrados
const [eleccionPropiedad, setEleccionPropiedad]= useState("")//aqui se guardara lo seleccionado en el select para propiedad
const [eleccionUbicacion, setEleccionUbicacion]= useState("")//aqui se guardara lo seleccionado en el select para ubicaion
const [resultado, setresultado] = useState(0)//aqui se guardara el resultado de la fucion para cotizar
const URL = "/datos.json" //aqui se guardara la url de los datos usados por el fetch
const [datos, setdatos] = useState([])//aqui se guardara el array principal traido del .json

// uso el usefect para coordinar el evento asincronico que es el fetch. de no hacer esto no me renderiza nada. porque la funcion de ".map" se ejecuta antes de que carguen los datos
useEffect(() => {
  fetch(URL)
  .then(response => response.json() )
  .then(data => setdatos(data))
},[])

//uso el usefect para divir los datos de ubicaciones de los datos de propiedades cuando se cargue el array principal de datos.
//de no usar el useeffect los datos no se dividiran porque el array principal de datos todavia estara sin cargar
 useEffect(() => {
     const datosUbicacion = datos
       .filter((elemento)=> elemento.categoria === "ubicacion")
       .map((elemento) => elemento.tipo);
    const datospropiedad = datos
      .filter((elemento) => elemento.categoria === "propiedad")
       .map((elemento) => elemento.tipo);
  
      setopcion1([...new Set (datospropiedad)])
      setopcion2([...new Set (datosUbicacion)])

 },
 [datos])

//  funcion cotizar
//  aca le paso a la funcion los 3 valores alejidos en los select y los multiplico entre si para obtener el valor de la cotizacion
 const cotizar = () =>{
  console.log(eleccionPropiedad)
  console.log(eleccionUbicacion)
  console.log(m2)

  //busco el dato que me dio el evento que me dice que eleccion esta señalada en el select de propiedad
  const valorPropiedad = datos.find(
    (d)=> d.categoria === "propiedad" && d.tipo === eleccionPropiedad)?.factor;

  //busco el dato que me dio el evento que me dice que eleccion esta señalada en el select de propiedad
  const valorUbicacion = datos.find(
    (d)=> d.categoria === "ubicacion" && d.tipo === eleccionUbicacion)?.factor;


 setresultado(35.86 * valorPropiedad * valorUbicacion * m2)

 }


 //esta funcion crea un objeto con los datos de la cotizacion y lo pushea al array en el local storage
 const guardarenhistorial = ()=>{
  const cotizacion = {
                      fechaCotizacion: new Date().toLocaleString(),
                      propiedad:       eleccionPropiedad,
                      ubicacion:       eleccionUbicacion,
                      metrosCuadrados: m2,
                      poliza:          resultado
                    }
  console.log(cotizacion)

  const historialCotizaciones = JSON.parse(localStorage.getItem("historialCotizaciones")) || []
          historialCotizaciones.push(cotizacion)
          localStorage.setItem("historialCotizaciones", JSON.stringify(historialCotizaciones))

 }

  return (
    <>

    <div id='history' className="historial">
      <Link to='/historial'><span title="Ver Historial">📋</span></Link>
      {/* <a href="historial.html"><span title="Ver Historial">📋</span></a> */}
    </div>

    <h1 className="center separador">Seguros del hogar 🏡</h1>



    <h2 className="center separador">Completa los datos solicitados</h2>



    <div>
      <label htmlFor="propiedad">Selecciona el tipo de propiedad</label>
        <select onChange={(e) => setEleccionPropiedad(e.target.value)}>
          <option value="">Seleccion tu propiedad</option>
          {opcion1.map((ciudad)=>(
            <option key={ciudad} value={ciudad}>
              {ciudad}</option>
          ))}
        </select>
    </div>



     <div>
      <label htmlFor="ubicacion">Selecciona su ubicacion</label>
          <select onChange={(e) => setEleccionUbicacion(e.target.value)}>
          <option value="">Selecciona ubicacion</option>
          {opcion2.map(elemento=>{
            return(<option key={elemento} value={elemento}>{elemento}</option>)
          })}
          </select>
    </div> 



    <div>
    <label htmlFor="metros2">Ingresa los Metros cuadrados:</label>
      <input type="number" id="metros2" defaultValue="20" min="20" max="500" required onChange={(e) => setm2(parseInt(e.target.value))} />
  </div>

  <div className="center separador">
        <button className="button button-outline" onClick={cotizar}>Cotizar</button>
  </div>

    <div className="center separador">
      <p className="importe">Precio estimado: $ <span id="valorPoliza">{resultado}</span><span className="guardar" title="Guardar en historial" onClick={ guardarenhistorial()}>💾</span></p>
    </div>
    </>
  )
}

export default Home