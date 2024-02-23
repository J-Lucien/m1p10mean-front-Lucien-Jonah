import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EnvService } from '../env/env.service';
import { Observable, catchError, of } from 'rxjs';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string;
  constructor(
    private httpClient: HttpClient,
    private route: Router,
    private envService: EnvService
  ) {
    this.baseUrl = this.envService.getBaseUrl();
  }

  signIn(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const formData = new FormData();
    const url = 'auth/login';
    formData.append('email', username);
    formData.append('motDePasse', password);
    return this.httpClient.post<any>(
      this.baseUrl + url,
      { email: username, motDePasse: password },
      { headers }
    );
  }

  signOut(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('email');
    this.route.navigateByUrl('login');
  }
}
