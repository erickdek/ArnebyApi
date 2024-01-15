import { object, string } from 'zod'

//ZOD
const postValidation = object({
    appid: string({
        required_error: 'App Id required'
    }),
    token: string({
        required_error: 'Token required'
    }),
    keyword: string().min(1).max(255),
    country: string().min(0).max(2)
})

export function checkPostGen(obj){
    return postValidation.safeParse(obj)
}