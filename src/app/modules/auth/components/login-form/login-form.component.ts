import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

/*1.- Importamos el servicio de autenticación */
import { AuthService } from '@services/auth.service';
import { RequestStatus } from '@models/request-status.model';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [ Validators.required, Validators.minLength(6)]],
  });
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: RequestStatus = 'init';

  /*2.- Inyectamos el servicio de autenticación en el constructor del componente */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute

  ) { 
    this.route.queryParams.subscribe((params) => {
      if (params['email']) {
        this.form.controls.email.setValue(params['email']);
      }
    });
  }

  doLogin() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email, password } = this.form.getRawValue();
      this.authService.login(email,password).subscribe({
        next: ()=> {
          this.status = 'success';
          /**si todo es correcto podremos redirigir internamente a la app del proyecto. */
          this.router.navigate(['/app']);
        },error: ()=>{
          this.status = 'failed';
        }

      });




    } else {
      this.form.markAllAsTouched();
    }
  }

}
