import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Observable, Subscription, catchError, of } from 'rxjs';
import { HeaderComponent } from '../../header/header.component';
interface LoginResponse {
  error: boolean;
  message: string;
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    DialogModule,
    MatButtonModule,
    CommonModule,
    HeaderComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginFormGroup!: FormGroup;
  subscriptions: Subscription[] = [];
  loginResponse: LoginResponse | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  seConnecter() {
    if (!this.loginFormGroup.invalid) {
      console.info(this.loginFormGroup.value);
      const username: string = this.loginFormGroup.value.email ?? '';
      const password: string = this.loginFormGroup.value.password ?? '';

      const subscribe = this.authService
        .signIn(username, password)
        .pipe(catchError(this.handleError(`login ${username}`)))
        .subscribe((data) => {
          localStorage.setItem('access_token', data['token']);
          localStorage.setItem('email', data['email']);

          this.router.navigateByUrl('');
        });

      this.subscriptions.push(subscribe);
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('🚀 ~ LoginComponent ~ return ~ error:', error.status);

      if (error.status == 401) {
        // Bad credentials
        const errorMessage = error.error.error;
        this.loginResponse = { error: true, message: errorMessage };
        console.log(
          '🚀 ~ LoginComponent ~ return ~ errorMessage:',
          errorMessage
        );
      }
      return of(result as T);
    };
  }
}
