import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { ConcessionnaireService } from 'src/app/services/concessionnaire.service';

@Component({
  selector: 'app-concessionnaire-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, NgIf, MatError ],
  templateUrl: './concessionnaire-form.component.html',
  styleUrl: './concessionnaire-form.component.css'
})
export class ConcessionnaireFormComponent implements OnInit {
  concessionnaireForm!: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private concessionnaireService: ConcessionnaireService,
              private router: Router) { }

  ngOnInit(): void {
    this.concessionnaireForm = this.formBuilder.group({
      nameCompagny: ['', Validators.required],
      nsiret: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      fax: ['', Validators.required],
      address: ['', Validators.required],
      zipcode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    // Arrêter ici si le formulaire n'est pas valide
    if (this.concessionnaireForm.invalid) {
      return;
    }

    // Appeler le service pour enregistrer les données du concessionnaire
    this.concessionnaireService.saveConcessionnaire(this.concessionnaireForm.value)
      .subscribe(
        (response) => {
          this.router.navigate(['/concessionnaire']);
          // Réinitialiser le formulaire après la soumission
          this.concessionnaireForm.reset();
        },
        (error) => {
          console.log("error", error);
          // Gérer les erreurs ici
        }
      );
  }
}