import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './admin.html'
})
export class Admin {
  msg = '';


  constructor() {}

  async train() {
    this.msg = 'Training started... please wait.';
    try {
      const response = await fetch('http://localhost:5000/api/build-index', {
        method: 'POST'
      });
      const data = await response.json();
      console.log(data);
      this.msg = data.message;

    } catch (error) {
      this.msg = 'Error occurred!';
    }
  }
}