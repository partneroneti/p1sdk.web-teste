import { useState, useEffect, useCallback, useContext } from 'react'
import { Button } from '@/components/ui/button'
import { api } from '@/services/api'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '@/contexts/auth-context'
import clsx from 'clsx'

export function Result() {
  const navigate = useNavigate()
  const { transactionId } = useContext(AuthContext)
  const [approvedStatus, setApprovedStatus] = useState(
    'Transação em processamento',
  )
  const [isApproved, setIsApproved] = useState<boolean | null>(null)

  const handleGetResult = useCallback(async () => {
    try {
      const getResponse = await api.get(`/transaction/${transactionId}`)
      const result = getResponse.data.objectReturn.result

      if (result.status === 3) {
        return navigate('/selfie')
      }

      if (result.status) {
        const resultDescription = result.statusDescription
        const hasSucceeded = result.status === 1

        setApprovedStatus(resultDescription)
        setIsApproved(hasSucceeded)
      }
    } catch (error) {
      console.log({ error })
    }
  }, [navigate, transactionId])

  useEffect(() => {
    if (!transactionId) navigate('/')

    const getResultInterval = setInterval(() => {
      handleGetResult()
    }, 10000)

    return () => {
      clearInterval(getResultInterval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="grid place-items-center h-screen w-full">
      <div className="flex flex-col w-full max-w-[350px] gap-3">
        <div className="flex flex-col w-full">
          <p className="text-primary-foreground font-bold text-sm">
            Transaction ID
          </p>
          <p className="font-semibold text-gray-500">{transactionId}</p>
        </div>

        <div className="flex flex-col w-full">
          <p className="text-primary-foreground font-bold text-sm">Status</p>
          <p
            className={clsx(
              'font-semibold',
              isApproved === null && 'text-gray-500',
              isApproved === true && 'text-green-600',
              isApproved === false && 'text-red-600',
            )}
          >
            {approvedStatus}
          </p>
        </div>

        <Button
          onClick={() => navigate('/')}
          disabled={isApproved === null}
          className="w-full"
        >
          {isApproved === null ? 'Buscando' : 'Reiniciar'}
        </Button>
      </div>
    </div>
  )
}
