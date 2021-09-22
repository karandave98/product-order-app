import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserInterface } from 'src/app/models/user.interface';
import { emailValidation } from 'src/app/shared/email-fn.validators';
import { CommonService } from 'src/app/shared/services/common.service';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  error = false;
  hide = true;
  errorMessages = {
    EMAIL_ERROR: 'Please Enter Valid Email ID.',
    EMAIL_ERROR_REQ: 'Email is required.',
    PASSWORD_ERROR: 'Password is required',
    PWD_LEN_ERROR: 'Password must be beetween 8 & 16 Characters.',
    PWD_CHAR_ERROR: 'Password must contain at least one digit, one Uppercase, one lowercase and one special character.',
    NAME: 'Please Enter a Valid Name',
    PWD_NOT_MATCH: 'New Password and Confirm Password does not match.',
  };

  constructor(private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private commonService: CommonService,
    private httpService: HttpServiceService
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.compose([Validators.required, emailValidation()])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(8), Validators.maxLength(16)])),
    });
  }

  ngOnInit(): void {

  }

  submit(): void {
    if (this.loginForm.valid) {
      this.httpService.getUserDetails().subscribe((res: UserInterface) => {
        this.commonService.setLoggedInAdmin(res);
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.toast.error('Please Fill Valid details');
    }
  }

}
