// oxlint-disable react/only-export-components
import { clsx } from 'clsx'
import InfoIcon from '@/shared/assets/info.svg'
import { Alert } from './alert'
import { Empty } from './empty'

function PageLayoutRoot({ children, className }) {
  return (
    <section
      className={clsx('d-flex w-100 flex-grow-1 flex-column px-3 pb-5 px-sm-5', className)}
      data-slot="page-layout"
    >
      {children}
    </section>
  )
}

function PageLayoutTitle({ children, className, ...props }) {
  return (
    <h1
      className={clsx('py-1 fs-2 py-sm-0', className)}
      data-slot="page-layout-title"
      {...props}
    >
      {children}
    </h1>
  )
}

function PageLayoutDescription({ children, className, ...props }) {
  return (
    <p
      className={clsx('lead text-body-secondary', className)}
      data-slot="page-layout-description"
      {...props}
    >
      {children}
    </p>
  )
}

function PageLayoutHeader({ as, className, ...props }) {
  const Comp = as ?? 'header'

  return (
    <Comp
      data-slot="page-layout-header"
      className={clsx('bg-body d-flex flex-column gap-2 rounded-bottom-4 pt-5 pb-4', className)}
      {...props}
    />
  )
}

function PageLayoutToolbar({ as, className, ...props }) {
  const Comp = as ?? 'div'

  return (
    <Comp
      data-slot="page-layout-toolbar"
      className={clsx(
        'bg-body-secondary sticky-top d-flex w-100 flex-row align-items-center justify-content-between gap-4 gap-xl-3 rounded-4 p-3',
        className,
      )}
      {...props}
    />
  )
}

const contentVariants = {
  clear: 'pb-4 pt-4',
  centered: 'd-flex flex-column flex-grow-1 align-items-center justify-content-center',
}

function PageLayoutContent({ as, variant = 'clear', className, ...props }) {
  const Comp = as || 'div'
  return (
    <Comp
      data-slot="page-layout-content"
      className={clsx(contentVariants[variant], className)}
      {...props}
    />
  )
}

function PageLayoutError({ title, error }) {
  if (!error) return null

  return (
    <PageLayoutContent>
      <Alert variant="destructive">
        <InfoIcon />
        <Alert.Title>{title}</Alert.Title>
        <Alert.Description>{error.message}</Alert.Description>
      </Alert>
    </PageLayoutContent>
  )
}

function PageLayoutEmpty({ title, description, icon }) {
  return (
    <PageLayoutContent variant="centered">
      <Empty>
        <Empty.Media>{icon}</Empty.Media>
        <Empty.Header as="div">
          <Empty.Title>{title}</Empty.Title>
          <Empty.Description>{description}</Empty.Description>
        </Empty.Header>
      </Empty>
    </PageLayoutContent>
  )
}

export const PageLayout = Object.assign(PageLayoutRoot, {
  Header: PageLayoutHeader,
  Title: PageLayoutTitle,
  Description: PageLayoutDescription,
  Content: PageLayoutContent,
  Toolbar: PageLayoutToolbar,
  Error: PageLayoutError,
  Empty: PageLayoutEmpty,
})
