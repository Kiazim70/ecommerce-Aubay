// pdf-generator.service.ts
import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Concessionnaire } from './concessionnaire.service';
import { TDocumentDefinitions } from 'pdfmake/interfaces';


(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  concessionnaires!: Concessionnaire;
  concessionnaire: any;

  constructor() {}

    // documentDefinitions: TDocumentDefinitions,
    // tableLayouts?: { [name: string]: CustomTableLayout },
    // fonts?: TFontDictionary,
    // vfs?: { [file: string]: string },

    

  generatePDF(selectedConcessionnaire: Concessionnaire) {
    //const documentDefinition = this.getDocumentDefinition(selectedConcessionnaire);
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
        [
          { text: 'Liste des Concessionnaires', style: 'header' },
          this.getConcessionnaireTable(this.concessionnaires),
      ],
        [
          
          { text: 'Liste des Concessionnaires', style: 'header' },
          { text: `NameCompagny: ${this.concessionnaire.nameCompagny}` },
          { text: `Nsiret: ${this.concessionnaire.nsiret}` },
          { text: `Email: ${this.concessionnaire.email}` },
          { text: `Phone: ${this.concessionnaire.phone}` }
         
        ],
        {
          columns: [
            [
              {
                text: `Date: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
              { 
                text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
                alignment: 'right'
              }
            ]     
          ]
        },
       
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
		   }
      }
    };
   pdfMake.createPdf(docDefinition).download('concessionnaire.pdf');
  }

  getDocumentDefinition(concessionnaire: Concessionnaire) {
    return {
      content: [
        {
          text: 'Détails du Concessionnaire',
          style: 'header'
        },
        this.getConcessionnaireTable(concessionnaire)
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        tableHeader: {
          bold: true,
          fillColor: '#d3d3d3'
        }
      }
    };
  }

  getConcessionnaireTable(concessionnaire: Concessionnaire): import("pdfmake/interfaces").Content {
    return {
      table: {
        headerRows: 1,
        widths: ['*', '*', '*', '*'],
        body: [
          [
            { text: 'Nom de la Compagnie', style: 'tableHeader' },
            { text: 'N° SIRET', style: 'tableHeader' },
            { text: 'Email', style: 'tableHeader' },
            { text: 'Téléphone', style: 'tableHeader' }
          ],
          [
            concessionnaire.nameCompagny,
            concessionnaire.nsiret,
            concessionnaire.email,
            concessionnaire.phone
          ]
        ]
      }
    };
  }
}
