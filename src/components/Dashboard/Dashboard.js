// src/components/Dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
    const [mascotaData, setMascotaData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/mascota');
                const data = await response.json();
                //console.log(data); // Verificar los datos en la consola
                setMascotaData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Gráfico de Mascotas por Edad</h1>
            <BarChart width={600} height={300} data={mascotaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" /> {/* Mostramos el nombre de la mascota */}
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="edad" fill="#8884d8" /> {/* Mostramos la edad de las mascotas */}
            </BarChart>
        </div>
    );
};

export default Dashboard;
