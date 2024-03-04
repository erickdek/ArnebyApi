import axios from 'axios';

async function getLocation({ latitud, longitud }) {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitud}&lon=${longitud}&zoom=18&addressdetails=1`);
        
        const { address } = response.data;
        const country = address.country;
        const province = address.state;
        
        return { country, province };
    } catch (error) {
        console.error('Error al obtener la ubicación:', error);
        throw error;
    }
}

export default getLocation;