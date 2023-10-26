import { useEffect } from 'react'
import { CallbackCamera, initializeCamera } from '@partner-group/sdk-web-local'
import { config } from '@/config/pg-sdk'

export function Selfie() {
  async function handleOpenCamera() {
    const callbacks: CallbackCamera = {
      on: {
        success: (obj) => {
          console.log({ base64: obj.base64 })
          console.log({ encrypted: obj.encrypted })
        },
        error: (error) => {
          console.error({ error })
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
  }, [])

  return <div id="box-camera"></div>
}
