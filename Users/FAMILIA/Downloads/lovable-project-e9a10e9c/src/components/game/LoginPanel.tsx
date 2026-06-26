import { useState, useCallback } from 'react'

interface LoginPanelProps {
  onLogin: (email: string) => void
  onSwitchToRegister: () => void
  onContinueAsGuest: () => void
  isLoading?: boolean
}

export default function LoginPanel({
  onLogin,
  onSwitchToRegister,
  onContinueAsGuest,
  isLoading = false,
}: LoginPanelProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const validateEmail = useCallback((email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }, [])

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value)
    setError('')
  }, [])

  const handleLogin = useCallback(() => {
    setError('')

    if (!email.trim()) {
      setError('Digite seu email.')
      return
    }

    if (!validateEmail(email)) {
      setError('Email inválido.')
      return
    }

    onLogin(email)
  }, [email, validateEmail, onLogin])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleLogin()
    }
  }, [handleLogin, isLoading])

  return (
    <div className="rcy-overlay">
      <div className="rcy-modal rcy-pixel">
        {/* Header */}
        <div className="rcy-modal__header">
          <h2 className="rcy-modal__title">Fazer Login</h2>
        </div>

        {/* Body */}
        <div className="rcy-modal__body space-y-3">
          <p className="text-xs" style={{ color: 'var(--rcy-text-dim)', textShadow: '1px 1px 0 #000' }}>
            Acesse sua conta para continuar
          </p>

          {/* Email Input */}
          <div className="space-y-1">
            <label className="text-xs" style={{ color: 'var(--rcy-gold)', textShadow: '1px 1px 0 #000' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="seu@email.com"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '6px 8px',
                background: 'rgba(0,0,0,0.6)',
                border: error ? '2px solid #c84040' : '2px solid #000',
                color: 'var(--rcy-text)',
                fontFamily: 'monospace',
                fontSize: '11px',
                opacity: isLoading ? 0.6 : 1,
                cursor: isLoading ? 'not-allowed' : 'auto',
                boxShadow: 'inset 1px 1px 0 #1a1208, inset -1px -1px 0 #050300',
                textShadow: '1px 1px 0 #000',
              }}
              autoComplete="email"
            />
            {error && (
              <p className="text-[9px]" style={{ color: 'var(--rcy-red)', textShadow: '1px 1px 0 #000' }}>
                ✕ {error}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="rcy-btn rcy-btn--gold w-full"
              style={{ width: '100%', cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.6 : 1 }}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>

            <button
              onClick={onContinueAsGuest}
              disabled={isLoading}
              className="rcy-btn w-full"
              style={{ width: '100%', cursor: isLoading ? 'not-allowed' : 'pointer' }}
            >
              Jogar como Visitante
            </button>
          </div>

          {/* Switch to Register */}
          <div className="text-center pt-2" style={{ borderTop: '1px solid var(--rcy-border-strong)' }}>
            <p className="text-[9px]" style={{ color: 'var(--rcy-text-dim)', textShadow: '1px 1px 0 #000' }}>
              Não tem conta?{' '}
              <button
                onClick={onSwitchToRegister}
                className="font-bold"
                style={{ color: 'var(--rcy-gold)', cursor: 'pointer', background: 'none', border: 'none', padding: 0, textDecoration: 'underline' }}
              >
                Criar Conta
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
