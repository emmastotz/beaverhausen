import { createBrowserRouter, RouterProvider } from 'react-router'
import LandingPage from './pages/index'

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
])

export default function App() {
  return <RouterProvider router={router} />
}
