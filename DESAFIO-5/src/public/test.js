const fs = require('fs/promises')
console.log("TESTING")
async function obtenerDatosJson() {
    try {
        const response = await fs.readFile(this.path, 'utf-8') 
        const jsonData = JSON.parse(response)
        document.getElementById('jsonData').textContent = JSON.stringify(jsonData, null, 2);
    } catch (error) {
        console.error('Error al obtener datos JSON:', error);
    }
}

obtenerDatosJson();