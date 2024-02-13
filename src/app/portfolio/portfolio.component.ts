import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../service/contact.service';
import emailjs from '@emailjs/browser';
import { FormBuilder, FormGroup } from '@angular/forms';

declare const typeWriter: any;

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  @ViewChild('typingElement') typingElement!: ElementRef;
  @ViewChild('typingElement2') typingElement2!: ElementRef;
  title = 'MarcusImomioPortfolio';
  name: string = '';
  email: string = '';
  subject: string = '';
  content: string = '';

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    this.typeWriter();
  }

  form: FormGroup = this.fb.group({
    from_name: '',
    to_name: 'Admin',
    from_email: '',
    subject: '',
    message: '',
  });

  constructor(private contactService: ContactService, private fb: FormBuilder) {}

  async send(){
    emailjs.init('tReMzC4_mK8vGHc-N');
    let response = await emailjs.send("PortfolioGmail","template_4apblaw",{
      from_name: this.form.value.from_name,
      to_name: this.form.value.to_name,
      from_email: this.form.value.from_email,
      subject: this.form.value.subject,
      message: this.form.value.message,
      });

      alert("Message has been sent.")
      this.form.reset();
  }

  sendMessage(): void {
    if (this.name && this.email && this.subject && this.content) {
      const createMessage = {
        name: this.name,
        email: this.email,
        subject: this.subject,
        content: this.content
      };
      this.contactService.sendMessage(createMessage).subscribe(
        (response: any) => {
          console.log('Message sent successfully:', response);
          // Add any additional logic here
        },
        (error) => {
          console.error('Error sending message:', error);
          // Handle error
        }
      );
    }
  }

  private typeWriter() {
    // Use the ElementRef to get the native element of the 'typingElement'
    const textElement = this.typingElement.nativeElement;
    const textElement2 = this.typingElement2.nativeElement;
    const text = 'Software Engineer';
    const speed = 60; // Adjust the speed of typing

    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        textElement.innerHTML += text.charAt(i);
        textElement2.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
  }
}
