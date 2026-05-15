import { createBrowserRouter, RouterProvider, Outlet } from 'react-router'

import { Header } from './components/Header'
import {
  useTransition,
  TransitionProvider,
} from './components/transition/TransitionContext'
import { TransitionOverlay } from './components/transition/TransitionOverlay'
import LandingPage from './pages/index'
import PortfolioPage from './pages/portfolio'

function RootLayout() {
  const { state } = useTransition()
  return (
    <>
      <Header />
      <TransitionOverlay state={state} />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: (
      <TransitionProvider>
        <RootLayout />
      </TransitionProvider>
    ),
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/portfolio', element: <PortfolioPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
