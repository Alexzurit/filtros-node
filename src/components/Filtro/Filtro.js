import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Pagination, Form } from 'react-bootstrap';
import './Filtro.css';

const Filtro = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const pagesToShow = 5; // Número de páginas a mostrar en el paginador
    const [filterType, setFilterType] = useState(''); // Estado para el filtro de TYPE
    const [filterApplication, setFilterApplication] = useState(''); // Estado para el filtro de APPLICATION
    const [filterProtocol, setFilterProtocol] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/security');
                const result = await response.json();
                const mappedData = result.map(item => ({
                    NAME: item.NAME,
                    TYPE: item.TYPE,
                    SEVERITY: item.SEVERITY,
                    SOURCE: item.SOURCE,
                    DESTINATION: item.DESTINATION,
                    APPLICATION: item.APPLICATION,
                    PROTOCOL: item.PROTOCOL,
                    POLICY_ID: item['POLICY ID'], // Acceso usando corchetes para nombres con espacios
                    POLICY_TYPE: item['POLICY TYPE'],
                    END_TIME: item['END TIME'],
                    ACTION: item.ACTION
                }));

                setData(mappedData);
            } catch (err) {
                console.error('Error al obtener datos:', err);
            }
        };

        fetchData();
    }, []);

    // Paginación: Lógica para manejar el cambio de página
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calcular los datos a mostrar en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Filtra los datos basado en los filtros seleccionados
    const filteredData = data.filter(item => 
        (filterType ? item.TYPE === filterType : true) &&
        (filterApplication ? item.APPLICATION === filterApplication : true)&&
        (filterProtocol ? item.PROTOCOL === filterProtocol: true)
    );

    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Lógica para calcular qué páginas mostrar en el paginador
    const pageNumbers = [];
    for (let i = Math.max(1, currentPage - Math.floor(pagesToShow / 2)); i <= Math.min(totalPages, currentPage + Math.floor(pagesToShow / 2)); i++) {
        pageNumbers.push(i);
    }

    // Función para obtener opciones únicas de una columna específica
    const getUniqueValues = (column) => {
        const values = data.map(item => item[column]);
        return [...new Set(values)];
    };

    // Manejar el cambio de los filtros
    const handleFilterTypeChange = (e) => {
        setFilterType(e.target.value); // Actualiza el estado con la categoría seleccionada
        setCurrentPage(1); // Reinicia la página actual al cambiar la categoría
    };

    const handleFilterApplicationChange = (e) => {
        setFilterApplication(e.target.value); // Actualiza el estado con la categoría seleccionada
        setCurrentPage(1); // Reinicia la página actual al cambiar la categoría
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="my-4">Datos de tb_security</h1>
                    <div className="col-md-4 justify-content-center mt-3 mb-3">
                        <Form.Group controlId="filterTypeSelect">
                            <Form.Label>Filtrar por Type:</Form.Label>
                            <Form.Control as="select" onChange={handleFilterTypeChange}>
                                <option value="">Mostrar Todo</option>
                                {getUniqueValues('TYPE').map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="filterApplicationSelect" className="ml-3">
                            <Form.Label>Filtrar por Aplicación:</Form.Label>
                            <Form.Control as="select" onChange={handleFilterApplicationChange}>
                                <option value="">Mostrar Todo</option>
                                {getUniqueValues('APPLICATION').map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="filterProtocolSelect" className="ml-3">
                            <Form.Label>Filtrar por Protocolo:</Form.Label>
                            <Form.Control as="select" onChange={handleFilterApplicationChange}>
                                <option value="">Mostrar Todo</option>
                                {getUniqueValues('PROTOCOL').map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="table-container">
                        <Table striped bordered responsive hover className="table-sm">
                            <thead className="text-sm">
                                <tr>
                                    <th>NAME</th>
                                    <th>TYPE</th>
                                    <th>SEVERITY</th>
                                    <th>SOURCE</th>
                                    <th>DESTINATION</th>
                                    <th>APPLICATION</th>
                                    <th>PROTOCOL</th>
                                    <th>END TIME</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {currentItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.NAME}</td>
                                        <td>{item.TYPE}</td>
                                        <td>{item.SEVERITY}</td>
                                        <td>{item.SOURCE}</td>
                                        <td>{item.DESTINATION}</td>
                                        <td>{item.APPLICATION}</td>
                                        <td>{item.PROTOCOL}</td>
                                        <td>{item.END_TIME}</td>
                                        <td>{item.ACTION}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div className="row justify-content-center">
                        <Pagination className="pagination-sm">
                            <Pagination.First onClick={() => handlePageChange(1)} />
                            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                            {pageNumbers.map(number => (
                                <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                                    {number}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                            <Pagination.Last onClick={() => handlePageChange(totalPages)} />
                        </Pagination>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filtro;
