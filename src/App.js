//import logo from './logo.svg';
//import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import {Persona} from "./components/rutas";

import './App.css';
import { Persona, Animal, Filtro, Dashboard } from "./components/rutas";
function App() {
    return (
        <Router>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <span className="fs-5 d-none d-sm-inline">Menu</span>
                            </a>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li className="nav-item">
                                    <a href="/" className="nav-link align-middle px-0">
                                        <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="nav-link px-0 align-middle">
                                        <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Orders</span></a>
                                </li>
                                <li>
                                    <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
                                        <i className="fs-4 bi-bootstrap"></i> <span className="ms-1 d-none d-sm-inline">Bootstrap</span></a>
                                    <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                        <li className="w-100">
                                        <Link to="/persona" className="nav-link px-0"> <span className="d-none d-sm-inline">Persona</span></Link>
                                        </li>
                                        <li>
                                        <Link to="/animal" className="nav-link px-0"> <span className="d-none d-sm-inline">Animal</span></Link>
                                        </li>
                                        <li>
                                        <Link to="/filtro" className="nav-link px-0"> <span className="d-none d-sm-inline">Filtros</span></Link>
                                        </li>
                                        <li>
                                        <Link to="/dashboard" className="nav-link px-0"> <span className="d-none d-sm-inline">DASH</span></Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <hr/>
                            <div className="dropdown pb-4">
                                <a href="/" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle"/>
                                    <span className="d-none d-sm-inline mx-1">loser</span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                    <li><a className="dropdown-item" href="/">Profile</a></li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li><a className="dropdown-item" href="/">Sign out</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col py-3">
                        <Routes>
                            <Route path="/persona" element={<Persona />} />
                            <Route path="/animal" element={<Animal />} />
                            <Route path="/filtro" element={<Filtro />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;