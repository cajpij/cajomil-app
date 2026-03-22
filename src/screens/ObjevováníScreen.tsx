import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const TEAS = [
  { name: 'Dong Pian Oolong', sub: 'Zimní oolong · Tchajwan · Cui Yu kultivar · aromatický', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80', color: '#D89575' },
  { name: 'Kabuse Kasumi', sub: 'Stíněný zelený čaj · Japonsko · umami', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=700&q=80', color: '#3D8A5A' },
  { name: 'Sencha Hibiki', sub: 'Japonský zelený · Miyazaki · svěží a trávnatý', img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=700&q=80', color: '#5A9E72' },
  { name: 'Bílý Peony', sub: 'Bílý čaj · Fujian, Čína · jemný a květinový', img: 'https://images.unsplash.com/photo-1563911892437-1feda0179e1b?w=700&q=80', color: '#C8A97A' },
]

const FILTERS = ['Nálada', 'Účinky', 'Typ čaje']

function SwipeCard({ tea, onSwipe }: { tea: typeof TEAS[0]; onSwipe: (dir: 'left' | 'right') => void }) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-160, 160], [-18, 18])
  const opacity = useTransform(x, [-160, -80, 0, 80, 160], [0, 1, 1, 1, 0])
  const likeOpacity = useTransform(x, [20, 80], [0, 1])
  const nopeOpacity = useTransform(x, [-80, -20], [1, 0])

  const handleDragEnd = (_: never, info: { offset: { x: number } }) => {
    if (Math.abs(info.offset.x) > 90) {
      const dir = info.offset.x > 0 ? 'right' : 'left'
      animate(x, dir === 'right' ? 500 : -500, { duration: 0.3 })
      setTimeout(() => onSwipe(dir), 280)
    } else {
      animate(x, 0, { type: 'spring', stiffness: 400, damping: 28 })
    }
  }

  return (
    <motion.div
      style={{ x, rotate, opacity, position: 'absolute', inset: 0, cursor: 'grab' }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 24, overflow: 'hidden' }}>
        <img src={tea.img} alt={tea.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)' }} />

        {/* Like indicator */}
        <motion.div style={{ opacity: likeOpacity, position: 'absolute', top: 32, left: 24 }}>
          <span style={{ border: '3px solid #3D8A5A', color: '#3D8A5A', borderRadius: 8, padding: '6px 14px', fontSize: 22, fontWeight: 800, background: 'rgba(255,255,255,0.9)' }}>✓ ZKUSÍM</span>
        </motion.div>

        {/* Nope indicator */}
        <motion.div style={{ opacity: nopeOpacity, position: 'absolute', top: 32, right: 24 }}>
          <span style={{ border: '3px solid #E05C5C', color: '#E05C5C', borderRadius: 8, padding: '6px 14px', fontSize: 22, fontWeight: 800, background: 'rgba(255,255,255,0.9)' }}>✗ NE</span>
        </motion.div>

        {/* Tea info */}
        <div style={{ position: 'absolute', bottom: 24, left: 20, right: 20, color: '#fff' }}>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{tea.name}</div>
          <div style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.4 }}>{tea.sub}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ObjevováníScreen({ onBack: _onBack }: { onBack: () => void }) {
  const [activeFilter, setActiveFilter] = useState(1)
  const [index, setIndex] = useState(0)
  const [history, setHistory] = useState<string[]>([])

  const handleSwipe = (dir: 'left' | 'right') => {
    setHistory(h => [...h, dir === 'right' ? TEAS[index % TEAS.length].name : ''])
    setIndex(i => i + 1)
  }

  const currentTea = TEAS[index % TEAS.length]
  const nextTea = TEAS[(index + 1) % TEAS.length]

  return (
    <div style={{ width: 390, height: 844, background: '#F5F4F1', fontFamily: "'Inter', system-ui, sans-serif", display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 44 }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '56px 20px 16px' }}
      >
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1A1918', margin: 0 }}>Objevování</h1>
        <motion.button whileTap={{ scale: 0.85, rotate: 15 }} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }}>⚙️</motion.button>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: 'spring' }}
        style={{ margin: '0 20px 12px' }}
      >
        <div style={{ background: '#fff', borderRadius: 14, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <span style={{ fontSize: 16, opacity: 0.5 }}>🔍</span>
          <span style={{ fontSize: 14, color: '#9CA3AF' }}>Hledej čaj...</span>
        </div>
      </motion.div>

      {/* Filter pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        style={{ display: 'flex', gap: 8, padding: '0 20px 16px' }}
      >
        {FILTERS.map((f, i) => (
          <motion.button
            key={i}
            onClick={() => setActiveFilter(i)}
            whileTap={{ scale: 0.9 }}
            animate={{
              background: activeFilter === i ? '#3D8A5A' : '#fff',
              color: activeFilter === i ? '#fff' : '#6D6C6A',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            style={{ padding: '8px 16px', border: 'none', borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
          >
            {f}
          </motion.button>
        ))}
      </motion.div>

      {/* Swipe card stack */}
      <div style={{ flex: 1, margin: '0 20px', position: 'relative' }}>
        {/* Next card (underneath) */}
        <div style={{ position: 'absolute', inset: 8, borderRadius: 24, overflow: 'hidden', transform: 'scale(0.95)', opacity: 0.7 }}>
          <img src={nextTea.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Current card */}
        <AnimatePresence mode="popLayout">
          <SwipeCard key={index} tea={currentTea} onSwipe={handleSwipe} />
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 24 }}
        style={{ display: 'flex', gap: 16, padding: '16px 20px 28px', justifyContent: 'center' }}
      >
        <motion.button
          whileHover={{ scale: 1.06, boxShadow: '0 8px 24px rgba(224,92,92,0.25)' }}
          whileTap={{ scale: 0.88, rotate: -5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 14 }}
          onClick={() => handleSwipe('left')}
          style={{ flex: 1, padding: '14px', background: '#fff', border: '1.5px solid #E8E6E3', borderRadius: 16, fontSize: 15, fontWeight: 600, color: '#6D6C6A', cursor: 'pointer' }}
        >
          ✗ Nechci
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.06, boxShadow: '0 8px 24px rgba(61,138,90,0.3)' }}
          whileTap={{ scale: 0.88, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 14 }}
          onClick={() => handleSwipe('right')}
          style={{ flex: 1, padding: '14px', background: '#3D8A5A', border: 'none', borderRadius: 16, fontSize: 15, fontWeight: 600, color: '#fff', cursor: 'pointer' }}
        >
          ✓ Chci zkusit
        </motion.button>
      </motion.div>

      {/* History count */}
      {history.filter(Boolean).length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ position: 'absolute', top: 60, right: 20, background: '#3D8A5A', color: '#fff', borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}
        >
          {history.filter(Boolean).length} uložených
        </motion.div>
      )}
    </div>
  )
}
