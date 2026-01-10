"use client"

import { Key } from "./key"
import { KEYBOARD_LAYOUT } from "./keyboard-layout"

interface Keyboard3DProps {
  activeKeys: Set<string>
  capsLock: boolean
  onKeyPress: (key: string, code: string) => void
}

export function Keyboard3D({ activeKeys, capsLock, onKeyPress }: Keyboard3DProps) {
  return (
    <group position={[0, 0, 0]} rotation={[0.2, 0, 0]}>
      {/* Main aluminum base - Space Gray */}
      <mesh position={[0, -0.35, 0]} receiveShadow castShadow>
        <boxGeometry args={[16.5, 0.5, 7]} />
        <meshStandardMaterial color="#1d1d1f" roughness={0.25} metalness={0.9} />
      </mesh>

      {/* Beveled top plate */}
      <mesh position={[0, -0.08, 0]} receiveShadow>
        <boxGeometry args={[16.2, 0.04, 6.7]} />
        <meshStandardMaterial color="#2d2d30" roughness={0.2} metalness={0.85} />
      </mesh>

      {/* Front rim accent */}
      <mesh position={[0, -0.1, 3.52]}>
        <boxGeometry args={[16.5, 0.03, 0.1]} />
        <meshStandardMaterial color="#3d3d40" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Keys container */}
      <group position={[-7.5, 0.15, -2.5]}>
        {KEYBOARD_LAYOUT.map((row, rowIndex) => {
          let currentX = 0
          return (
            <group key={rowIndex} position={[0, 0, rowIndex * 1.12]}>
              {row.map((keyData) => {
                const xPos = currentX + (keyData.width || 1) / 2 - 0.5
                currentX += (keyData.width || 1) + 0.1

                const isPressed = activeKeys.has(keyData.code) || (keyData.code === "CapsLock" && capsLock)

                return (
                  <Key
                    key={keyData.code}
                    data={keyData}
                    position={[xPos, 0, 0]}
                    isPressed={isPressed}
                    onPress={() => {
                      const keyVal = keyData.code === "Space" ? " " : keyData.label
                      onKeyPress(keyVal, keyData.code)
                    }}
                  />
                )
              })}
            </group>
          )
        })}
      </group>
    </group>
  )
}
