import { motion, type Variants } from 'framer-motion'
import { useState } from 'react'

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 280, damping: 24 } },
}

const OBLIBENE = [
  { name: 'Kabuse Kasumi', count: 12, color: '#3D8A5A', emoji: '🍃' },
  { name: 'Sencha Asanagi', count: 8, color: '#5A9E72', emoji: '🌿' },
  { name: 'Dong Pian Oolong', count: 5, color: '#D89575', emoji: '🍂' },
]

const HISTORIE = [
  { name: 'Sencha Asanagi', date: 'Dnes', amount: '100g' },
  { name: 'Kabuse Kasumi', date: 'Úterý', amount: '50g' },
  { name: 'Gyokuro Asahi', date: 'Min. týden', amount: '100g' },
  { name: 'Dong Pian Oolong', date: '14. 3.', amount: '200g' },
]

const PREFERENCE_OPTIONS = ['Zelený', 'Oolong', 'Bílý', 'Černý', 'Pu-erh', 'Bylinný']

export default function ProfilScreen({ onBack, onAdmin }: { onBack: () => void; onAdmin?: () => void }) {
  const [preferences, setPreferences] = useState(['Zelený', 'Oolong'])
  const [tab, setTab] = useState<'oblibene' | 'historie'>('oblibene')

  const toggle = (p: string) =>
    setPreferences(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    )

  return (
    <div style={{ height: '100%', background: '#F5F4F1', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: '#1A1918', paddingTop: 56, paddingBottom: 28, paddingLeft: 24, paddingRight: 24 }}>
        <motion.button
          onClick={onBack}
          whileTap={{ scale: 0.9 }}
          style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 20, padding: '6px 14px', color: '#fff', fontSize: 13, cursor: 'pointer', marginBottom: 20 }}
        >
          ← Zpět
        </motion.button>

        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring' as const, stiffness: 200, damping: 18, delay: 0.1 }}
            style={{
              width: 64, height: 64, borderRadius: 32,
              background: 'linear-gradient(135deg, #3D8A5A, #D89575)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28,
            }}
          >
            🍵
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, type: 'spring' as const, stiffness: 260, damping: 22 }}
          >
            <div style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>Čajomil</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 2 }}>člen od února 2024</div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, type: 'spring' as const, stiffness: 260, damping: 22 }}
          style={{ display: 'flex', gap: 24, marginTop: 20 }}
        >
          {[['25', 'požadavků'], ['3', 'oblíbené'], ['8', 'nových čajů']].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ color: '#fff', fontSize: 22, fontWeight: 700 }}>{n}</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>{l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: '#fff', borderBottom: '1px solid #E5E3DF' }}>
        {(['oblibene', 'historie'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1, padding: '14px 0', border: 'none', background: 'transparent',
              fontSize: 13, fontWeight: tab === t ? 600 : 400,
              color: tab === t ? '#1A1918' : '#6D6C6A',
              borderBottom: tab === t ? '2px solid #3D8A5A' : '2px solid transparent',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            {t === 'oblibene' ? 'Oblíbené' : 'Historie'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
        {tab === 'oblibene' ? (
          <motion.div variants={stagger} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {OBLIBENE.map(tea => (
              <motion.div key={tea.name} variants={fadeUp}
                style={{
                  background: '#fff', borderRadius: 16, padding: '14px 16px',
                  display: 'flex', alignItems: 'center', gap: 14,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 22,
                  background: tea.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                }}>
                  {tea.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1918' }}>{tea.name}</div>
                  <div style={{ fontSize: 12, color: '#6D6C6A', marginTop: 2 }}>{tea.count}× objednáno</div>
                </div>
                <div style={{
                  width: 6, height: 6, borderRadius: 3, background: tea.color,
                }} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div variants={stagger} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {HISTORIE.map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                style={{
                  background: '#fff', borderRadius: 14, padding: '12px 16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1918' }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: '#6D6C6A', marginTop: 1 }}>{item.date}</div>
                </div>
                <div style={{
                  background: '#F5F4F1', borderRadius: 8, padding: '4px 10px',
                  fontSize: 12, fontWeight: 600, color: '#3D8A5A',
                }}>
                  {item.amount}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Preference tags */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: 'spring' as const, stiffness: 260, damping: 22 }}
          style={{ marginTop: 24 }}
        >
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1918', marginBottom: 12 }}>Moje preference</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {PREFERENCE_OPTIONS.map(p => {
              const active = preferences.includes(p)
              return (
                <motion.button
                  key={p}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => toggle(p)}
                  style={{
                    padding: '7px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
                    background: active ? '#3D8A5A' : '#fff',
                    color: active ? '#fff' : '#6D6C6A',
                    fontSize: 13, fontWeight: active ? 600 : 400,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                >
                  {p}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Admin entry */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ marginTop: 28, paddingBottom: 8 }}
        >
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={onAdmin}
            style={{
              width: '100%', padding: '13px 16px', borderRadius: 16, border: '1px dashed #D0CEC9',
              background: 'transparent', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 10,
            }}
          >
            <span style={{ fontSize: 18 }}>🫖</span>
            <span style={{ fontSize: 13, color: '#6D6C6A' }}>Přihlásit se jako správce</span>
            <span style={{ marginLeft: 'auto', color: '#C0BDB8', fontSize: 14 }}>→</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
