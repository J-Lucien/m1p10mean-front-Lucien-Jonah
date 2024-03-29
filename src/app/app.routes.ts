import { Routes } from '@angular/router';
import { AcceuilComponent } from './pages/acceuil/acceuil.component';
import { ManageEmployeComponent } from './pages/manage-employe/manage-employe.component';
import { ManageServiceComponent } from './pages/manage-service/manage-service.component';
import { ManageEmployeDetailsComponent } from './pages/manage-employe-details/manage-employe-details.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OffreSpecialeComponent } from './pages/offre-speciale/offre-speciale.component';
export const routes: Routes = [
    { path: '', component: AcceuilComponent },
    { path: 'manage/employe', component: ManageEmployeComponent },
    { path: 'manage/employe/:id', component: ManageEmployeDetailsComponent },
    { path: 'manage/service', component: ManageServiceComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'offre-speciale', component: OffreSpecialeComponent },
    { path: '**', redirectTo: '' }
];
