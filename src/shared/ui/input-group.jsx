// oxlint-disable react/only-export-components
import { Button } from './button'
import { Input } from './input'

const addonAlignClasses = {
  'inline-start': 'order-first',
  'inline-end': 'order-last',
  'block-start': 'order-first w-100 justify-content-start',
  'block-end': 'order-last w-100 justify-content-start',
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

function InputGroupRoot({ className, ...props }) {
  return <fieldset data-slot="input-group" className={cn('input-group', className)} {...props} />
}

function InputGroupAddon({ align = 'inline-start', className, onPointerDown, ...props }) {
  function handlePointerDown(event) {
    onPointerDown?.(event)

    if (event.defaultPrevented || event.target.closest?.('button')) {
      return
    }

    event.preventDefault()
    event.currentTarget.parentElement?.querySelector('input, textarea')?.focus()
  }

  return (
    <div
      data-slot="input-group-addon"
      data-align={align}
      className={cn(
        'input-group-text d-flex align-items-center justify-content-center gap-2 text-body-secondary',
        addonAlignClasses[align] ?? addonAlignClasses['inline-start'],
        className,
      )}
      onPointerDown={handlePointerDown}
      {...props}
    />
  )
}

function InputGroupButton({ className, type = 'button', variant = 'ghost', ...props }) {
  return (
    <Button
      type={type}
      variant={variant}
      className={cn('d-inline-flex align-items-center gap-2 shadow-none', className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }) {
  return (
    <span
      data-slot="input-group-text"
      className={cn('d-flex align-items-center gap-2 small text-body-secondary', className)}
      {...props}
    />
  )
}

function InputGroupInput({ className, ...props }) {
  return (
    <Input data-slot="input-group-control" className={cn('flex-grow-1', className)} {...props} />
  )
}

function InputGroupTextarea({ className, ...props }) {
  return (
    <textarea
      data-slot="input-group-control"
      className={cn('form-control flex-grow-1', className)}
      {...props}
    />
  )
}

export const InputGroup = Object.assign(InputGroupRoot, {
  Addon: InputGroupAddon,
  Button: InputGroupButton,
  Input: InputGroupInput,
  Text: InputGroupText,
  Textarea: InputGroupTextarea,
})

export { InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea }
