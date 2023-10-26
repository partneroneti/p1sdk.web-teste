import { useState, useEffect } from 'react'
import { CallbackCamera, initializeCamera } from '@partner-group/sdk-web-local'
import { config } from './config/pg-sdk'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { formatCPF } from './utils/text'

function App() {
  const [canSend, setCanSend] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [formattedInputValue, setFormattedInputValue] = useState('')

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

  function handleSetInput(inputValue: string) {
    // Remover todos os caracteres não numéricos
    const value = inputValue.replace(/\D/g, '')
    const formattedValue = formatCPF(value)

    setFormattedInputValue(formattedValue)
    setInputValue(value)
  }

  useEffect(() => {
    if (inputValue.length < 11) {
      setCanSend(false)
      return
    }

    setCanSend(true)
  }, [inputValue])

  return (
    <div className="grid place-items-center h-screen w-full">
      <div className="flex flex-col w-full max-w-[300px] gap-2">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="cpf">Digite seu CPF</Label>
          <Input
            id="cpf"
            placeholder="000.000.000-00"
            maxLength={14}
            value={formattedInputValue}
            onChange={(e) => handleSetInput(e.target.value)}
          />
        </div>

        <Button
          onClick={handleOpenCamera}
          disabled={!canSend}
          className="w-full"
        >
          Enviar
        </Button>
      </div>

      {/* <div id="box-camera"></div> */}
    </div>
  )
}

export default App
