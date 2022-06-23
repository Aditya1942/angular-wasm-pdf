import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WasmPdfComponent } from './wasm-pdf.component';

@NgModule({
  imports: [CommonModule],
  declarations: [WasmPdfComponent],
  exports: [WasmPdfComponent],
})
export class WasmPdfModule {}
