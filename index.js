require('dotenv').config();

const Server = require('./models/server');

const servidorIniciado = new Server();

servidorIniciado.listen();
function liga() {
    fetch('/liga') // llamar a la ruta correspondiente en el servidor
      .then(response => response.text()) // obtener el contenido de la respuesta como texto
      .then(pdfContent => {
        // Crear un objeto Blob a partir del contenido del PDF
        const blob = new Blob([pdfContent], { type: 'application/pdf' });
        // Crear un objeto URL a partir del objeto Blob
        const url = URL.createObjectURL(blob);
        // Crear un enlace <a> con el objeto URL y simular un clic en él
        const link = document.createElement('a');
        link.href = url;
        link.download = 'liga.pdf'; // especificar el nombre de archivo de descarga
        link.click();
      })
      .catch(error => console.error(error));
  }
  