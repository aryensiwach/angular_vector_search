import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './admin.html'
})
export class Admin {
  msg = '';

  constructor(private http: HttpClient) {}

  train() {
    this.msg = 'Training started... please wait.';
    this.http.post('http://localhost:5000/api/build-index', {}).subscribe({
      next: (res: any) => this.msg = res.message,
      error: () => this.msg = 'Error occurred!'
    });
  }
}