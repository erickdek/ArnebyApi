import { any, object, date, string, number, boolean, array } from 'zod'

//ZOD
const eventValidation = object({
  title: string()
    .min(1, { message: "El título es requerido." })
    .max(100, { message: "El título no debe exceder los 100 caracteres." }),
    
  content: string()
    .min(1, { message: "El contenido es requerido." })
    .max(5000, { message: "El contenido no debe exceder los 5000 caracteres." }),

  location: object({
    longitude: number({ message: "La longitud debe ser un número." }),
    latitude: number({ message: "La latitud debe ser un número." }),
    address: string().min(1, { message: "La dirección es requerida." }),
  }),

  virtual: boolean({ message: "El valor virtual debe ser verdadero o falso." }),
  links: array(
    object({
      title: string().min(1, { message: "El título del enlace es requerido." }),
      url: string().min(1, { message: "La URL del enlace es requerida." }),
    })
  ),
  prices: array(
    object({
      plan: string().min(1, { message: "El plan es requerido." }),
      benefits: array(string(), { message: "Los beneficios deben ser un arreglo de cadenas." }),
      price: number({ message: "El precio debe ser un número." }),
    })
  ),

  startDate: number().refine(timestamp => new Date(timestamp).getTime() > 0, {
    message: "La fecha de inicio debe ser un timestamp válido y positivo."
  }),

  endDate: number().refine(timestamp => new Date(timestamp).getTime() > 0, {
    message: "La fecha de fin debe ser un timestamp válido y positivo."
  }),
});


export function checkEvent(obj) {
  return eventValidation.safeParse(obj);
}