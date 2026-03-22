import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import DomovskáScreen from './DomovskáScreen'
import DetailScreen from './screens/DetailScreen'
import PožadavekScreen from './screens/PožadavekScreen'
import ObjevováníScreen from './screens/ObjevováníScreen'

type Screen = 'home' | 'detail' | 'request' | 'discover'

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 420 : -420, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 320, damping: 32 } },
  exit: (dir: number) => ({ x: dir > 0 ? -420 : 420, opacity: 0, transition: { duration: 0.22 } }),
}

const ORDER: Screen[] = ['home', 'detail', 'request', 'discover']

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [dir, setDir] = useState(1)

  const go = (next: Screen) => {
    setDir(ORDER.indexOf(next) >= ORDER.indexOf(screen) ? 1 : -1)
    setScreen(next)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1A1918 0%, #2D4A3E 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Phone shell */}
      <div style={{
        width: 390, height: 844, borderRadius: 44, overflow: 'hidden', position: 'relative',
        boxShadow: '0 40px 120px rgba(0,0,0,0.5)',
      }}>
        <AnimatePresence mode="wait" custom={dir}>
          {screen === 'home' && (
            <motion.div key="home" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" style={{ position: 'absolute', inset: 0 }}>
              <DomovskáScreen
                onDetail={() => go('detail')}
                onRequest={() => go('request')}
                onObjevuj={() => go('discover')}
              />
            </motion.div>
          )}
          {screen === 'detail' && (
            <motion.div key="detail" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" style={{ position: 'absolute', inset: 0 }}>
              <DetailScreen
                onBack={() => go('home')}
                onRequest={() => go('request')}
              />
            </motion.div>
          )}
          {screen === 'request' && (
            <motion.div key="request" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" style={{ position: 'absolute', inset: 0 }}>
              <PožadavekScreen onBack={() => go('home')} />
            </motion.div>
          )}
          {screen === 'discover' && (
            <motion.div key="discover" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" style={{ position: 'absolute', inset: 0 }}>
              <ObjevováníScreen onBack={() => go('home')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Screen indicators */}
      <div style={{ position: 'fixed', bottom: 32, display: 'flex', gap: 8 }}>
        {ORDER.map(s => (
          <motion.div
            key={s}
            animate={{ width: screen === s ? 24 : 8, background: screen === s ? '#fff' : 'rgba(255,255,255,0.35)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 24 }}
            onClick={() => go(s)}
            style={{ height: 8, borderRadius: 4, cursor: 'pointer' }}
          />
        ))}
      </div>
    </div>
  )
}
