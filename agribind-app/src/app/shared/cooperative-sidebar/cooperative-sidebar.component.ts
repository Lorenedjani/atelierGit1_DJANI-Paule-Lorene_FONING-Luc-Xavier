import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cooperative-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar">
      <div class="logo">
        <div class="logo-icon">🌾</div>
        <h2>Agribind</h2>
        <p>Cameroon Cooperative</p>
      </div>
      
      <nav class="nav-menu">
        <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
          <span class="icon">📊</span>
          <span>Dashboard</span>
        </a>
        <a routerLink="/members" routerLinkActive="active" class="nav-item">
          <span class="icon">👥</span>
          <span>Members</span>
        </a>
        <a routerLink="/production" routerLinkActive="active" class="nav-item active">
          <span class="icon">📦</span>
          <span>Production</span>
        </a>
        <a routerLink="/inventory" routerLinkActive="active" class="nav-item">
          <span class="icon">📋</span>
          <span>Inventory</span>
        </a>
        <a routerLink="/microcredits" routerLinkActive="active" class="nav-item">
          <span class="icon">💰</span>
          <span>Microcredits</span>
        </a>
        <a routerLink="/contracts" routerLinkActive="active" class="nav-item">
          <span class="icon">📄</span>
          <span>Contracts</span>
        </a>
        <a routerLink="/transactions" routerLinkActive="active" class="nav-item">
          <span class="icon">💳</span>
          <span>Transactions</span>
        </a>
        <a routerLink="/communications" routerLinkActive="active" class="nav-item">
          <span class="icon">💬</span>
          <span>Communications</span>
        </a>
        <a routerLink="/plant-health" routerLinkActive="active" class="nav-item">
          <span class="icon">🌱</span>
          <span>Plant Health</span>
        </a>
        <a routerLink="/reports" routerLinkActive="active" class="nav-item">
          <span class="icon">📈</span>
          <span>Reports</span>
        </a>
        <a routerLink="/settings" routerLinkActive="active" class="nav-item">
          <span class="icon">⚙️</span>
          <span>Settings</span>
        </a>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 240px;
      height: 100vh;
      background: #fff;
      border-right: 1px solid #ddd;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      overflow-y: auto;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 1001;
    }

    .logo {
      padding: 24px 20px;
      border-bottom: 1px solid #e7e7e7;
      text-align: center;
    }

    .logo-icon {
      font-size: 36px;
      margin-bottom: 8px;
    }

    .logo h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: #328048;
    }

    .logo p {
      margin: 4px 0 0;
      font-size: 12px;
      color: #777;
    }

    .nav-menu {
      padding: 16px 0;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      color: #555;
      text-decoration: none;
      transition: all 0.2s;
      cursor: pointer;
      gap: 12px;
    }

    .nav-item:hover {
      background: #f0f7f1;
      color: #328048;
    }

    .nav-item.active {
      background: #328048;
      color: white;
      border-left: 4px solid #276233;
    }

    .nav-item .icon {
      font-size: 18px;
      width: 24px;
      text-align: center;
    }
  `]
})
export class CooperativeSidebarComponent {}
