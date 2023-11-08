import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CallbackCamera,
  initializeCamera,
  SuccessPictureResponse,
} from '@partner-group/sdk-web'
import { config } from '@/config/pg-sdk'
import { Button } from '@/components/ui/button'
import { api } from '@/services/api'
import { AuthContext } from '@/contexts/auth-context'

export function Selfie() {
  const navigate = useNavigate()
  const { transactionId } = useContext(AuthContext)
  const [errorHasOccurred, setErrorHasOccurred] = useState(false)

  async function handleSendLiveness(obj: SuccessPictureResponse) {
    const requestData = {
      transactionId,
      faceScan: obj.encrypted,
      auditTrailImage: obj.base64,
      lowQualityAuditTrailImage: null,
    }

    try {
      const response = await api.post('/liveness-async', requestData)
      console.log({ response })
      navigate('/resultado')
    } catch (error) {
      console.log({ error })
      setErrorHasOccurred(true)
    }
  }

  async function handleOpenCamera() {
    const callbacks: CallbackCamera = {
      on: {
        success: (obj) => {
          handleSendLiveness(obj)
        },
        error: (error) => {
          console.error({ error })
          setErrorHasOccurred(true)
        },
        support: (supportMessage) => {
          console.error({ supportMessage: supportMessage.message })
        },
      },
    }

    await initializeCamera(callbacks, config)
  }

  useEffect(() => {
    handleOpenCamera()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {errorHasOccurred && (
        <div className="grid place-items-center h-screen w-full">
          <div className="flex flex-col w-full max-w-[300px] gap-3">
            <div className="flex flex-col w-full">
              <p className="text-primary-foreground font-bold">
                Ocorreu um erro
              </p>
              <p className="font-semibold">Tente novamente</p>
            </div>

            <Button
              onClick={() => {
                setErrorHasOccurred(false)
                handleOpenCamera()
              }}
              className="w-full"
            >
              Tentar novamente
            </Button>
          </div>
        </div>
      )}
      <div id="box-camera"></div>
    </>
  )
}
