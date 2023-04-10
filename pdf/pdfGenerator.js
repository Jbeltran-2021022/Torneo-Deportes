const { PDFDocument } = require('pdf-lib');

const fs = require('fs');

function generarPDF(data) {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream('tabla_ligas.pdf'));

  // Título del documento
  doc.fontSize(18).text('Tabla de Ligas', { align: 'center' });
  doc.moveDown();

  // Cabezal de la tabla
  doc.fontSize(12).font('Helvetica-Bold');
  doc.cell(50, 30, 'Equipo');
  doc.cell(50, 30, 'Puntos', { align: 'right' });
  doc.cell(50, 30, 'GF', { align: 'right' });
  doc.cell(50, 30, 'GC', { align: 'right' });
  doc.cell(50, 30, 'Dif.', { align: 'right' });
  doc.moveDown();

  // Cuerpo de la tabla
  doc.fontSize(12).font('Helvetica');
  for (let i = 0; i < data.length; i++) {
    const equipo = data[i];
    doc.cell(50, 20, equipo.nombre);
    doc.cell(50, 20, equipo.puntos.toString(), { align: 'right' });
    doc.cell(50, 20, equipo.golesFavor.toString(), { align: 'right' });
    doc.cell(50, 20, equipo.golesContra.toString(), { align: 'right' });
    doc.cell(50, 20, (equipo.golesFavor - equipo.golesContra).toString(), { align: 'right' });
    doc.moveDown();
  }

  doc.end();
}

module.exports = generarPDF;
