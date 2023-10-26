import Routes from '@/routes'
import './styles/global.css'
import './styles/sdk.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/auth-context'

function App() {
  const router = createBrowserRouter([{ path: '*', Component: Routes }])
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
