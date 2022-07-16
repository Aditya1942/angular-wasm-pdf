import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WasmPdfComponent } from './wasm-pdf.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [WasmPdfComponent],
  exports: [WasmPdfComponent],
})
export class WasmPdfModule {}
