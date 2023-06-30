import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy } from 'react'

const Discover = lazy(() => import('@/views/discover/index'))
const Focus = lazy(() => import('@/views/focus/index'))
const Test = lazy(() => import('@/views/test/index'))
const routes = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/discover" />
  },
  {
    path: '/discover',
    element: <Discover />
  },
  {
    path: '/focus',
    element: <Focus />
  }
])

export default routes
