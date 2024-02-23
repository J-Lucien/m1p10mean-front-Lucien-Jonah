import { InscriptionComponent } from '../auth/inscription/inscription.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { DockModule } from 'primeng/dock';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { LoginComponent } from '../auth/login/login.component';
import { LogoutConfirmationComponent } from '../logout-confirmation/logout-confirmation.component';
import { MatBadgeModule } from '@angular/material/badge';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SpeedDialModule,
    ToastModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule,
    MatDividerModule,
    MatButtonModule,
    DockModule,
    AutoCompleteModule,
    FormsModule,
    TableModule,
    TagModule,
    LoginComponent,
    CommonModule,
    LogoutConfirmationComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() confirmLogout = new EventEmitter<void>();
  isLoggedIn: boolean = true;
  showConfirmationModalLogout: boolean = false;
  user: any = {
    nom: 'Jonah',
    prenom: 'Fitia',
  };
  decodedToken: any = '';

  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(InscriptionComponent);
  }
  openDialogLogin() {
    this.dialog.open(LoginComponent);
  }

  openConfirmationModal() {
    this.showConfirmationModalLogout = true;
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
}
