import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './home.jsx'
import Historial from './historial.jsx'

function App() {

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


  const historialCotizaciones = JSON.parse(localStorage.getItem("historialCotizaciones")) || []
          historialCotizaciones.push(cotizacion)
          localStorage.setItem("historialCotizaciones", JSON.stringify(historialCotizaciones))

 }

  return (
    <>

<BrowserRouter>

      <Routes>
        <Route path='/' exact element={ <Home />}/>
        <Route path='/historial' element={ <Historial />}/>
    </Routes>
</BrowserRouter>
    </>
  )
}

export default App