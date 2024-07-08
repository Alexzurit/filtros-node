// src/components/Dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
    const [mascotaData, setMascotaData] = useState([]);
    const [regionData, setRegionData] = useState([]);

    useEffect(() => {
        const fetchMascotaData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/mascota');
                const data = await response.json();
                console.log('Mascota Data:', data); // Verificar los datos en la consola
                setMascotaData(data);
            } catch (error) {
                console.error('Error fetching mascota data:', error);
            }
        };

        const fetchRegionData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/region');
                const data = await response.json();
                console.log('Region Data:', data); // Verificar los datos en la consola
                setRegionData(data);
            } catch (error) {
                console.error('Error fetching region data:', error);
            }
        };

        fetchMascotaData();
        fetchRegionData();
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div>
            <h1>Dashboard</h1>
            
            <h2>Gráfico de Mascotas por Edad</h2>
            <BarChart width={600} height={300} data={mascotaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="edad" fill="#8884d8" />
            </BarChart>

            <h2>Gráfico Circular de Población por Ciudad</h2>
            <PieChart width={400} height={400}>
                <Pie
                    data={regionData}
                    dataKey="poblacion"
                    nameKey="ciudad"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label
                >
                    {regionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default Dashboard;
