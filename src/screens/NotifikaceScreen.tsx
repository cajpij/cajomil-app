import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { useState } from 'react'

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const slideIn: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 26 } },
}

type Notif = {
  id: number
  type: 'new' | 'low' | 'confirm' | 'tip'
  title: string
  body: string
  time: string
  read: boolean
}

const INIT_NOTIFS: Notif[] = [
  { id: 1, type: 'new', title: 'Nový čaj naskladněn', body: 'Sencha Asanagi Superior je zpět na skladě.', time: 'Právě teď', read: false },
  { id: 2, type: 'low', title: 'Tvůj oblíbený dochází', body: 'Kabuse Kasumi — zbývají poslední gramy.', time: '2 hod.', read: false },
  { id: 3, type: 'confirm', title: 'Požadavek přijat', body: 'Objednáno 100g Dong Pian Oolong. Dorazí příští týden.', time: 'Včera', read: true },
  { id: 4, type: 'tip', title: 'Tip na přípravu', body: 'Gyokuro chce 50 °C a 2 minuty. Zkus to!', time: 'Po', read: true },
  { id: 5, type: 'new', title: 'Nový čaj v katalogu', body: 'Objevil se Bílý čaj Silver Needle — 1. sklizeň.', time: '14. 3.', read: true },
]

const TYPE_CONFIG = {
  new:     { bg: '#3D8A5A20', icon: '🍃', accent: '#3D8A5A' },
  low:     { bg: '#D8957520', icon: '⚠️', accent: '#D89575' },
  confirm: { bg: '#5A9E7220', icon: '✓',  accent: '#5A9E72' },
  tip:     { bg: '#B8A89020', icon: '💡', accent: '#8B7355' },
}

export default function NotifikaceScreen({ onBack }: { onBack: () => void }) {
  const [notifs, setNotifs] = useState<Notif[]>(INIT_NOTIFS)

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })))

  const dismiss = (id: number) => setNotifs(prev => prev.filter(n => n.id !== id))

  const unreadCount = notifs.filter(n => !n.read).length

  return (
    <div style={{ height: '100%', background: '#F5F4F1', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: '#fff', paddingTop: 56, paddingBottom: 16, paddingLeft: 24, paddingRight: 24, borderBottom: '1px solid #E5E3DF' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <motion.button
            onClick={onBack}
            whileTap={{ scale: 0.9 }}
            style={{ background: '#F5F4F1', border: 'none', borderRadius: 20, padding: '6px 14px', color: '#1A1918', fontSize: 13, cursor: 'pointer' }}
          >
            ← Zpět
          </motion.button>
          {unreadCount > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.92 }}
              onClick={markAllRead}
              style={{ background: 'transparent', border: 'none', color: '#3D8A5A', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
            >
              Vše přečteno
            </motion.button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#1A1918' }}>Notifikace</div>
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.div
                key="badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring' as const, stiffness: 400, damping: 20 }}
                style={{
                  background: '#D89575', color: '#fff', borderRadius: 10,
                  padding: '2px 8px', fontSize: 12, fontWeight: 700,
                }}
              >
                {unreadCount}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <motion.div variants={stagger} initial="hidden" animate="show">
          <AnimatePresence initial={false}>
            {notifs.map(n => {
              const cfg = TYPE_CONFIG[n.type]
              return (
                <motion.div
                  key={n.id}
                  variants={slideIn}
                  exit={{ opacity: 0, x: 80, transition: { duration: 0.22 } }}
                  layout
                  style={{
                    background: n.read ? '#fff' : cfg.bg,
                    borderRadius: 16,
                    padding: '14px 16px',
                    marginBottom: 8,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    boxShadow: n.read ? '0 1px 4px rgba(0,0,0,0.05)' : '0 2px 8px rgba(0,0,0,0.08)',
                    position: 'relative',
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: 40, height: 40, borderRadius: 20, flexShrink: 0,
                    background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18,
                  }}>
                    {cfg.icon}
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      <div style={{ fontSize: 13, fontWeight: n.read ? 500 : 700, color: '#1A1918' }}>{n.title}</div>
                      {!n.read && (
                        <div style={{ width: 6, height: 6, borderRadius: 3, background: cfg.accent, flexShrink: 0 }} />
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: '#6D6C6A', lineHeight: 1.4 }}>{n.body}</div>
                    <div style={{ fontSize: 11, color: '#A0A0A0', marginTop: 5 }}>{n.time}</div>
                  </div>

                  {/* Dismiss */}
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => dismiss(n.id)}
                    style={{
                      background: 'transparent', border: 'none', color: '#C0BDB8',
                      fontSize: 16, cursor: 'pointer', padding: '0 4px', flexShrink: 0,
                    }}
                  >
                    ×
                  </motion.button>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {notifs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', padding: '60px 0', color: '#6D6C6A' }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>🫖</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1918' }}>Vše přečteno</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Dáme vědět, až přijde nový čaj.</div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
