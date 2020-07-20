const xl = require('excel4node');

const REPORT_NAME = 'Reporte'

module.exports = {

    //Exports a XLSX report from the listed elements in array 
    exportReport: function (array) {
        var i = 2

        // Create a new instance of a Workbook class
        var wb = new xl.Workbook();
        
        // Add Worksheets to the workbook
        var ws = wb.addWorksheet(REPORT_NAME, { 
            'sheetFormat': { 
                'defaultColWidth': 30
            } 
        });
        
        // Create a reusable style
        var titles = wb.createStyle({
        font: {
            color: 'black',
            size: 12,
            bold: true
        }
        });
        
        // --------------------------------
        // Create titles for columns
        ws.cell(1, 1)
        .string('Fecha y hora')
        .style(titles)
        
        ws.cell(1, 2)
        .string('Descripcion')
        .style(titles);
        
        ws.cell(1, 3)
        .string('Tipo de Evento')
        .style(titles);
        // --------------------------------
        
        array.forEach(element => {

            ws.cell(i, 1)
            .string(element.fecha_y_hora)

            ws.cell(i, 2)
            .string(element.descripcion)

            ws.cell(i, 3)
            .string(element.tipo_evento)

            i++
        });
        
        wb.write('./src/views/ReporteExcel.xlsx');
        console.log('Excel file created!')
    }
}