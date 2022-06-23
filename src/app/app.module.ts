import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WasmPdfModule } from 'src/app/wasm-pdf/wasm-pdf.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, WasmPdfModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
