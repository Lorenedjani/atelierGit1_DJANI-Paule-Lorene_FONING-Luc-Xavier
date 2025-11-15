import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/modal/modal.component';

export type ExportFormat = 'csv' | 'excel' | 'pdf';

export interface ExportOptions {
  format: ExportFormat;
  includeFilters: boolean;
}

@Component({
  selector: 'app-export-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  template: `
    <app-modal 
      [isOpen]="isOpen" 
      [title]="'Export Production Data'" 
      [size]="'medium'"
      (closeModal)="onClose()">
      
      <div class="export-content">
        <p class="description">
          Choose your preferred export format. The file will include all production records based on your current filters.
        </p>

        <div class="export-stats">
          <div class="stat-item">
            <span class="stat-label">Records to export:</span>
            <span class="stat-value">{{ recordCount }}</span>
          </div>
        </div>

        <div class="format-options">
          <div 
            class="format-card" 
            [class.selected]="selectedFormat === 'csv'"
            (click)="selectFormat('csv')">
            <div class="format-icon">📄</div>
            <div class="format-info">
              <h3>CSV</h3>
              <p>Comma-separated values, compatible with Excel and spreadsheet applications</p>
            </div>
            <div class="format-check" *ngIf="selectedFormat === 'csv'">✓</div>
          </div>

          <div 
            class="format-card" 
            [class.selected]="selectedFormat === 'excel'"
            (click)="selectFormat('excel')">
            <div class="format-icon">📊</div>
            <div class="format-info">
              <h3>Excel</h3>
              <p>Microsoft Excel format with formatted columns and styling</p>
            </div>
            <div class="format-check" *ngIf="selectedFormat === 'excel'">✓</div>
          </div>

          <div 
            class="format-card" 
            [class.selected]="selectedFormat === 'pdf'"
            (click)="selectFormat('pdf')">
            <div class="format-icon">📑</div>
            <div class="format-info">
              <h3>PDF</h3>
              <p>Portable document format, ideal for printing and sharing</p>
            </div>
            <div class="format-check" *ngIf="selectedFormat === 'pdf'">✓</div>
          </div>
        </div>

        <div class="export-options">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              [(ngModel)]="includeFilters"
              name="includeFilters">
            <span>Apply current filters to export</span>
          </label>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn btn-secondary" (click)="onClose()">
            Cancel
          </button>
          <button 
            type="button" 
            class="btn btn-primary" 
            (click)="onExport()"
            [disabled]="!selectedFormat">
            <span class="btn-icon">⬇</span>
            Export {{ selectedFormat?.toUpperCase() || 'File' }}
          </button>
        </div>
      </div>
    </app-modal>
  `,
  styles: [`
    .export-content {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .description {
      color: #666;
      font-size: 15px;
      line-height: 1.6;
      margin: 0;
    }

    .export-stats {
      background: #f0f7f1;
      border-radius: 12px;
      padding: 16px 20px;
      border-left: 4px solid #328048;
    }

    .stat-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .stat-label {
      font-size: 14px;
      color: #555;
      font-weight: 500;
    }

    .stat-value {
      font-size: 20px;
      font-weight: 700;
      color: #328048;
    }

    .format-options {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .format-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      border: 2px solid #e0e0e0;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s;
      background: white;
      position: relative;
    }

    .format-card:hover {
      border-color: #328048;
      background: #f9fdfb;
      transform: translateX(4px);
    }

    .format-card.selected {
      border-color: #328048;
      background: #f0f7f1;
      box-shadow: 0 4px 12px rgba(50, 128, 72, 0.15);
    }

    .format-icon {
      font-size: 32px;
      flex-shrink: 0;
    }

    .format-info {
      flex: 1;
    }

    .format-info h3 {
      margin: 0 0 4px;
      font-size: 16px;
      font-weight: 700;
      color: #333;
    }

    .format-info p {
      margin: 0;
      font-size: 13px;
      color: #777;
      line-height: 1.4;
    }

    .format-check {
      width: 28px;
      height: 28px;
      background: #328048;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 700;
      flex-shrink: 0;
    }

    .export-options {
      padding: 16px;
      background: #fafafa;
      border-radius: 10px;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      font-size: 14px;
      color: #555;
      font-weight: 500;
    }

    .checkbox-label input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: #328048;
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding-top: 24px;
      border-top: 1px solid #e7e7e7;
    }

    .btn {
      padding: 12px 28px;
      border-radius: 24px;
      font-weight: 600;
      font-size: 15px;
      cursor: pointer;
      border: none;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-primary {
      background: #328048;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: #276233;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(50, 128, 72, 0.3);
    }

    .btn-secondary {
      background: #f0f0f0;
      color: #555;
    }

    .btn-secondary:hover {
      background: #e0e0e0;
    }

    .btn-icon {
      font-size: 18px;
    }

    @media (max-width: 768px) {
      .format-card {
        padding: 16px;
      }

      .format-icon {
        font-size: 28px;
      }

      .modal-actions {
        flex-direction: column-reverse;
      }

      .btn {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class ExportModalComponent {
  @Input() isOpen = false;
  @Input() recordCount = 0;
  @Output() closeModal = new EventEmitter<void>();
  @Output() exportData = new EventEmitter<ExportOptions>();

  selectedFormat: ExportFormat | null = null;
  includeFilters = true;

  selectFormat(format: ExportFormat): void {
    this.selectedFormat = format;
  }

  onClose(): void {
    this.selectedFormat = null;
    this.includeFilters = true;
    this.closeModal.emit();
  }

  onExport(): void {
    if (this.selectedFormat) {
      this.exportData.emit({
        format: this.selectedFormat,
        includeFilters: this.includeFilters
      });
      this.onClose();
    }
  }
}
