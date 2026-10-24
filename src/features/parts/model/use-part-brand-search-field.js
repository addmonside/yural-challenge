import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { articleFormSchema } from './article-schema'

export function usePartBrandSearchField({ article }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(articleFormSchema),
    defaultValues: { article },
    mode: 'onChange',
  })

  return { register, handleSubmit, watch, errors, isPending: isSubmitting }
}
