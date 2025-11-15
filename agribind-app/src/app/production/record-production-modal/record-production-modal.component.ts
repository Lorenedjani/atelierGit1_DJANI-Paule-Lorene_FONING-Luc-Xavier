import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/modal/modal.component';

export interface NewProductionRecord {
  farmer: string;
  crop: string;
  quantity: number;
  grade: string;
  warehouse: string;
  value: number;
  notes?: string;
}

@Component({
  selector: 'app-record-production-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  template: `
    <app-modal 
      [isOpen]="isOpen" 
      [title]="'Record New Production'" 
      [size]="'large'"
      (closeModal)="onClose()">
      
      <form (ngSubmit)="onSubmit()" #productionForm="ngForm">
        <div class="form-grid">
          <!-- Farmer Selection -->
          <div class="form-group">
            <label for="farmer">Farmer <span class="required">*</span></label>
            <select 
              id="farmer" 
              name="farmer" 
              [(ngModel)]="formData.farmer" 
              required
              class="form-control"
              [class.error]="productionForm.submitted && !formData.farmer">
              <option value="">Select Farmer</option>
              <option *ngFor="let farmer of farmers" [value]="farmer">{{ farmer }}</option>
            </select>
            <span class="error-message" *ngIf="productionForm.submitted && !formData.farmer">
              Farmer is required
            </span>
          </div>

          <!-- Crop Type -->
          <div class="form-group">
            <label for="crop">Crop Type <span class="required">*</span></label>
            <select 
              id="crop" 
              name="crop" 
              [(ngModel)]="formData.crop" 
              required
              class="form-control"
              [class.error]="productionForm.submitted && !formData.crop">
              <option value="">Select Crop</option>
              <option *ngFor="let crop of crops" [value]="crop">{{ crop }}</option>
            </select>
            <span class="error-message" *ngIf="productionForm.submitted && !formData.crop">
              Crop type is required
            </span>
          </div>

          <!-- Quantity -->
          <div class="form-group">
            <label for="quantity">Quantity (MT) <span class="required">*</span></label>
            <input 
              type="number" 
              id="quantity" 
              name="quantity" 
              [(ngModel)]="formData.quantity" 
              required
              min="0.1"
              step="0.1"
              placeholder="e.g., 2.5"
              class="form-control"
              [class.error]="productionForm.submitted && (!formData.quantity || formData.quantity <= 0)">
            <span class="error-message" *ngIf="productionForm.submitted && (!formData.quantity || formData.quantity <= 0)">
              Valid quantity is required
            </span>
          </div>

          <!-- Quality Grade -->
          <div class="form-group">
            <label for="grade">Quality Grade <span class="required">*</span></label>
            <select 
              id="grade" 
              name="grade" 
              [(ngModel)]="formData.grade" 
              required
              class="form-control"
              [class.error]="productionForm.submitted && !formData.grade">
              <option value="">Select Grade</option>
              <option value="Grade A">Grade A</option>
              <option value="Grade B">Grade B</option>
              <option value="Grade C">Grade C</option>
            </select>
            <span class="error-message" *ngIf="productionForm.submitted && !formData.grade">
              Quality grade is required
            </span>
          </div>

          <!-- Warehouse -->
          <div class="form-group">
            <label for="warehouse">Warehouse <span class="required">*</span></label>
            <select 
              id="warehouse" 
              name="warehouse" 
              [(ngModel)]="formData.warehouse" 
              required
              class="form-control"
              [class.error]="productionForm.submitted && !formData.warehouse">
              <option value="">Select Warehouse</option>
              <option *ngFor="let warehouse of warehouses" [value]="warehouse">{{ warehouse }}</option>
            </select>
            <span class="error-message" *ngIf="productionForm.submitted && !formData.warehouse">
              Warehouse is required
            </span>
          </div>

          <!-- Estimated Value -->
          <div class="form-group">
            <label for="value">Estimated Value (XAF) <span class="required">*</span></label>
            <input 
              type="number" 
              id="value" 
              name="value" 
              [(ngModel)]="formData.value" 
              required
              min="0"
              step="1000"
              placeholder="e.g., 5250000"
              class="form-control"
              [class.error]="productionForm.submitted && (!formData.value || formData.value <= 0)">
            <span class="error-message" *ngIf="productionForm.submitted && (!formData.value || formData.value <= 0)">
              Valid value is required
            </span>
          </div>
        </div>

        <!-- Notes (Full Width) -->
        <div class="form-group full-width">
          <label for="notes">Additional Notes</label>
          <textarea 
            id="notes" 
            name="notes" 
            [(ngModel)]="formData.notes" 
            rows="3"
            placeholder="Enter any additional information about this production..."
            class="form-control"></textarea>
        </div>

        <!-- Action Buttons -->
        <div class="modal-actions">
          <button type="button" class="btn btn-secondary" (click)="onClose()">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">
            <span class="btn-icon">✓</span>
            Record Production
          </button>
        </div>
      </form>
    </app-modal>
  `,
  styles: [`
    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      margin-bottom: 24px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group.full-width {
      grid-column: 1 / -1;
    }

    label {
      font-size: 14px;
      font-weight: 600;
      color: #444;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
    }

    .required {
      color: #e64a4a;
      margin-left: 4px;
    }

    .form-control {
      padding: 12px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      font-size: 15px;
      color: #333;
      background: #fafafa;
      transition: all 0.2s;
      font-family: inherit;
    }

    .form-control:focus {
      outline: none;
      border-color: #328048;
      background: white;
      box-shadow: 0 0 0 3px rgba(50, 128, 72, 0.1);
    }

    .form-control.error {
      border-color: #e64a4a;
      background: #fff5f5;
    }

    .error-message {
      color: #e64a4a;
      font-size: 13px;
      margin-top: 6px;
      font-weight: 500;
    }

    textarea.form-control {
      resize: vertical;
      min-height: 80px;
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 32px;
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

    .btn-primary {
      background: #328048;
      color: white;
    }

    .btn-primary:hover {
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
      .form-grid {
        grid-template-columns: 1fr;
        gap: 20px;
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
export class RecordProductionModalComponent {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitProduction = new EventEmitter<NewProductionRecord>();

  formData: NewProductionRecord = {
    farmer: '',
    crop: '',
    quantity: 0,
    grade: '',
    warehouse: '',
    value: 0,
    notes: ''
  };

  farmers = [
    'Kwame Osei (M001)',
    'Arna Boateng (M002)',
    'Yaw Mensah (M003)',
    'Akosua Darko (M004)',
    'Kofi Asante (M005)',
    'Abena Owusu (M006)',
    'Kwabena Amoah (M007)',
    'Efua Agyeman (M008)',
    'Nana Addo (M009)',
    'Ama Serwaa (M010)'
  ];

  crops = ['Cocoa', 'Coffee', 'Maize', 'Palm Oil', 'Cotton', 'Cassava'];

  warehouses = [
    'Douala Warehouse',
    'Yaoundé Warehouse',
    'Garoua Warehouse',
    'Bamenda Warehouse'
  ];

  onClose(): void {
    this.resetForm();
    this.closeModal.emit();
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      this.submitProduction.emit({ ...this.formData });
      this.onClose();
    }
  }

  private isFormValid(): boolean {
    return !!(
      this.formData.farmer &&
      this.formData.crop &&
      this.formData.quantity > 0 &&
      this.formData.grade &&
      this.formData.warehouse &&
      this.formData.value > 0
    );
  }

  private resetForm(): void {
    this.formData = {
      farmer: '',
      crop: '',
      quantity: 0,
      grade: '',
      warehouse: '',
      value: 0,
      notes: ''
    };
  }
}
