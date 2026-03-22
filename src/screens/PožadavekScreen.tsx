import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const AMOUNTS = ['50 g', '100 g', '200 g']

export default function PožadavekScreen({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState(1)
  const [note, setNote] = useState('')
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    setSent(true)
    setTimeout(() => { setSent(false); onBack() }, 2000)
  }

  return (
    <div style={{ width: 390, height: 844, background: '#F5F4F1', fontFamily: "'Inter', system-ui, sans-serif", display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 44, position: 'relative' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '56px 20px 20px' }}
      >
        <motion.button
          whileTap={{ scale: 0.82 }}
          onClick={onBack}
          style={{ width: 38, height: 38, borderRadius: '50%', background: '#fff', border: 'none', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
        >
          ←
        </motion.button>
        <span style={{ fontSize: 18, fontWeight: 600, color: '#1A1918' }}>Požadavek na čaj</span>
      </motion.div>

      <div style={{ flex: 1, padding: '0 20px', overflowY: 'auto', scrollbarWidth: 'none' }}>

        {/* Tea card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 22 }}
          style={{ background: '#fff', borderRadius: 18, padding: '16px', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
        >
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#3D8A5A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>🍃</div>
          <div>
            <div style={{ fontWeight: 600, color: '#1A1918', fontSize: 16 }}>Kabuse Kasumi</div>
            <div style={{ fontSize: 13, color: '#6D6C6A', marginTop: 2 }}>Stíněný zelený čaj · Kagoshima</div>
          </div>
        </motion.div>

        {/* Amount */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 260 }}
        >
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1918', marginBottom: 12 }}>Množství</div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
            {AMOUNTS.map((a, i) => (
              <motion.button
                key={i}
                onClick={() => setSelected(i)}
                whileTap={{ scale: 0.91 }}
                animate={{
                  background: selected === i ? '#3D8A5A' : '#fff',
                  color: selected === i ? '#fff' : '#1A1918',
                  boxShadow: selected === i ? '0 4px 16px rgba(61,138,90,0.35)' : '0 2px 8px rgba(0,0,0,0.06)',
                  scale: selected === i ? 1.05 : 1,
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 18 }}
                style={{ flex: 1, padding: '12px 0', border: 'none', borderRadius: 14, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
              >
                {a}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 260 }}
        >
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1918', marginBottom: 10 }}>Poznámka <span style={{ fontWeight: 400, color: '#6D6C6A' }}>(volitelná)</span></div>
          <motion.textarea
            whileFocus={{ boxShadow: '0 0 0 3px rgba(61,138,90,0.25)', scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 400 }}
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Např. preferuji nižší teplotu..."
            style={{ width: '100%', height: 110, border: '1.5px solid #E8E6E3', borderRadius: 14, padding: '14px', fontSize: 14, color: '#1A1918', resize: 'none', outline: 'none', background: '#fff', fontFamily: 'inherit', boxSizing: 'border-box' }}
          />
        </motion.div>
      </div>

      {/* Send button */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35, type: 'spring', stiffness: 260, damping: 24 }}
        style={{ padding: '12px 20px 28px' }}
      >
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: '0 10px 28px rgba(61,138,90,0.35)' }}
          whileTap={{ scale: 0.96 }}
          onClick={handleSend}
          style={{ width: '100%', padding: '16px', background: '#3D8A5A', color: '#fff', border: 'none', borderRadius: 16, fontSize: 16, fontWeight: 600, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.span key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                ✓ Odesláno!
              </motion.span>
            ) : (
              <motion.span key="send" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                Odeslat požadavek
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </div>
  )
}
