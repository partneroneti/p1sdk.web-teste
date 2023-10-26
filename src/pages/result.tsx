import { useState, useEffect, useCallback, useContext } from 'react'
import { Button } from '@/components/ui/button'
import { api } from '@/services/api'
import { redirect } from 'react-router-dom'
import { AuthContext } from '@/contexts/auth-context'
import clsx from 'clsx'

export function Result() {
  const { transactionId } = useContext(AuthContext)
  const [approvedStatus, setApprovedStatus] = useState(
    'Transação em processamento',
  )
  const [isApproved, setIsApproved] = useState<boolean | null>(null)

  const handleGetResult = useCallback(async () => {
    try {
      const response = await api.get('/transaction')
      console.log({ response })

      const livenessHasSucceeded = response.data.objectReturn.liveness.success
      const livenessStatus = livenessHasSucceeded ? 'APROVADO' : 'REPROVADO'

      setApprovedStatus(livenessStatus)
      setIsApproved(livenessHasSucceeded)
    } catch (error) {
      console.log({ error })
    }
  }, [])

  useEffect(() => {
    handleGetResult()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="grid place-items-center h-screen w-full">
      <div className="flex flex-col w-full max-w-[300px] gap-3">
        <div className="flex flex-col w-full">
          <small className="text-primary-foreground font-bold">
            Transaction ID
          </small>
          <p className="font-semibold">{transactionId}</p>
        </div>

        <div className="flex flex-col w-full">
          <small className="text-primary-foreground font-bold">Status</small>
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
          onClick={() => redirect('/')}
          disabled={isApproved === null}
          className="w-full"
        >
          {isApproved === null ? 'Buscando' : 'Reiniciar'}
        </Button>
      </div>
    </div>
  )
}
