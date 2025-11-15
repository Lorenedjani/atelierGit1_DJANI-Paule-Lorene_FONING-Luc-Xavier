import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CooperativeSidebarComponent } from '../shared/cooperative-sidebar/cooperative-sidebar.component';
import { RecordProductionModalComponent, NewProductionRecord } from './record-production-modal/record-production-modal.component';
import { ExportModalComponent, ExportOptions } from './export-modal/export-modal.component';
import { ExportService } from '../services/export.service';

interface ProductionRecord {
  id: string;
  date: string;
  farmer: string;
  crop: string;
  quantity: string;
  grade: string;
  gradeClass: string;
  warehouse: string;
  value: string;
  status: string;
  statusClass: string;
}

@Component({
  selector: 'app-production',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    CooperativeSidebarComponent,
    RecordProductionModalComponent,
    ExportModalComponent
  ],
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent {
  user = { name: 'Emmanuel Njoya', role: 'Manager', initials: 'EN' };

  totalProduction = '287.5 MT';
  totalProductionPercent = '+15.2% vs last cycle';

  activeFarmers = 245;
  activeFarmersParticipation = '81.7% participation rate';

  gradeAProduction = '168.3 MT';
  gradeAPercent = '58.5% premium quality';

  thisMonthDeliveries = '42.8 MT';
  thisMonthChange = '+8.3% vs last month';

  searchQuery = '';
  selectedCrop = 'All Crops';
  selectedGrade = 'All Grades';

  cropTypes = ['All Crops', 'Cocoa', 'Coffee', 'Maize', 'Palm Oil', 'Cotton', 'Cassava'];
  qualityGrades = ['All Grades', 'Grade A', 'Grade B', 'Grade C'];

  // Modal states
  isRecordModalOpen = false;
  isExportModalOpen = false;

  productionRecords: ProductionRecord[] = [
    { id: 'PROD001', date: '04/10/2024', farmer: 'Kwame Osei (M001)', crop: 'Cocoa', quantity: '2.5 MT', grade: 'Grade A', gradeClass: 'grade-a', warehouse: 'Douala Warehouse', value: '5,250,000 XAF', status: 'Verified', statusClass: 'verified' },
    { id: 'PROD002', date: '04/10/2024', farmer: 'Arna Boateng (M002)', crop: 'Coffee', quantity: '1.8 MT', grade: 'Grade A', gradeClass: 'grade-a', warehouse: 'Yaoundé Warehouse', value: '3,960,000 XAF', status: 'Verified', statusClass: 'verified' },
    { id: 'PROD003', date: '03/10/2024', farmer: 'Yaw Mensah (M003)', crop: 'Cocoa', quantity: '3.2 MT', grade: 'Grade B', gradeClass: 'grade-b', warehouse: 'Douala Warehouse', value: '6,080,000 XAF', status: 'Verified', statusClass: 'verified' },
    { id: 'PROD004', date: '03/10/2024', farmer: 'Akosua Darko (M004)', crop: 'Maize', quantity: '4.5 MT', grade: 'Grade A', gradeClass: 'grade-a', warehouse: 'Garoua Warehouse', value: '2,250,000 XAF', status: 'Pending', statusClass: 'pending' },
    { id: 'PROD005', date: '02/10/2024', farmer: 'Kofi Asante (M005)', crop: 'Palm Oil', quantity: '1.2 MT', grade: 'Grade A', gradeClass: 'grade-a', warehouse: 'Douala Warehouse', value: '1,920,000 XAF', status: 'Verified', statusClass: 'verified' },
    { id: 'PROD006', date: '02/10/2024', farmer: 'Abena Owusu (M006)', crop: 'Cotton', quantity: '5.8 MT', grade: 'Grade B', gradeClass: 'grade-b', warehouse: 'Garoua Warehouse', value: '7,540,000 XAF', status: 'Verified', statusClass: 'verified' },
    { id: 'PROD007', date: '01/10/2024', farmer: 'Kwabena Amoah (M007)', crop: 'Cassava', quantity: '3.5 MT', grade: 'Grade A', gradeClass: 'grade-a', warehouse: 'Yaoundé Warehouse', value: '1,750,000 XAF', status: 'Verified', statusClass: 'verified' },
    { id: 'PROD008', date: '01/10/2024', farmer: 'Efua Agyeman (M008)', crop: 'Coffee', quantity: '2.1 MT', grade: 'Grade C', gradeClass: 'grade-c', warehouse: 'Yaoundé Warehouse', value: '3,780,000 XAF', status: 'Rejected', statusClass: 'rejected' },
  ];

  currentPage = 1;
  pageSize = 20;

  constructor(private exportService: ExportService) {}

  get filteredProduction(): ProductionRecord[] {
    return this.productionRecords.filter(record => {
      const searchLower = this.searchQuery.toLowerCase();
      const matchSearch =
        !this.searchQuery ||
        record.id.toLowerCase().includes(searchLower) ||
        record.farmer.toLowerCase().includes(searchLower) ||
        record.crop.toLowerCase().includes(searchLower);

      const matchCrop =
        this.selectedCrop === 'All Crops' || record.crop === this.selectedCrop;

      const matchGrade =
        this.selectedGrade === 'All Grades' || record.grade === this.selectedGrade;

      return matchSearch && matchCrop && matchGrade;
    });
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProduction.length / this.pageSize) || 1;
  }

  get paginatedProduction(): ProductionRecord[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredProduction.slice(startIndex, endIndex);
  }

  // Modal handlers
  onRecordProduction(): void {
    this.isRecordModalOpen = true;
  }

  onCloseRecordModal(): void {
    this.isRecordModalOpen = false;
  }

  onSubmitProduction(data: NewProductionRecord): void {
    // Generate new production ID
    const newId = `PROD${String(this.productionRecords.length + 1).padStart(3, '0')}`;
    
    // Get current date
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    
    // Determine grade class
    const gradeClass = data.grade === 'Grade A' ? 'grade-a' : 
                       data.grade === 'Grade B' ? 'grade-b' : 'grade-c';
    
    // Create new record
    const newRecord: ProductionRecord = {
      id: newId,
      date: formattedDate,
      farmer: data.farmer,
      crop: data.crop,
      quantity: `${data.quantity} MT`,
      grade: data.grade,
      gradeClass: gradeClass,
      warehouse: data.warehouse,
      value: `${data.value.toLocaleString()} XAF`,
      status: 'Pending',
      statusClass: 'pending'
    };
    
    // Add to beginning of array
    this.productionRecords.unshift(newRecord);
    
    // Show success message
    this.showSuccessMessage('Production record added successfully!');
  }

  onExport(): void {
    this.isExportModalOpen = true;
  }

  onCloseExportModal(): void {
    this.isExportModalOpen = false;
  }

  onExportData(options: ExportOptions): void {
    const dataToExport = options.includeFilters ? this.filteredProduction : this.productionRecords;
    
    // Convert to export format
    const exportData = dataToExport.map(record => ({
      id: record.id,
      date: record.date,
      farmer: record.farmer,
      crop: record.crop,
      quantity: record.quantity,
      grade: record.grade,
      warehouse: record.warehouse,
      value: record.value,
      status: record.status
    }));

    switch (options.format) {
      case 'csv':
        this.exportService.exportToCSV(exportData);
        this.showSuccessMessage('CSV file downloaded successfully!');
        break;
      case 'excel':
        this.exportService.exportToExcel(exportData);
        this.showSuccessMessage('Excel file downloaded successfully!');
        break;
      case 'pdf':
        this.exportService.exportToPDF(exportData);
        this.showSuccessMessage('PDF file downloaded successfully!');
        break;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  private showSuccessMessage(message: string): void {
    // You can implement a toast notification service here
    alert(message);
  }
}
