import {Directive, EventEmitter, ElementRef, HostListener, Input, Output} from '@angular/core';
import {FileItem} from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {
  @Input() archivos: FileItem[];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

  // cuando se arrasta algo sobre el elemento y está el mouse encima, dispara un evento
  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);
    this.prevenirDetener(event);

  }

  // cuando el mouse ya no está encima del elemento
  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
  }

  // cuando se suelta el archivo
  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    const TRANSFERENCIA = this.getTransferencia(event);
    if (!TRANSFERENCIA) {
      return;
    }
    this.extraerArchivos(TRANSFERENCIA.files);
    this.prevenirDetener(event);
    this.mouseSobre.emit(false);

  }

  // este método es para la compatibilidad de enviar el dato en distintos navegadores
  private getTransferencia(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private extraerArchivos(archivosLista: FileList) {
    // console.log(archivosLista);

    // con este for, barremos cada una de las propiedades del objeto archivosLista
    // creamos un array con todos los elementos cuya información pueda ser cargada
    for (const PROPIEDAD in Object.getOwnPropertyNames(archivosLista)) {
      const archivoTemporal = archivosLista[PROPIEDAD];
      if (this.archivoPuedeSerCargado(archivoTemporal)) {
        const nuevoArchivo = new FileItem(archivoTemporal);
        this.archivos.push(nuevoArchivo);
      }
    }
    console.log(this.archivos);
  }

  // Validaciones

  private archivoPuedeSerCargado(archivo: File): boolean {
    return !this.archivoYaFueDroppeado(archivo.name) && this.esImagen(archivo.type);
  }

  private prevenirDetener(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private archivoYaFueDroppeado(nombreArchivo: string): boolean {
    for (const archivo of this.archivos) {
      if (archivo.nombreArchivo === nombreArchivo) {
        console.log('El archivo ' + nombreArchivo + ' ya está agregado');
        return true;
      }
    }
    return false;
  }

  private esImagen(tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }

}
