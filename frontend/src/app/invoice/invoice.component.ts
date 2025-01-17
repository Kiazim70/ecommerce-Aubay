import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from 'pdfmake/interfaces';
pdfMake.vfs == pdfFonts.pdfMake.vfs;

class Product{
  name!: string;
  price!: number;
  qty!: number;
}
class Invoice{
  customerName!: string;
  address!: string;
  contactNo!: number;
  email!: string;
  
  products: Product[] = [];
  additionalDetails!: string;

  constructor(){
    // Initially one empty product row we will show 
    this.products.push(new Product());
  }
}

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [FormsModule, NgClass, NgFor],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent  implements OnInit {

  
  invoice = new Invoice(); 

  ngOnInit(): void {
  }

  
  generatePDF(action = 'open') {
    const docDefinition : TDocumentDefinitions = {
     
      content:  [
        {
          text: 'PRODUCTS SHOP',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'INVOICE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        },
        {
          text: 'Customer Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.invoice.customerName,
                bold:true
              },
              { text: this.invoice.address },
              { text: this.invoice.email },
              { text: this.invoice.contactNo }
            ],
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
        {
          text: 'Order Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Product', 'Price', 'Quantity', 'Amount'],
              ...this.invoice.products.map(p => ([p.name, p.price, p.qty, (p.price*p.qty).toFixed(2)])),
              [{text: 'Total Amount', colSpan: 3}, {}, {}, this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price), 0).toFixed(2)]
            ]
          }
        },
        {
          text: 'Additional Details',
          style: 'sectionHeader'
        },
        {
            text: this.invoice.additionalDetails,
            margin: [0, 0 ,0, 15]          
        },
         //{
          //columns: [
           //[{ qr: `${this.invoice.customerName}`, fit: '50' }],
           //{ text: this.invoice.additionalDetails },
          //[{ text: 'Signature', alignment: 'right', italics: true}],
          //]
         //},
         {
          text: 'Terms and Conditions',
          style: 'sectionHeader'
        },
        {
            ul: [
              'Order can be return in max 10 days.',
              'Warrenty of the product will be subject to the manufacturer terms and conditions.',
              'This is system generated invoice.',
            ],
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]          
        }
      }
    };

    if(action==='download'){
      pdfMake.createPdf(docDefinition).download();
    }else if(action === 'print'){
      pdfMake.createPdf(docDefinition).print();      
    }else{
      pdfMake.createPdf(docDefinition).open();      
    }

  }

  addProduct(){
    this.invoice.products.push(new Product());
  }
  
}



