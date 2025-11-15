import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" *ngIf="isOpen" (click)="onOverlayClick($event)">
      <div class="modal-container" [class.modal-lg]="size === 'large'" [class.modal-sm]="size === 'small'">
        <div class="modal-header">
          <h2>{{ title }}</h2>
          <button class="close-btn" (click)="close()" aria-label="Close modal">&times;</button>
        </div>
        <div class="modal-body">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      animation: fadeIn 0.2s ease-out;
      padding: 20px;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .modal-container {
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      width: 100%;
      max-width: 600px;
      max-height: 90vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      animation: slideUp 0.3s ease-out;
    }

    @keyframes slideUp {
      from {
        transform: translateY(30px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .modal-container.modal-lg {
      max-width: 900px;
    }

    .modal-container.modal-sm {
      max-width: 400px;
    }

    .modal-header {
      padding: 24px 32px;
      border-bottom: 1px solid #e7e7e7;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #f9fafb;
    }

    .modal-header h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
      color: #328048;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 32px;
      color: #999;
      cursor: pointer;
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.2s;
    }

    .close-btn:hover {
      background: #f0f0f0;
      color: #333;
    }

    .modal-body {
      padding: 32px;
      overflow-y: auto;
      flex: 1;
    }

    @media (max-width: 768px) {
      .modal-container {
        max-width: 95%;
        margin: 10px;
      }

      .modal-header {
        padding: 20px 24px;
      }

      .modal-body {
        padding: 24px;
      }
    }
  `]
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Output() closeModal = new EventEmitter<void>();

  close(): void {
    this.closeModal.emit();
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }
}
