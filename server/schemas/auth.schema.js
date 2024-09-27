import { z } from "zod";

const tramiteSchema = z.object({
  nombre: z.string({
    required_error: 'El nombre es requerido',
  }).min(1, { 
    message: "El nombre es obligatorio" 
  }),
  apellido: z.string({
    required_error: 'El apellido es requerido',
  }).min(1, { 
    message: "El apellido es obligatorio" 
  }),
  dni: z.string({
    required_error: 'El dni es requerido',
  }).regex(/^\d{8}$/, { 
    message: "El DNI debe tener 8 dígitos" 
  }),
  cuit: z
    .string({
      required_error: 'El cuit es requerido',
    })
    .regex(/^\d{11}$/, { 
      message: "El CUIT debe tener 11 dígitos" 
    }),
  email: z.string({
    required_error: 'El email es requerido',
  }).email({ 
    message: "El email no es válido" 
  }),
  telefono: z
    .string({
      required_error: 'El telefono es requerido',
    })
    .regex(/^\d+$/, { 
      message: "El teléfono debe contener solo números"
    }),
  dominio: z.string({
    required_error: 'El dominio es requerido',
  }).min(1, { 
    message: "El dominio es obligatorio" 
  }),
  anio: z
    .string({
      required_error: 'El año es requerido',
    })
    .regex(/^\d{4}$/, {
      message: "El año debe ser un número de 4 dígitos" 
    })
    .refine(
      (anio) =>
        parseInt(anio) >= 1900 && parseInt(anio) <= new Date().getFullYear(),
      {
        message: `El año debe estar entre 1900 y ${new Date().getFullYear()}`,
      }
    ),
    archivoBaja: z.any().optional(), // Opcional, la validacion la hago en el middleware.
});

export default tramiteSchema;

