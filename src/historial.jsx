import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function Historial() {
    const historialCotizaciones = JSON.parse(localStorage.getItem("historialCotizaciones")) || []



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
            <Link to="/"><button className="button button-outline">VOLVER</button></Link>
        </div>
    </div>
        </>
    )
}

export default Historial