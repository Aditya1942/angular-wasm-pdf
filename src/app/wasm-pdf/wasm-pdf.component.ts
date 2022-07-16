import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WasmPdfService } from 'src/app/wasm-pdf/service/wasm-pdf.service';
// import { doc } from 'src/app/wasm-pdf/wasm';

@Component({
  selector: 'app-wasm-pdf',
  templateUrl: './wasm-pdf.component.html',
  styleUrls: ['./wasm-pdf.component.scss'],
})
export class WasmPdfComponent implements OnInit {
  pdfUrl: any = this.domSanitizer.bypassSecurityTrustResourceUrl('');

  constructor(
    private domSanitizer: DomSanitizer,
    private pdfService: WasmPdfService,
    private _http: HttpClient
  ) {
    this.pdfService.result.subscribe({
      next: (data: any) => {
        console.log(data);
        this.pdfUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
          data.pdfFileBlobURL + '#view=FitH'
        );
        // this.makeZip(data);
      },
    });
  }
  downloadFile(data: any) {
    const blob = new Blob([data], { type: 'application/zip' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
  makeZip(data: any) {
    var file = new File([data.data], 'name');
    console.log(file);
    const formData = new FormData();
    formData.append('files', file);
    this._http
      .post('http://localhost:3000/zip', formData, {
        responseType: 'blob',
      })
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.downloadFile(data);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }
  ngOnInit(): void {
    let lorem = {
      obj_type: 'Paragraph',
      params: {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam maximus tincidunt nisl. Integer bibendum, leo sed lobortis mollis, orci ante vulputate velit, id ultricies diam mauris consequat neque. Integer et nibh lectus. Cras felis massa, vehicula eget consequat sit amet, bibendum et est. Morbi ultrices id metus quis mollis. Suspendisse condimentum tristique est, sit amet tempor nulla semper sit amet. Aliquam luctus lacinia porta. In et tellus tincidunt, faucibus nisi in, vestibulum urna. Vestibulum eu neque massa. Morbi id tellus euismod, congue diam non, varius ligula. Etiam vel diam gravida eros molestie iaculis dictum ac ligula. Sed rutrum sagittis massa eu feugiat. Etiam blandit iaculis bibendum.',
        font_name: 'Helvetica',
        font_size: 12,
      },
    };
    let example2 = {
      obj_type: 'Paragraph',
      params: {
        text: 'Hello Lorem Ipsum',
        font_size: 16,
        align: 'center',
        font_name: 'Helvetica-Bold',
        color: [0, 0, 1],
        padding: {
          bottom: 24,
        },
      },
    };
    let doc: any = {
      title: 'Example Document',
      template: {
        top: 50,
        left: 50,
        right: 50,
        bottom: 50,
      },
      stationary: [
        {
          obj_type: 'PageNumber',
          params: {
            font_size: 12,
            font_name: 'Helvetica',
            x: 297.5,
            y: 30,
            align: 'center',
          },
        },
      ],
      contents: [],
    };
    let date = new Date().toLocaleString();
    example2.params.text += ' - created: ' + date;
    doc.contents.push(example2);
    for (let x = 0; x < 1000; x++) {
      doc.contents.push(lorem);
    }

    this.pdfService.createPDF(doc);
  }
}
