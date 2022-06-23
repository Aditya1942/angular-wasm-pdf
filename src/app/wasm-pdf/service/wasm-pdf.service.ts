/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import * as wasmPdf from 'wasm-pdf';
@Injectable({
  providedIn: 'root',
})
export class WasmPdfService implements OnDestroy {
  readonly BASE64_MARKER = ';base64,';
  result: Subject<any> = new Subject();
  pdfGeneratedEventListener: any = null;
  constructor() {
    document.addEventListener('custom:wasm-pdf', this.handleEvent);
  }
  ngOnDestroy(): void {
    document.removeEventListener('custom:wasm-pdf', this.handleEvent);
  }

  createPDF = (jsDocument: any) => {
    const imagePaths = this.parseJsDoc(jsDocument.contents);
    this.fetchImagePaths(imagePaths).then((imgData) => {
      // add base64 encoded bytes to document
      jsDocument.image_data = {};
      // add image widths and heights
      jsDocument.image_widths = {};
      jsDocument.image_heights = {};
      imgData.map((d) => {
        jsDocument.image_data[d.path] = d.data;
        jsDocument.image_widths[d.path] = d.width;
        jsDocument.image_heights[d.path] = d.height;
      });
      wasmPdf.run(jsDocument);
    });
  };

  private handleEvent = (e: any) => {
    this.result.next(e.detail);
  };

  // convert list of image paths
  private fetchImagePaths = (paths: any) =>
    Promise.all(paths.map((p: any) => this.imageBytes(p)));

  // convert single image path
  private imageBytes = (url: any) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/jpeg', 0.8);
        resolve({
          path: url,
          data: this.stripDataURI(dataURL),
          width: img.width,
          height: img.height,
        });
      };
      img.onerror = () =>
        resolve({
          path: null,
          status: 'error',
        });
      img.src = url;
    });

  private stripDataURI = (dataURI: any) => {
    const base64Index =
      dataURI.indexOf(this.BASE64_MARKER) + this.BASE64_MARKER.length;
    return dataURI.substring(base64Index);
  };

  private parseJsDoc = (obj: any) => {
    let results: any = [];
    for (const k in obj) {
      if (obj[k] && typeof obj[k] === 'object') {
        results = results.concat(this.parseJsDoc(obj[k]));
      } else {
        if (k === 'obj_type' && obj[k].toLowerCase() === 'image') {
          if (obj['params'] && obj['params']['src']) {
            results.push(obj.params.src);
          }
        }
      }
    }
    return results;
  };
}
