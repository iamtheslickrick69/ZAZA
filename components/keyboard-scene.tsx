"use client"

import { Canvas, useThree } from "@react-three/fiber"
import { PerspectiveCamera, ContactShadows } from "@react-three/drei"
import { Suspense, useState, useCallback, useEffect } from "react"
import { Keyboard3D } from "./keyboard-3d"
import { Terminal } from "./terminal"

function ResponsiveCamera() {
  const { camera, size } = useThree()

  useEffect(() => {
    const isMobile = size.width < 768

    const zPos = isMobile ? 12 : 9
    const yPos = isMobile ? 4 : 3
    const targetY = -0.8

    camera.position.set(0, yPos, zPos)
    camera.lookAt(0, targetY, 0)
    camera.updateProjectionMatrix()
  }, [camera, size])

  return null
}

interface KeyboardSceneProps {
  onPasswordSubmit: (password: string) => void
}

export function KeyboardScene({ onPasswordSubmit }: KeyboardSceneProps) {
  const [typedText, setTypedText] = useState<string>("")
  const [lines, setLines] = useState<string[]>([])
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set())
  const [capsLock, setCapsLock] = useState(false)
  const [shiftPressed, setShiftPressed] = useState(false)

  const handleVirtualKeyPress = useCallback(
    (key: string, code: string) => {
      setActiveKeys((prev) => new Set(prev).add(code))

      if (key === "Shift") {
        setShiftPressed(true)
        setTimeout(() => {
          setShiftPressed(false)
          setActiveKeys((prev) => {
            const next = new Set(prev)
            next.delete(code)
            return next
          })
        }, 150)
        return
      }

      if (code === "CapsLock") {
        setCapsLock((prev) => !prev)
        setTimeout(() => {
          setActiveKeys((prev) => {
            const next = new Set(prev)
            next.delete(code)
            return next
          })
        }, 150)
        return
      }

      if (key.length === 1) {
        const isLetter = /^[a-zA-Z]$/.test(key)
        if (isLetter) {
          const isUpperCase = shiftPressed !== capsLock
          const char = isUpperCase ? key.toUpperCase() : key.toLowerCase()
          setTypedText((prev) => prev + char)
        } else {
          setTypedText((prev) => prev + key)
        }
      } else if (code === "Space") {
        setTypedText((prev) => prev + " ")
      } else if (code === "Backspace") {
        setTypedText((prev) => prev.slice(0, -1))
      } else if (code === "Enter") {
        if (typedText.trim()) {
          // Check if password is "69"
          if (typedText.trim() === "69") {
            onPasswordSubmit(typedText.trim())
          } else {
            setLines((prev) => [...prev, typedText])
            setTypedText("")
          }
        }
      } else if (code === "Tab") {
        setTypedText((prev) => prev + "  ")
      }

      setTimeout(() => {
        setActiveKeys((prev) => {
          const next = new Set(prev)
          next.delete(code)
          return next
        })
      }, 100)
    },
    [capsLock, shiftPressed, typedText, onPasswordSubmit],
  )

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Terminal - Compact horizontal strip at top */}
      <div className="w-full px-4 pt-4 pb-2">
        <Terminal capsLock={capsLock} lines={lines} typedText={typedText} />
      </div>

      {/* Keyboard Canvas - Takes remaining space */}
      <div className="flex-1 relative">
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 3, 9]} fov={45} />
          <ResponsiveCamera />

          <color attach="background" args={["transparent"]} />

          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 12, 8]}
            intensity={1.8}
            castShadow
            shadow-mapSize={[2048, 2048]}
            color="#ffffff"
          />
          <pointLight position={[-6, 6, -4]} intensity={0.4} color="#a78bfa" />
          <pointLight position={[6, 4, 4]} intensity={0.3} color="#fde68a" />

          <Suspense fallback={null}>
            <Keyboard3D activeKeys={activeKeys} capsLock={capsLock} onKeyPress={handleVirtualKeyPress} />
            <ContactShadows position={[0, -0.85, 0]} opacity={0.6} scale={20} blur={2.5} far={4} color="#000000" />
          </Suspense>
        </Canvas>

        {/* Instructions */}
        <div className="absolute bottom-4 left-0 w-full text-center pointer-events-none">
          <p className="text-white/30 text-xs font-medium tracking-wide">Type password: 69</p>
        </div>
      </div>
    </div>
  )
}
