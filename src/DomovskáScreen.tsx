import { motion, useScroll, useTransform, AnimatePresence, type Variants } from 'framer-motion'
import { useState, useRef } from 'react'

const TEAS = [
  { name: 'Kabuse Kasumi', color: '#3D8A5A', emoji: '🍃' },
  { name: 'Sencha Asanagi', color: '#5A9E72', emoji: '🌿' },
  { name: 'Dong Pian Oolong', color: '#D89575', emoji: '🍂' },
]

const TABS = [
  { label: 'Domov', icon: '⌂' },
  { label: 'Objevuj', icon: '◎' },
  { label: 'Požadavky', icon: '☰' },
  { label: 'Já', icon: '○' },
]

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 260, damping: 22 } },
}

export default function DomovskáScreen({
  onDetail,
  onRequest,
  onObjevuj,
  onProfile,
  onNotifications,
  onAdmin,
}: {
  onDetail?: () => void
  onRequest?: () => void
  onObjevuj?: () => void
  onProfile?: () => void
  onNotifications?: () => void
  onAdmin?: () => void
}) {
  const [activeTab, setActiveTab] = useState(0)
  const [bellShaking, setBellShaking] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: heroRef })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -40])

  const shakeBell = () => {
    setBellShaking(true)
    setTimeout(() => {
      setBellShaking(false)
      onNotifications?.()
    }, 600)
  }

  const handleTabClick = (i: number) => {
    setActiveTab(i)
    if (i === 1) onObjevuj?.()
    if (i === 2) onRequest?.()
    if (i === 3) onProfile?.()
  }

  return (
    <div style={{
      width: 390, height: 844, background: '#F5F4F1',
      fontFamily: "'Inter', system-ui, sans-serif",
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      borderRadius: 44, boxShadow: '0 40px 120px rgba(0,0,0,0.25)', position: 'relative',
    }}>

      {/* Scrollable content */}
      <div ref={heroRef} style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.1 }}
          style={{ padding: '56px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
        >
          <div>
            <div style={{ fontSize: 26, fontWeight: 700, color: '#1A1918', lineHeight: 1.2 }}>Dobré ráno ☀️</div>
            <div style={{ fontSize: 14, color: '#6D6C6A', marginTop: 4 }}>Co si dnes uvařit?</div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <motion.button
              onClick={shakeBell}
              animate={bellShaking ? { rotate: [0, -18, 18, -12, 12, -6, 6, 0] } : { rotate: 0 }}
              transition={{ duration: 0.5 }}
              whileTap={{ scale: 0.85 }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, padding: 6 }}
            >
              🔔
            </motion.button>
            <motion.button
              onClick={onAdmin}
              whileTap={{ scale: 0.85 }}
              title="Správce"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, padding: 6 }}
            >
              🫖
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              whileTap={{ scale: 0.88, rotate: -8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              style={{
                width: 38, height: 38, borderRadius: '50%', background: '#3D8A5A', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 15, cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(61,138,90,0.35)',
              }}
            >
              J
            </motion.div>
          </div>
        </motion.div>

        {/* Hero card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 22, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onDetail}
          style={{ margin: '8px 20px', borderRadius: 20, overflow: 'hidden', cursor: 'pointer', position: 'relative', height: 200 }}
        >
          <motion.div style={{ y: heroY }}>
            <img
              src="/cajomil-app/tea-home.png"
              alt="Sencha Hibiki"
              style={{ width: '100%', height: 240, objectFit: 'cover', display: 'block' }}
            />
          </motion.div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)' }} />
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, type: 'spring' }}
            style={{ position: 'absolute', top: 14, left: 14, background: '#3D8A5A', color: '#fff', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20 }}
          >
            Dnešní tip
          </motion.div>
          <div style={{ position: 'absolute', bottom: 14, left: 14, color: '#fff' }}>
            <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.2 }}>Sencha Hibiki</div>
            <div style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>Japonský zelený · 50g · Miyazaki, Japonsko</div>
          </div>
        </motion.div>

        {/* Oblíbené */}
        <div style={{ padding: '16px 20px 0' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            style={{ fontSize: 16, fontWeight: 600, color: '#1A1918', marginBottom: 12 }}
          >
            Tvoje oblíbené
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate="show" style={{ display: 'flex', gap: 12 }}>
            {TEAS.map((tea, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
                whileTap={{ scale: 0.93 }}
                onClick={onDetail}
                style={{ flex: 1, background: '#fff', borderRadius: 16, padding: '14px 10px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
              >
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: tea.color, margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                  {tea.emoji}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#1A1918', lineHeight: 1.3 }}>{tea.name}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, type: 'spring', stiffness: 220, damping: 22 }}
          whileHover={{ scale: 1.02, boxShadow: '0 12px 32px rgba(61,138,90,0.3)' }}
          whileTap={{ scale: 0.97 }}
          onClick={onRequest}
          style={{ margin: '20px 20px 28px', background: '#3D8A5A', borderRadius: 18, padding: '20px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', overflow: 'hidden', position: 'relative' }}
        >
          <motion.div
            animate={{ x: [-200, 400] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'linear', repeatDelay: 1 }}
            style={{ position: 'absolute', top: 0, left: 0, width: 80, height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)', pointerEvents: 'none' }}
          />
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Dochází ti čaj?</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>Pošli nám požadavek</div>
          </div>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            style={{ fontSize: 22, color: '#fff' }}
          >
            →
          </motion.div>
        </motion.div>
      </div>

      {/* Tab Bar */}
      <div style={{ background: '#fff', borderTop: '1px solid #E8E6E3', display: 'flex', padding: '8px 0 20px' }}>
        {TABS.map((tab, i) => (
          <motion.button
            key={i}
            onClick={() => handleTabClick(i)}
            whileTap={{ scale: 0.82 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            style={{ flex: 1, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '6px 0' }}
          >
            <motion.div
              animate={{ scale: activeTab === i ? 1.2 : 1, color: activeTab === i ? '#3D8A5A' : '#6D6C6A' }}
              transition={{ type: 'spring', stiffness: 400, damping: 16 }}
              style={{ fontSize: 20 }}
            >
              {tab.icon}
            </motion.div>
            <motion.div
              animate={{ color: activeTab === i ? '#3D8A5A' : '#6D6C6A', fontWeight: activeTab === i ? 600 : 400 }}
              style={{ fontSize: 10 }}
            >
              {tab.label}
            </motion.div>
            <AnimatePresence>
              {activeTab === i && (
                <motion.div
                  layoutId="tabIndicator"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  exit={{ opacity: 0, scaleX: 0 }}
                  style={{ width: 20, height: 3, background: '#3D8A5A', borderRadius: 2 }}
                />
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
