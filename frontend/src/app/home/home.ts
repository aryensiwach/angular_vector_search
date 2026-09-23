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
    const input = event as HTMLInputElement;
    console.log(input);
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.previewUrl = URL.createObjectURL(file);
      this.images = [];
      this.cdr.detectChanges(); 
    }
  }
title : string | null=null;
  async search(event: Event) {

    event.preventDefault();
    console.log(event);
    if (!this.selectedFile) return;

    this.isLoading = true;
    this.images = [];
     

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    for (let [key, value] of formData.entries()) {
    console.log(key, value);
}
    
    try {
      const response = await fetch('http://localhost:5000/search', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      if (data.results) {
        this.images = []; 
        for (let path of data.results) { 
          if (path.startsWith('http')) { 
            this.images.push(path); 
          } else {
            let fullPath = 'http://localhost:5000/' + path;
            this.images.push(fullPath);
          }

        }
        
      }
    } catch (error) {
      alert('Error in backend.');
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges(); 
    }
  }
  getname(url: string) {
    if (!url) return '';
    return url.split('/').pop(); 
  }
  
}