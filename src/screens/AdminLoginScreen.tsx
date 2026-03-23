import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { useState } from 'react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 280, damping: 24 } },
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}

type LoginState = 'idle' | 'loading' | 'error' | 'success'

export default function AdminLoginScreen({
  onBack,
  onSuccess,
}: {
  onBack: () => void
  onSuccess: () => void
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [state, setState] = useState<LoginState>('idle')
  const [focusedField, setFocusedField] = useState<'email' | 'password' | null>(null)

  const handleLogin = async () => {
    if (!email || !password) return
    setState('loading')

    // Simulate auth (replace with real Supabase call)
    await new Promise(r => setTimeout(r, 1400))

    if (email === 'spravce@cajomil.cz' && password === 'cajovna') {
      setState('success')
      setTimeout(onSuccess, 900)
    } else {
      setState('error')
      setTimeout(() => setState('idle'), 2200)
    }
  }

  const isLoading = state === 'loading'
  const isError = state === 'error'
  const isSuccess = state === 'success'

  return (
    <div style={{
      height: '100%', background: '#1A1918',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      {/* Back */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onBack}
        style={{
          position: 'absolute', top: 56, left: 24, zIndex: 10,
          background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 20,
          padding: '6px 14px', color: 'rgba(255,255,255,0.6)', fontSize: 13, cursor: 'pointer',
        }}
      >
        ← Zpět
      </motion.button>

      {/* Background leaf pattern */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {['10%,15%', '80%,8%', '90%,55%', '5%,75%'].map((pos, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.04, scale: 1, rotate: i * 45 }}
            transition={{ delay: i * 0.1, duration: 1.2 }}
            style={{
              position: 'absolute', left: pos.split(',')[0], top: pos.split(',')[1],
              fontSize: 120, userSelect: 'none',
            }}
          >
            🍃
          </motion.div>
        ))}
      </div>

      {/* Logo area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 32px 0' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: 'spring' as const, stiffness: 180, damping: 16, delay: 0.15 }}
          style={{ fontSize: 52, textAlign: 'center', marginBottom: 20 }}
        >
          🫖
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          <motion.div variants={fadeUp} style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 6 }}>
            Správce čajovny
          </motion.div>
          <motion.div variants={fadeUp} style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
            Přihlaste se pro přístup k administraci
          </motion.div>
        </motion.div>

        {/* Form */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          {/* Email */}
          <motion.div variants={fadeUp}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 6, fontWeight: 500 }}>
              E-mail
            </div>
            <motion.div
              animate={{
                boxShadow: focusedField === 'email'
                  ? '0 0 0 2px #3D8A5A'
                  : isError ? '0 0 0 2px #D89575' : '0 0 0 1px rgba(255,255,255,0.1)',
              }}
              transition={{ duration: 0.15 }}
              style={{ borderRadius: 14, overflow: 'hidden' }}
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="spravce@cajomil.cz"
                disabled={isLoading || isSuccess}
                style={{
                  width: '100%', padding: '14px 16px', border: 'none', outline: 'none',
                  background: 'rgba(255,255,255,0.07)', color: '#fff', fontSize: 15,
                  boxSizing: 'border-box',
                }}
              />
            </motion.div>
          </motion.div>

          {/* Password */}
          <motion.div variants={fadeUp}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 6, fontWeight: 500 }}>
              Heslo
            </div>
            <motion.div
              animate={{
                boxShadow: focusedField === 'password'
                  ? '0 0 0 2px #3D8A5A'
                  : isError ? '0 0 0 2px #D89575' : '0 0 0 1px rgba(255,255,255,0.1)',
              }}
              transition={{ duration: 0.15 }}
              style={{ borderRadius: 14, overflow: 'hidden' }}
            >
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                placeholder="••••••••"
                disabled={isLoading || isSuccess}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                style={{
                  width: '100%', padding: '14px 16px', border: 'none', outline: 'none',
                  background: 'rgba(255,255,255,0.07)', color: '#fff', fontSize: 15,
                  boxSizing: 'border-box',
                }}
              />
            </motion.div>
          </motion.div>

          {/* Error message */}
          <AnimatePresence>
            {isError && (
              <motion.div
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                style={{ color: '#D89575', fontSize: 13, textAlign: 'center', paddingTop: 4 }}
              >
                Nesprávný e-mail nebo heslo.
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login button */}
          <motion.div variants={fadeUp} style={{ marginTop: 6 }}>
            <motion.button
              whileTap={!isLoading && !isSuccess ? { scale: 0.97 } : {}}
              onClick={handleLogin}
              disabled={!email || !password || isLoading || isSuccess}
              animate={{
                background: isSuccess ? '#3D8A5A' : isError ? '#D89575' : '#3D8A5A',
                opacity: !email || !password ? 0.5 : 1,
              }}
              transition={{ duration: 0.3 }}
              style={{
                width: '100%', padding: '16px', borderRadius: 18, border: 'none', cursor: 'pointer',
                color: '#fff', fontSize: 16, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1, rotate: 360 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ rotate: { duration: 1, repeat: Infinity, ease: 'linear' } }}
                    style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                  />
                ) : isSuccess ? (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring' as const, stiffness: 300, damping: 18 }}
                  >
                    ✓ Přihlášen
                  </motion.span>
                ) : (
                  <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Přihlásit se
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{ padding: '20px 32px 48px', textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 12 }}
      >
        Demo: spravce@cajomil.cz / cajovna
      </motion.div>
    </div>
  )
}
