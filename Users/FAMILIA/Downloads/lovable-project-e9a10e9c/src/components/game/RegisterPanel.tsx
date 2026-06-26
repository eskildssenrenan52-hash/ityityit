import { useState, useCallback } from 'react'

interface RegisterPanelProps {
  onRegister: (email: string, username: string) => void
  onSwitchToLogin: () => void
  isLoading?: boolean
}

export default function RegisterPanel({
  onRegister,
  onSwitchToLogin,
  isLoading = false,
}: RegisterPanelProps) {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [confirmError, setConfirmError] = useState('')
  const [usernameError, setUsernameError] = useState('')

  const validateEmail = useCallback((email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }, [])

  const validateUsername = useCallback((username: string): boolean => {
    return username.length >= 3 && username.length <= 20 && /^[a-zA-Z0-9_-]+$/.test(username)
  }, [])

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value)
    setEmailError('')
  }, [])

  const handleConfirmEmailChange = useCallback((value: string) => {
    setConfirmEmail(value)
    setConfirmError('')
  }, [])

  const handleUsernameChange = useCallback((value: string) => {
    setUsername(value)
    setUsernameError('')
  }, [])

  const handleRegister = useCallback(() => {
    let hasErrors = false
    setEmailError('')
    setConfirmError('')
    setUsernameError('')

    if (!email.trim()) {
      setEmailError('Digite seu email.')
      hasErrors = true
    } else if (!validateEmail(email)) {
      setEmailError('Email inválido.')
      hasErrors = true
    }

    if (!confirmEmail.trim()) {
      setConfirmError('Confirme seu email.')
      hasErrors = true
    } else if (email !== confirmEmail) {
      setConfirmError('Os emails não correspondem.')
      hasErrors = true
    }

    if (!username.trim()) {
      setUsernameError('Digite um nome de usuário.')
      hasErrors = true
    } else if (!validateUsername(username)) {
      setUsernameError('De 3-20 caracteres, apenas letras, números, _ e -')
      hasErrors = true
    }

    if (!hasErrors) {
      onRegister(email, username)
    }
  }, [email, confirmEmail, username, validateEmail, validateUsername, onRegister])

  return (
    <div className="rcy-overlay">
      <div className="rcy-modal rcy-pixel">
        {/* Header */}
        <div className="rcy-modal__header">
          <h2 className="rcy-modal__title">Criar Conta</h2>
        </div>

        {/* Body */}
        <div className="rcy-modal__body space-y-2">
          <p className="text-xs" style={{ color: 'var(--rcy-text-dim)', textShadow: '1px 1px 0 #000' }}>
            Registre-se para salvar seu progresso
          </p>

          {/* Email Input */}
          <div className="space-y-1">
            <label className="text-xs" style={{ color: 'var(--rcy-gold)', textShadow: '1px 1px 0 #000' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="seu@email.com"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '6px 8px',
                background: 'rgba(0,0,0,0.6)',
                border: emailError ? '2px solid #c84040' : '2px solid #000',
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
            {emailError && (
              <p className="text-[9px]" style={{ color: 'var(--rcy-red)', textShadow: '1px 1px 0 #000' }}>
                ✕ {emailError}
              </p>
            )}
          </div>

          {/* Confirm Email Input */}
          <div className="space-y-1">
            <label className="text-xs" style={{ color: 'var(--rcy-gold)', textShadow: '1px 1px 0 #000' }}>Confirmar Email</label>
            <input
              type="email"
              value={confirmEmail}
              onChange={(e) => handleConfirmEmailChange(e.target.value)}
              placeholder="seu@email.com"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '6px 8px',
                background: 'rgba(0,0,0,0.6)',
                border: confirmError ? '2px solid #c84040' : '2px solid #000',
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
            {confirmError && (
              <p className="text-[9px]" style={{ color: 'var(--rcy-red)', textShadow: '1px 1px 0 #000' }}>
                ✕ {confirmError}
              </p>
            )}
          </div>

          {/* Username Input */}
          <div className="space-y-1">
            <label className="text-xs" style={{ color: 'var(--rcy-gold)', textShadow: '1px 1px 0 #000' }}>Nome de Usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              placeholder="SeuNome123"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '6px 8px',
                background: 'rgba(0,0,0,0.6)',
                border: usernameError ? '2px solid #c84040' : '2px solid #000',
                color: 'var(--rcy-text)',
                fontFamily: 'monospace',
                fontSize: '11px',
                opacity: isLoading ? 0.6 : 1,
                cursor: isLoading ? 'not-allowed' : 'auto',
                boxShadow: 'inset 1px 1px 0 #1a1208, inset -1px -1px 0 #050300',
                textShadow: '1px 1px 0 #000',
              }}
              autoComplete="username"
            />
            {usernameError && (
              <p className="text-[9px]" style={{ color: 'var(--rcy-red)', textShadow: '1px 1px 0 #000' }}>
                ✕ {usernameError}
              </p>
            )}
          </div>

          {/* Register Button */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleRegister}
              disabled={isLoading}
              className="rcy-btn rcy-btn--gold w-full"
              style={{ width: '100%', cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.6 : 1 }}
            >
              {isLoading ? 'Criando Conta...' : 'Criar Conta'}
            </button>
          </div>

          {/* Switch to Login */}
          <div className="text-center pt-2" style={{ borderTop: '1px solid var(--rcy-border-strong)' }}>
            <p className="text-[9px]" style={{ color: 'var(--rcy-text-dim)', textShadow: '1px 1px 0 #000' }}>
              Já tem conta?{' '}
              <button
                onClick={onSwitchToLogin}
                className="font-bold"
                style={{ color: 'var(--rcy-gold)', cursor: 'pointer', background: 'none', border: 'none', padding: 0, textDecoration: 'underline' }}
              >
                Fazer Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
