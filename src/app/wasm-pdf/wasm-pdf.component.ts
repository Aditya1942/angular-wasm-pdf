import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WasmPdfService } from 'src/app/wasm-pdf/service/wasm-pdf.service';
import { doc } from 'src/app/wasm-pdf/wasm';

@Component({
  selector: 'app-wasm-pdf',
  templateUrl: './wasm-pdf.component.html',
  styleUrls: ['./wasm-pdf.component.scss'],
})
export class WasmPdfComponent implements OnInit {
  pdfUrl: any = this.domSanitizer.bypassSecurityTrustResourceUrl('');

  constructor(
    private domSanitizer: DomSanitizer,
    private pdfService: WasmPdfService
  ) {
    this.pdfService.result.subscribe({
      next: (data: any) => {
        console.log(data);
        this.pdfUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
          data.pdfFileBlobURL + '#view=FitH'
        );
      },
    });
  }
  ngOnInit(): void {
    const date = new Date().toLocaleString();
    const title = doc.contents[0].params;
    title.text += ' (created: ' + date + ')';
    this.pdfService.createPDF(doc);
  }
}
