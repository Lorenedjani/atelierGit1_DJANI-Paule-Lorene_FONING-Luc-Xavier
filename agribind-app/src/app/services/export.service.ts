import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export interface ProductionRecord {
  id: string;
  date: string;
  farmer: string;
  crop: string;
  quantity: string;
  grade: string;
  warehouse: string;
  value: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  exportToCSV(data: ProductionRecord[], filename: string = 'production-data'): void {
    const headers = ['Production ID', 'Date', 'Farmer', 'Crop', 'Quantity', 'Grade', 'Warehouse', 'Value (XAF)', 'Status'];
    
    const csvContent = [
      headers.join(','),
      ...data.map(record => [
        record.id,
        record.date,
        `"${record.farmer}"`,
        record.crop,
        record.quantity,
        record.grade,
        record.warehouse,
        record.value,
        record.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${filename}_${this.getTimestamp()}.csv`);
  }

  exportToExcel(data: ProductionRecord[], filename: string = 'production-data'): void {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map(record => ({
        'Production ID': record.id,
        'Date': record.date,
        'Farmer': record.farmer,
        'Crop': record.crop,
        'Quantity': record.quantity,
        'Grade': record.grade,
        'Warehouse': record.warehouse,
        'Value (XAF)': record.value,
        'Status': record.status
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Production Data');

    // Set column widths
    const maxWidth = 20;
    worksheet['!cols'] = [
      { wch: 12 }, // Production ID
      { wch: 12 }, // Date
      { wch: maxWidth }, // Farmer
      { wch: 12 }, // Crop
      { wch: 10 }, // Quantity
      { wch: 10 }, // Grade
      { wch: 18 }, // Warehouse
      { wch: 15 }, // Value
      { wch: 10 }  // Status
    ];

    XLSX.writeFile(workbook, `${filename}_${this.getTimestamp()}.xlsx`);
  }

  exportToPDF(data: ProductionRecord[], filename: string = 'production-data'): void {
    const doc = new jsPDF('l', 'mm', 'a4'); // landscape orientation
    
    // Add title
    doc.setFontSize(18);
    doc.setTextColor(50, 128, 72);
    doc.text('Agribind - Production Report', 14, 15);
    
    // Add date
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 22);
    
    // Add table
    autoTable(doc, {
      startY: 28,
      head: [['Production ID', 'Date', 'Farmer', 'Crop', 'Quantity', 'Grade', 'Warehouse', 'Value (XAF)', 'Status']],
      body: data.map(record => [
        record.id,
        record.date,
        record.farmer,
        record.crop,
        record.quantity,
        record.grade,
        record.warehouse,
        record.value,
        record.status
      ]),
      theme: 'grid',
      headStyles: {
        fillColor: [50, 128, 72],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9
      },
      bodyStyles: {
        fontSize: 8,
        textColor: [44, 44, 44]
      },
      alternateRowStyles: {
        fillColor: [249, 250, 251]
      },
      margin: { top: 28, left: 14, right: 14 },
      styles: {
        cellPadding: 3,
        overflow: 'linebreak',
        cellWidth: 'wrap'
      },
      columnStyles: {
        0: { cellWidth: 22 },
        1: { cellWidth: 22 },
        2: { cellWidth: 40 },
        3: { cellWidth: 20 },
        4: { cellWidth: 20 },
        5: { cellWidth: 18 },
        6: { cellWidth: 35 },
        7: { cellWidth: 28 },
        8: { cellWidth: 20 }
      }
    });

    // Add footer
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }

    doc.save(`${filename}_${this.getTimestamp()}.pdf`);
  }

  private getTimestamp(): string {
    const now = new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
  }
}
