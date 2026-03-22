import { motion } from 'framer-motion'
import { useState } from 'react'

const STATS = [
  { value: '75°C', label: 'Teplota' },
  { value: '90 s', label: 'Čas' },
  { value: '3 g', label: 'Gramáž' },
  { value: '3×', label: 'Louhovani' },
]

const TAGS = ['trávnatá', 'svěží', 'umami']

const stagger = { show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 24 } },
}

export default function DetailScreen({ onBack, onRequest }: { onBack: () => void; onRequest: () => void }) {
  const [liked, setLiked] = useState(false)

  return (
    <div style={{ width: 390, height: 844, background: '#F5F4F1', fontFamily: "'Inter', system-ui, sans-serif", display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 44, position: 'relative' }}>

      {/* Hero image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ position: 'relative', height: 280, flexShrink: 0 }}
      >
        <img
          src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=700&q=80"
          alt="Sencha Hibiki"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%)' }} />

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, type: 'spring' }}
          whileTap={{ scale: 0.85 }}
          onClick={onBack}
          style={{ position: 'absolute', top: 56, left: 20, width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
        >
          ←
        </motion.button>

        {/* Like button */}
        <motion.button
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, type: 'spring' }}
          whileTap={{ scale: 0.75 }}
          onClick={() => setLiked(l => !l)}
          style={{ position: 'absolute', top: 56, right: 20, width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
        >
          <motion.span animate={{ scale: liked ? [1, 1.5, 1] : 1 }} transition={{ type: 'spring', stiffness: 400 }}>
            {liked ? '❤️' : '🤍'}
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', padding: '20px 20px 100px' }}>
        <motion.div variants={stagger} initial="hidden" animate="show">

          {/* Title + badge */}
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1A1918', margin: 0 }}>Sencha Hibiki</h1>
            <span style={{ background: '#E8F5EE', color: '#3D8A5A', fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 20 }}>Zelený čaj</span>
          </motion.div>

          {/* Description */}
          <motion.p variants={fadeUp} style={{ fontSize: 14, color: '#6D6C6A', lineHeight: 1.6, margin: '0 0 20px' }}>
            Velmi dobrá sencha z prefektury Miyazaki, Japonsko. Ichibancha (jaro) 2025. V chuti se projevuje svěžest posečené trávy s příjemnou sladkostí a jemným umami.
          </motion.p>

          {/* Stats */}
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3, boxShadow: '0 6px 18px rgba(0,0,0,0.1)' }}
                style={{ flex: 1, background: '#fff', borderRadius: 14, padding: '12px 8px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
              >
                <div style={{ fontSize: 16, fontWeight: 700, color: '#3D8A5A' }}>{s.value}</div>
                <div style={{ fontSize: 11, color: '#6D6C6A', marginTop: 2 }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Taste profile */}
          <motion.div variants={fadeUp}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1918', marginBottom: 10 }}>Chuťový profil</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {TAGS.map((tag, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.08, type: 'spring', stiffness: 360 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ background: '#E8F5EE', color: '#3D8A5A', fontSize: 13, fontWeight: 500, padding: '6px 14px', borderRadius: 20, cursor: 'pointer' }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Sticky CTA */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 260, damping: 24 }}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 20px 28px', background: 'linear-gradient(to top, #F5F4F1 70%, transparent)' }}
      >
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: '0 10px 28px rgba(61,138,90,0.35)' }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 16 }}
          onClick={onRequest}
          style={{ width: '100%', padding: '16px', background: '#3D8A5A', color: '#fff', border: 'none', borderRadius: 16, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}
        >
          Chci tento čaj →
        </motion.button>
      </motion.div>
    </div>
  )
}
