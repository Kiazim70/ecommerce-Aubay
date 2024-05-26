import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { TarifAutoService } from 'src/app/services/tarif-auto.service';
import { TarifAuto } from 'src/app/model/tarifauto.model';


@Component({
  selector: 'app-tarif-auto-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule
  ],
  templateUrl: './tarif-auto-form.component.html',
  styleUrls: ['./tarif-auto-form.component.css']
})
export class TarifAutoFormComponent implements OnInit {

  tarifAutoForm!: FormGroup;
  isEditMode: boolean = false;
  tarifAutoId: string | null = null;
  id!: number;

  constructor(
    private formBuilder: FormBuilder,
    private tarifAutoService: TarifAutoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tarifAutoForm = this.formBuilder.group({
      id: [''],
      local: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      bonus: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      city: ['', Validators.required],
      ageObtainingPermit: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      dateOfBirth: ['', Validators.required],
      registration: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
    });

    this.id = +this.route.snapshot.params['id'];

      if (this.id) {
        this.isEditMode = true;
        this.tarifAutoService.getTarifAutoById(this.id).subscribe((tarifAuto: TarifAuto) => {
          this.tarifAutoForm.patchValue(tarifAuto);
        });
      }
    };
  

  onSubmit(): void {
    if (this.tarifAutoForm.invalid) {
      return;
    } 
    if (this.isEditMode) {
      this.tarifAutoService.updateTarifAuto(this.id, this.tarifAutoForm.value).subscribe(() => {
        console.log('TarifAuto updated successfully');
        this.router.navigate(['/tarif-auto-list']);
      });
    
    }else {
      this.tarifAutoService.saveTarifAuto(this.tarifAutoForm.value).subscribe(() => {
        console.log('TarifAuto saved successfully');
        this.router.navigate(['/tarif-auto-list']);
        this.tarifAutoForm.reset();
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/tarif-auto-list']);
  }

}