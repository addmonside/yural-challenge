import { z } from 'zod'

export const articleSchema = z
  .string()
  .trim()
  .min(2, 'Не меньше 2 символов')
  .max(24, 'Не больше 24 символов')
  .regex(/^[A-Za-z0-9][A-Za-z0-9._/#&+-]*$/, 'Только буквы, цифры и допустимые символы')

export const articleFormSchema = z.object({
  article: articleSchema,
})

export function isValidArticle(value) {
  return articleSchema.safeParse(value).success
}
