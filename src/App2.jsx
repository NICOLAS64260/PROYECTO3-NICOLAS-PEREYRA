import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App2() {
    const historialCotizaciones = JSON.parse(localStorage.getItem("historialCotizaciones")) || []
    console.log(historialCotizaciones);



    return (
        <>
            <h1 className="center separador">Ver Historial 📋</h1>
    <div className=" center div-cotizador">
        <table>
            <thead>
                <tr>
                    <th>Fecha de cotización</th>
                    <th>Propiedad</th>
                    <th>Ubicación</th>
                    <th>Metros cuadrados</th>
                    <th>Póliza mensual</th>
                </tr>
            </thead>
            <tbody>
                {historialCotizaciones.map(elemento=>{
            return(<tr>
                <td>{elemento.fechaCotizacion}</td>
                <td>{elemento.propiedad}</td>
                <td>{elemento.ubicacion}</td>
                <td>{elemento.metrosCuadrados}</td>
                <td>{elemento.poliza}</td>
                </tr>
            )
          })}
                    
            </tbody>
        </table>
        <div className="center separador">
            <a  href="index.html"><button className="button button-outline">VOLVER</button></a>
        </div>
    </div>
        </>
    )
}

export default App2