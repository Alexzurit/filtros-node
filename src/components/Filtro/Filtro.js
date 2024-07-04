import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Pagination } from 'react-bootstrap';
import './Filtro.css';
/*function Filtro(){
    return(
        <div>
            <h2>Sección Filtros</h2>
            <p>Contenido de la Sección</p>
        </div>
    );
}*/
const Filtro = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const pagesToShow = 5; // Número de páginas a mostrar en el paginador

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/security');
                const result = await response.json();
                // Mapeo de datos para ajustar nombres de propiedades
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
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Lógica para calcular qué páginas mostrar en el paginador
    const pageNumbers = [];
    for (let i = Math.max(1, currentPage - Math.floor(pagesToShow / 2)); i <= Math.min(totalPages, currentPage + Math.floor(pagesToShow / 2)); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="my-4">Datos de tb_security</h1>
                    <div className="row justify-content-center mt-3">
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
                                    {/*<th>POLICY ID</th>
                                    <th>POLICY TYPE</th>*/}
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
                                        {/*<td>{item.POLICY_ID}</td>
                                        <td>{item.POLICY_TYPE}</td>*/}
                                        <td>{item.END_TIME}</td>
                                        <td>{item.ACTION}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filtro;