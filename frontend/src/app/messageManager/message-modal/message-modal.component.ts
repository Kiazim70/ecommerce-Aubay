import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './message-modal.component.html',
  styleUrl: './message-modal.component.css'
})
export class MessageModalComponent implements OnInit {

    messageForm: FormGroup;
    message: any;

  constructor(private fb: FormBuilder,
              private messageService : MessageService ) {
                
    this.messageForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.maxLength(200)],
      consent: [false, Validators.requiredTrue]
    });
  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    if (this.messageForm.valid) {
     this.messageService.sendMessage(this.messageForm.value).subscribe(
      (response: any) => {
        this.messageForm = response;

      });
    }
  }

}
