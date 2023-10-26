import React, { useState, createContext, useEffect } from 'react'
import { api } from '@/services/api'
import { redirect } from 'react-router-dom'

type AuthProviderProps = {
  children?: React.ReactNode
}

type AuthContextData = {
  transactionId: string
  isAuthenticated: boolean
  handleSendTransaction: (cpf: string) => void
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

      const authResponse = await api.post('/authentication', {
        username,
        password,
        grant_type: grantType,
      })

      const accessToken = authResponse.data.objectReturn.access_token
      const bearerToken = `Bearer ${accessToken}`

      api.interceptors.request.use((config) => {
        config.headers!.Authorization = bearerToken
        return config
      })

      setIsAuthenticated(true)
    } catch (error: unknown) {
      api.interceptors.request.use((config) => {
        config.headers!.Authorization = ''
        return config
      })
    }
  }

  async function handleSendTransaction(cpf: string) {
    try {
      const response = await api.post('/transaction', { cpf })
      console.log({ response })
      setTransactionId(response.data.objectReturn.transaction)
      redirect('/selfie')
    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    if (!isAuthenticated) {
      authenticate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        transactionId,
        handleSendTransaction,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
