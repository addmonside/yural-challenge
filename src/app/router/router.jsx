import { createBrowserRouter, redirect } from 'react-router'
import { routes } from '@/shared/model/routes'

export const makeRouter = (app) =>
  createBrowserRouter([
    {
      element: app,
      children: [
        {
          path: '/',
          loader: () => redirect(routes.PART_BRAND_LIST),
        },
        {
          lazy: () => import('@/features/utility/app-layout'),
          children: [
            {
              path: routes.PART_BRAND_LIST,
              lazy: async () => import('@/features/brands/brand-list-page'),
            },
            {
              path: routes.PART_LIST_BY_BRAND,
              lazy: async () => import('@/features/parts/part-list-page'),
            },
            // общие страницы
            {
              path: routes.ERROR,
              lazy: async () => import('@/features/utility/error-page'),
            },
            {
              path: '*',
              lazy: async () => import('@/features/utility/error-page'),
            },
          ],
        },
      ],
    },
  ])
