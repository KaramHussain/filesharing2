import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-sharing',
  templateUrl: './file-sharing.component.html',
  styleUrls: ['./file-sharing.component.css']
})
export class FileSharingComponent {
  senderEmail = '';
  recipients: string[] = [];
  newRecipient = '';
  selectedFile: File | null = null; // New property to store the selected file
  selectedFileName: string | undefined;

  ngOnInit(): void {}

  constructor(private http: HttpClient) {}

  addRecipient() {
    const email = this.newRecipient.trim();
    if (email && this.recipients.length < 5 && !this.recipients.includes(email)) {
      this.recipients = [...this.recipients, email];
      this.newRecipient = '';
    }
  }

  removeRecipient(emailToRemove: string) {
    this.recipients = this.recipients.filter((email) => email !== emailToRemove);
  }


  onFileChange(event: any) {
    const inputElement = event.target as HTMLInputElement;
    this.selectedFileName = inputElement.files?.[0]?.name;
    // this.selectedFile = inputElement.files?.[0];
  }

  sendDataToBackend() {
    const formData = new FormData();
    formData.append('file', this.selectedFile as File);
    formData.append('senderEmail', this.senderEmail);
    formData.append('recipients', JSON.stringify(this.recipients));

    this.http.post('http://localhost:3000/upload', formData)
      .subscribe(
        (response) => {
          console.log('Data sent successfully!', response);
        },
        (error) => {
          console.error('Failed to send data.', error);
        }
      );
  }

  sendData() {
    this.selectedFile = null;
    this.senderEmail = '';
    this.recipients = [];
    // Check if a file is selected and at least one recipient is added.
    if (!this.selectedFile || this.recipients.length === 0) {
      alert('Please select a file and add at least one recipient.');
      return;
    }
  
    // Send data to the backend
    this.sendDataToBackend();
  
    // Clear the form fields after sending data.
    this.selectedFile = null;
    this.senderEmail = '';
    this.recipients = [];
  }
}
