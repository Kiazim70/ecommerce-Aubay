import { Component, OnInit } from '@angular/core';
import { Concessionnaire } from '../model/concessionnaire';
import { ConcessionnaireService } from '../services/concessionnaire.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';


(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-buyconcess',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './buyconcess.component.html',
  styleUrl: './buyconcess.component.css'
})
export class BuyconcessComponent implements OnInit {
concessionnaire!: Concessionnaire;
selectedConcessionnaire: any;
addConcessionnaire() {
this.generatePDF();
}
  
  concessionnaires: Concessionnaire[] = [];
  selectedConcessionnaireDetails: any = null;
  pdfGeneratorService: any;

  constructor(private concessionnaireService: ConcessionnaireService) {}

  ngOnInit() {
    this.loadConcessionnaires();
  }

  loadConcessionnaires() {
    this.concessionnaireService.getAllConcessionnaires().subscribe((data: Concessionnaire[]) => {
      this.concessionnaires = data;
    });
  }

  // onConcessionnaireChange() {
  //  this.selectedConcessionnaire = this.concessionnaire;
  // }

  // generatePDF() {
  //   if (this.selectedConcessionnaireDetails) {
  //     this.pdfGeneratorService.generatePDF(this.selectedConcessionnaireDetails);
  //   } else {
  //     alert('Veuillez sélectionner un concessionnaire.');
  //   }
  // }
  
  generatePDF(action: string = 'open') {
    if (!this.selectedConcessionnaire) {
      alert('Veuillez sélectionner un concessionnaire.');
      return;
    }
  
    const docDefinition: TDocumentDefinitions = {
      content: [
        {
          text: 'CARS',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'BILLING',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        },
        {
          text: 'Concessionnaire Details',
          style: 'sectionHeader'
        },
        {
          ul: [
            { text: `Nom de la compagnie: ${this.selectedConcessionnaire.nameCompagny}` },
            { text: `N° SIRET: ${this.selectedConcessionnaire.nsiret}` },
            { text: `Email: ${this.selectedConcessionnaire.email}` },
            { text: `Téléphone: ${this.selectedConcessionnaire.phone}` }
          ]
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15] // [left, top, right, bottom]
        }
      }
    };
  
    // Now you can use docDefinition to generate or open the PDF
  }
  
}
