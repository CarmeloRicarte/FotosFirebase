export class FileItem {
  public archivo: File;
  public nombreArchivo: string;
  public url: string;
  public estaSubiendo: boolean;
  public progreso: number;
  public fechaSubida: string;

  constructor(archivo: File) {
    this.archivo = archivo;
    this.nombreArchivo = archivo.name;
    this.estaSubiendo = false;
    this.progreso = 0;
    this.fechaSubida = new Date().getTime().toString();
  }
}
