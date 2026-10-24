import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export function usePartBrandSearchField({ article }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { article },
    mode: 'onChange',
  })

  return { register, handleSubmit, errors, isPending: isSubmitting }
}

const schema = z.object({
  article: z
    .string()
    .min(2, 'Не меньше 2 символов')
    .max(24, 'Не больше 24 символов')
    .regex(/^\d+$/, 'Только цифры'),
})
