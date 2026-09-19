import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html'
})
export class Home {
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  images: string[] = [];
  isLoading: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.previewUrl = URL.createObjectURL(file);
      this.images = [];
      this.cdr.detectChanges(); 
    }
  }

  async search(event: Event) {
    event.preventDefault();
    if (!this.selectedFile) return;

    this.isLoading = true;
    this.images = [];
    this.cdr.detectChanges(); 

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    try {
      const response = await fetch('http://localhost:5000/search', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      if (data.results) {
        this.images = data.results.map((path: string) => 
          path.startsWith('http') ? path : `http://localhost:5000/${path}`
        );
      }
    } catch (error) {
      alert('Error aa gaya backend connect karne mein.');
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges(); // Grid update
    }
  }
}