import React, { useState, createContext, useEffect } from 'react'
import { api } from '@/services/api'
import axios from 'axios'

type AuthProviderProps = {
  children?: React.ReactNode
}

type AuthContextData = {
  transactionId: string
  isAuthenticated: boolean
  setTransactionId: React.Dispatch<React.SetStateAction<string>>
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [transactionId, setTransactionId] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  async function authenticate() {
    try {
      const username = import.meta.env.VITE_USERNAME
      const password = import.meta.env.VITE_PASSWORD
      const grantType = import.meta.env.VITE_GRANT_TYPE

      const authResponse = await axios.post(
        'https://integracao-sodexo-desenvolvimento.partner1.com.br/api/authentication',
        {
          username,
          password,
          grant_type: grantType,
        },
      )

      const accessToken = authResponse.data.objectReturn.access_token
      const bearerToken = `Bearer ${accessToken}`

      api.interceptors.request.use((config) => {
        config.headers!.Authorization = bearerToken
        return config
      })

      setIsAuthenticated(true)
    } catch (error: unknown) {
      console.log({ error })

      api.interceptors.request.use((config) => {
        config.headers!.Authorization = ''
        return config
      })
    }
  }

  useEffect(() => {
    if (!isAuthenticated) {
      authenticate()
    }
  }, [isAuthenticated])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        transactionId,
        setTransactionId,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
