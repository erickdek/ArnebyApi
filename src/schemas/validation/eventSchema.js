import { object, date, string, number, boolean, array } from 'zod'

//ZOD
const eventValidation = object({
    title: string().min(1),
    slug: string().min(1),
    content: string().min(1),
    location: object({
      longitude: number(),
      latitude: number(),
      country: string().min(1),
      province: string().min(1),
      address: string().min(1),
    }),
    virtual: boolean(),
    links: array(
      object({
        title: string().min(1),
        url: string().min(1),
      })
    ),
    prices: array(
      object({
        plan: string().min(1),
        benefits: array(string()),
        price: number(),
      })
    ),
    organizer: string(), // Puedes ajustar según el tipo de datos de tu organizador
    startDate: date(),
    endDate: date(),
    featuredImage: string(), // Puedes ajustar según el tipo de datos de tu imagen destacada
  });

export function checkEvent(obj){
    return eventValidation.safeParse(obj)
}