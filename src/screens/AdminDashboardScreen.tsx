import { motion, type Variants } from 'framer-motion'
import { useState } from 'react'

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 280, damping: 24 } },
}

const POZADAVKY = [
  { user: 'Tomáš K.', tea: 'Sencha Asanagi', amount: '100g', time: '12 min', urgent: true },
  { user: 'Jana M.', tea: 'Kabuse Kasumi', amount: '50g', time: '2 hod.', urgent: false },
  { user: 'Petr V.', tea: 'Gyokuro Asahi', amount: '100g', time: 'Včera', urgent: false },
]

const SKLAD = [
  { name: 'Kabuse Kasumi', stock: 82, max: 100, color: '#3D8A5A' },
  { name: 'Sencha Asanagi', stock: 34, max: 100, color: '#5A9E72' },
  { name: 'Dong Pian Oolong', stock: 18, max: 100, color: '#D89575' },
  { name: 'Gyokuro Asahi', stock: 55, max: 100, color: '#8B7355' },
]

const NAV_ITEMS = [
  { icon: '⊞', label: 'Přehled' },
  { icon: '📋', label: 'Objednávky' },
  { icon: '🍃', label: 'Katalog' },
]

export default function AdminDashboardScreen({ onLogout }: { onLogout: () => void }) {
  const [activeNav, setActiveNav] = useState(0)
  const [dismissed, setDismissed] = useState<number[]>([])

  const visiblePozadavky = POZADAVKY.filter((_, i) => !dismissed.includes(i))

  return (
    <div style={{ height: '100%', background: '#F5F4F1', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top bar */}
      <div style={{
        background: '#1A1918', paddingTop: 52, paddingBottom: 16,
        paddingLeft: 20, paddingRight: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring' as const, stiffness: 260, damping: 22 }}
        >
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase' }}>Správce</div>
          <div style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginTop: 2 }}>Čajomil Admin</div>
        </motion.div>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={onLogout}
          style={{
            background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 20,
            padding: '7px 14px', color: 'rgba(255,255,255,0.5)', fontSize: 12, cursor: 'pointer',
          }}
        >
          Odhlásit
        </motion.button>
      </div>

      {/* Sub-nav */}
      <div style={{ background: '#1A1918', display: 'flex', paddingLeft: 20, paddingRight: 20, paddingBottom: 0, gap: 4 }}>
        {NAV_ITEMS.map((item, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.94 }}
            onClick={() => setActiveNav(i)}
            style={{
              flex: 1, padding: '10px 0', border: 'none', background: 'transparent', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              borderBottom: activeNav === i ? '2px solid #3D8A5A' : '2px solid transparent',
              transition: 'border-color 0.2s',
            }}
          >
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            <span style={{ fontSize: 10, color: activeNav === i ? '#3D8A5A' : 'rgba(255,255,255,0.4)', fontWeight: activeNav === i ? 600 : 400 }}>
              {item.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px' }}>
        <motion.div variants={stagger} initial="hidden" animate="show" key={activeNav}>

          {/* Stats row */}
          <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 18 }}>
            {[
              { label: 'Čajů', value: '24', sub: 'na skladě', color: '#3D8A5A' },
              { label: 'Požadavků', value: String(visiblePozadavky.length), sub: 'čeká', color: '#D89575' },
              { label: 'Čajomilů', value: '18', sub: 'aktivních', color: '#8B7355' },
            ].map(s => (
              <div key={s.label} style={{
                background: '#fff', borderRadius: 16, padding: '14px 12px', textAlign: 'center',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 11, color: '#1A1918', fontWeight: 600, marginTop: 2 }}>{s.label}</div>
                <div style={{ fontSize: 10, color: '#6D6C6A', marginTop: 1 }}>{s.sub}</div>
              </div>
            ))}
          </motion.div>

          {/* Požadavky */}
          <motion.div variants={fadeUp} style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1918', marginBottom: 10 }}>
              Požadavky čajomilů
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {visiblePozadavky.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px 0', color: '#6D6C6A', fontSize: 13 }}>
                  Žádné čekající požadavky 🎉
                </div>
              ) : (
                visiblePozadavky.map((p, i) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 80 }}
                    transition={{ type: 'spring' as const, stiffness: 300, damping: 26 }}
                    style={{
                      background: '#fff', borderRadius: 14, padding: '12px 14px',
                      display: 'flex', alignItems: 'center', gap: 10,
                      boxShadow: p.urgent ? '0 0 0 1.5px #D89575' : '0 1px 4px rgba(0,0,0,0.06)',
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 18, flexShrink: 0,
                      background: '#F5F4F1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                    }}>
                      🍃
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1918' }}>{p.tea}</div>
                      <div style={{ fontSize: 11, color: '#6D6C6A', marginTop: 1 }}>{p.user} · {p.amount} · {p.time}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <motion.button
                        whileTap={{ scale: 0.88 }}
                        onClick={() => setDismissed(d => [...d, POZADAVKY.indexOf(p)])}
                        style={{
                          width: 30, height: 30, borderRadius: 15, border: 'none', cursor: 'pointer',
                          background: '#3D8A5A20', color: '#3D8A5A', fontSize: 14, fontWeight: 700,
                        }}
                      >
                        ✓
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.88 }}
                        onClick={() => setDismissed(d => [...d, POZADAVKY.indexOf(p)])}
                        style={{
                          width: 30, height: 30, borderRadius: 15, border: 'none', cursor: 'pointer',
                          background: '#F5F4F1', color: '#6D6C6A', fontSize: 16,
                        }}
                      >
                        ×
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* Sklad */}
          <motion.div variants={fadeUp}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1918', marginBottom: 10 }}>
              Stav skladu
            </div>
            <div style={{ background: '#fff', borderRadius: 16, padding: '4px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              {SKLAD.map((tea, i) => (
                <div key={tea.name} style={{
                  padding: '12px 0',
                  borderBottom: i < SKLAD.length - 1 ? '1px solid #F0EEEA' : 'none',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#1A1918' }}>{tea.name}</span>
                    <span style={{ fontSize: 12, color: tea.stock < 30 ? '#D89575' : '#6D6C6A', fontWeight: tea.stock < 30 ? 600 : 400 }}>
                      {tea.stock}g {tea.stock < 30 ? '⚠️' : ''}
                    </span>
                  </div>
                  <div style={{ height: 5, borderRadius: 3, background: '#F0EEEA', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${tea.stock}%` }}
                      transition={{ delay: 0.4 + i * 0.08, type: 'spring' as const, stiffness: 120, damping: 20 }}
                      style={{ height: '100%', borderRadius: 3, background: tea.stock < 30 ? '#D89575' : tea.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick actions */}
          <motion.div variants={fadeUp} style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { icon: '📦', label: 'Objednat zásoby', color: '#3D8A5A' },
              { icon: '📢', label: 'Notifikovat čajomily', color: '#8B7355' },
            ].map(a => (
              <motion.button
                key={a.label}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '14px 12px', borderRadius: 16, border: 'none', cursor: 'pointer',
                  background: a.color + '18', display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start',
                }}
              >
                <span style={{ fontSize: 20 }}>{a.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: a.color, lineHeight: 1.3 }}>{a.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
