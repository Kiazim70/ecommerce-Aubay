import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { Concessionnaire } from 'src/app/model/concessionnaire';
import { ConcessionnaireService } from 'src/app/services/concessionnaire.service';

@Component({
  selector: 'app-concessionnaire-update',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField],
  templateUrl: './concessionnaire-update.component.html',
  styleUrl: './concessionnaire-update.component.css'
})
export class ConcessionnaireUpdateComponent implements OnInit {

  concessionnaireForm!: FormGroup;
  id!: number;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private concessionnaireService: ConcessionnaireService) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.concessionnaireForm = this.formBuilder.group({
      id: [''],
      nameCompagny: [''],
      nsiret: [''],
      email: [''],
      phone: [''],
      fax: [''],
      address: [''],
      zipcode: [''],
      country: ['']
    });

    this.concessionnaireService.getConcessionnaireById(this.id).subscribe((concessionnaire: Concessionnaire) => {
      this.concessionnaireForm.patchValue(concessionnaire);
    });
  }

  updateConcessionnaire(): void {
    this.submitted = true;
    if (this.concessionnaireForm.invalid) {
      return;
    }

    this.concessionnaireService.updateConcessionnaire(this.id, this.concessionnaireForm.value).subscribe(() => {
      console.log('Concessionnaire-updated successfully');
      this.router.navigate(['/concessionnaire']);
    });
  }
}