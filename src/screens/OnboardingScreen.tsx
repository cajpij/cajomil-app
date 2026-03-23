import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { useState } from 'react'

const STEPS = [
  {
    id: 'welcome',
    emoji: '🍵',
    title: 'Vítej v Čajomilu',
    subtitle: 'Tvoje osobní průvodce světem čaje na pracovišti.',
    bg: '#1A1918',
    accent: '#3D8A5A',
  },
  {
    id: 'type',
    emoji: null,
    title: 'Jaký čaj máš rád?',
    subtitle: 'Vybereme ti nejlepší čaje z katalogu.',
    bg: '#F5F4F1',
    accent: '#3D8A5A',
  },
  {
    id: 'mood',
    emoji: null,
    title: 'Na co čaj nejčastěji piješ?',
    subtitle: 'Přizpůsobíme ti doporučení.',
    bg: '#F5F4F1',
    accent: '#D89575',
  },
  {
    id: 'done',
    emoji: '✓',
    title: 'Vše nastaveno!',
    subtitle: 'Připravili jsme ti první doporučení.',
    bg: '#3D8A5A',
    accent: '#fff',
  },
]

const TEA_TYPES = ['Zelený', 'Oolong', 'Bílý', 'Černý', 'Bylinný', 'Pu-erh']
const MOODS = [
  { label: 'Ranní nastartování', icon: '☀️' },
  { label: 'Soustředění', icon: '🎯' },
  { label: 'Odpolední klid', icon: '🌿' },
  { label: 'Relaxace', icon: '🛋️' },
  { label: 'Trávení', icon: '💚' },
  { label: 'Objev nových chutí', icon: '✨' },
]

const slideVariants: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 300, damping: 28 } },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, transition: { duration: 0.18 } }),
}

export default function OnboardingScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [teaTypes, setTeaTypes] = useState<string[]>([])
  const [moods, setMoods] = useState<string[]>([])

  const go = (next: number) => {
    setDir(next > step ? 1 : -1)
    setStep(next)
  }

  const toggleTea = (t: string) =>
    setTeaTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])

  const toggleMood = (m: string) =>
    setMoods(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])

  const current = STEPS[step]
  const isLight = current.bg === '#F5F4F1'

  return (
    <div style={{
      height: '100%', background: current.bg, display: 'flex', flexDirection: 'column',
      transition: 'background 0.5s ease', overflow: 'hidden',
    }}>
      {/* Progress dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, paddingTop: 60, paddingBottom: 8 }}>
        {STEPS.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === step ? 20 : 6,
              background: i <= step ? current.accent : (isLight ? '#D0CEC9' : 'rgba(255,255,255,0.3)'),
            }}
            transition={{ type: 'spring' as const, stiffness: 400, damping: 24 }}
            style={{ height: 6, borderRadius: 3 }}
          />
        ))}
      </div>

      {/* Slide content */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: '24px 28px 0' }}
          >
            {/* Emoji / icon */}
            {current.emoji && (
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring' as const, stiffness: 200, damping: 16, delay: 0.1 }}
                style={{ fontSize: 64, marginBottom: 24, textAlign: 'center' }}
              >
                {current.emoji}
              </motion.div>
            )}

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, type: 'spring' as const, stiffness: 260, damping: 22 }}
              style={{ fontSize: 26, fontWeight: 800, color: isLight ? '#1A1918' : '#fff', lineHeight: 1.2, marginBottom: 10 }}
            >
              {current.title}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, type: 'spring' as const, stiffness: 260, damping: 22 }}
              style={{ fontSize: 15, color: isLight ? '#6D6C6A' : 'rgba(255,255,255,0.65)', lineHeight: 1.5, marginBottom: 28 }}
            >
              {current.subtitle}
            </motion.div>

            {/* Step-specific content */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}
              >
                {TEA_TYPES.map((t, i) => {
                  const active = teaTypes.includes(t)
                  return (
                    <motion.button
                      key={t}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.06 }}
                      whileTap={{ scale: 0.93 }}
                      onClick={() => toggleTea(t)}
                      style={{
                        padding: '10px 18px', borderRadius: 24, border: 'none', cursor: 'pointer',
                        background: active ? '#3D8A5A' : '#fff',
                        color: active ? '#fff' : '#1A1918',
                        fontSize: 14, fontWeight: active ? 600 : 400,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                        transition: 'background 0.2s, color 0.2s',
                      }}
                    >
                      {t}
                    </motion.button>
                  )
                })}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                {MOODS.map((m, i) => {
                  const active = moods.includes(m.label)
                  return (
                    <motion.button
                      key={m.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.07 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => toggleMood(m.label)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '12px 16px', borderRadius: 16, border: 'none', cursor: 'pointer',
                        background: active ? '#D8957520' : '#fff',
                        boxShadow: active ? '0 0 0 2px #D89575' : '0 1px 4px rgba(0,0,0,0.06)',
                        transition: 'all 0.2s',
                      }}
                    >
                      <span style={{ fontSize: 20 }}>{m.icon}</span>
                      <span style={{ fontSize: 14, fontWeight: active ? 600 : 400, color: '#1A1918' }}>{m.label}</span>
                      {active && (
                        <motion.span
                          initial={{ scale: 0 }} animate={{ scale: 1 }}
                          style={{ marginLeft: 'auto', color: '#D89575', fontWeight: 700 }}
                        >
                          ✓
                        </motion.span>
                      )}
                    </motion.button>
                  )
                })}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' as const, stiffness: 200, damping: 18 }}
                style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 20, padding: 20 }}
              >
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginBottom: 10 }}>Tvoje preference</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                  {teaTypes.map(t => (
                    <span key={t} style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: 12, padding: '4px 10px', fontSize: 12 }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {moods.map(m => (
                    <span key={m} style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)', borderRadius: 12, padding: '4px 10px', fontSize: 12 }}>{m}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div style={{ padding: '20px 28px 40px', display: 'flex', gap: 12 }}>
        {step > 0 && step < 3 && (
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => go(step - 1)}
            style={{
              flex: 0, padding: '16px 20px', borderRadius: 18, border: 'none', cursor: 'pointer',
              background: isLight ? '#E5E3DF' : 'rgba(255,255,255,0.12)',
              color: isLight ? '#6D6C6A' : 'rgba(255,255,255,0.7)', fontSize: 15,
            }}
          >
            ←
          </motion.button>
        )}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => step < STEPS.length - 1 ? go(step + 1) : onDone()}
          style={{
            flex: 1, padding: '16px', borderRadius: 18, border: 'none', cursor: 'pointer',
            background: current.accent,
            color: step === 3 ? '#3D8A5A' : (isLight ? '#fff' : '#1A1918'),
            fontSize: 16, fontWeight: 700,
            boxShadow: `0 4px 20px ${current.accent}40`,
          }}
        >
          {step === 0 ? 'Začít' : step === STEPS.length - 1 ? 'Přejít do aplikace' : 'Pokračovat'}
        </motion.button>
      </div>
    </div>
  )
}
