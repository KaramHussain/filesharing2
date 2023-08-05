import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- Add this line
import { AppComponent } from './app.component';
import { FileSharingComponent } from './file-sharing/file-sharing.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FileSharingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // <-- Add this line
    HttpClientModule // Add HttpClientModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
