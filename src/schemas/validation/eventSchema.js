import { any, object, date, string, number, boolean, array } from 'zod'

//Limit for files
const MAX_FILE_SIZE = 1500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

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
    featuredImage: any()
      .refine((files) => files?.length == 1, "Image is required.")
      .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 15MB.`)
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        ".jpg, .jpeg, .png and .webp files are accepted."
      ),
  });

export function checkEvent(obj){
    return eventValidation.safeParse(obj)
}