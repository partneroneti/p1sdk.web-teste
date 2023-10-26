import { useState, useEffect, useContext } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatCPF } from '@/utils/text'
import { AuthContext } from '@/contexts/auth-context'

export function Home() {
  const { handleSendTransaction } = useContext(AuthContext)

  const [canSend, setCanSend] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [formattedInputValue, setFormattedInputValue] = useState('')

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
          onClick={() => handleSendTransaction(inputValue)}
          disabled={!canSend}
          className="w-full"
        >
          Enviar
        </Button>
      </div>
    </div>
  )
}
