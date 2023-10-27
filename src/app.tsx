import Routes from '@/routes'
import './styles/global.css'
import './styles/sdk.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/auth-context'
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
