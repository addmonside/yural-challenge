import { z } from 'zod'

export const articleSchema = z
  .string()
  .min(2, 'Не меньше 2 символов')
  .max(24, 'Не больше 24 символов')
  .regex(/^\d+$/, 'Только цифры')

export const articleFormSchema = z.object({
  article: articleSchema,
})

export function isValidArticle(value) {
  return articleSchema.safeParse(value).success
}
