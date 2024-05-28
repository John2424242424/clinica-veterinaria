export interface MascotaCreationData {
    nombre: string;
    especie: string;
    raza: string;
    edad: number;
    cliente: {
      identificacion: string;
    };
  }
