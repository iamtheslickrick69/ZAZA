"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import * as THREE from "three"
import type { KeyData } from "./keyboard-layout"

interface KeyProps {
  data: KeyData
  position: [number, number, number]
  isPressed: boolean
  onPress: () => void
}

export function Key({ data, position, isPressed, onPress }: KeyProps) {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  const targetY = isPressed ? -0.06 : 0

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.4)
    }
  })

  const width = data.width || 1
  const depth = 1
  const height = 0.22

  const isSpecialKey = ["Escape", "Backspace", "Enter", "MetaLeft", "MetaRight"].includes(data.code)
  const isAccentKey = data.code === "Space"

  const getKeyColor = () => {
    if (isSpecialKey) return "#1a1a1a"
    if (isAccentKey) return "#2a2a2a"
    return "#3d3d3d"
  }

  const getHoverColor = () => {
    if (isSpecialKey) return "#2a2a2a"
    if (isAccentKey) return "#3a3a3a"
    return "#4d4d4d"
  }

  const baseColor = getKeyColor()
  const hoverColor = getHoverColor()
  const pressedColor = "#151515"

  const materialColor = isPressed ? pressedColor : hovered ? hoverColor : baseColor

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = "pointer"
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHovered(false)
        document.body.style.cursor = "auto"
      }}
      onPointerDown={(e) => {
        e.stopPropagation()
        onPress()
      }}
    >
      {/* Key shadow/base */}
      <mesh position={[0, -0.03, 0]} receiveShadow>
        <boxGeometry args={[width * 0.94, 0.05, depth * 0.94]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Main key body */}
      <mesh position={[0, height / 2 + 0.02, 0]} castShadow receiveShadow>
        <boxGeometry args={[width * 0.9, height, depth * 0.9]} />
        <meshStandardMaterial color={materialColor} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Top surface highlight */}
      <mesh position={[0, height + 0.025, 0]}>
        <boxGeometry args={[width * 0.85, 0.01, depth * 0.85]} />
        <meshStandardMaterial color="#5a5a5a" roughness={0.2} metalness={0.3} transparent opacity={0.5} />
      </mesh>

      <Text
        position={[
          data.align === "left" ? -width / 2 + 0.28 : data.align === "right" ? width / 2 - 0.28 : 0,
          height + 0.04,
          data.align === "left" || data.align === "right" ? 0 : 0.05,
        ]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={data.fontSize || 0.24}
        color="#ffffff"
        anchorX={data.align || "center"}
        anchorY="middle"
        letterSpacing={0.02}
      >
        {data.label}
      </Text>
    </group>
  )
}
