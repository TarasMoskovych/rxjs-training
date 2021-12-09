import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStoreService } from '@app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private authStore: AuthStoreService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    const { email, password } = this.form.value;
    this.authStore.login(email, password).subscribe(
      () => this.router.navigateByUrl('/courses'),
    );
  }
}
