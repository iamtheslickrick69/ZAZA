export interface KeyData {
  label: string
  code: string
  width?: number
  color?: string
  textColor?: string
  fontSize?: number
  align?: "left" | "center" | "right"
}

export const KEYBOARD_LAYOUT: KeyData[][] = [
  [
    { label: "esc", code: "Escape", color: "#1d1d1f", textColor: "white", fontSize: 0.16, align: "left" },
    { label: "1", code: "Digit1" },
    { label: "2", code: "Digit2" },
    { label: "3", code: "Digit3" },
    { label: "4", code: "Digit4" },
    { label: "5", code: "Digit5" },
    { label: "6", code: "Digit6" },
    { label: "7", code: "Digit7" },
    { label: "8", code: "Digit8" },
    { label: "9", code: "Digit9" },
    { label: "0", code: "Digit0" },
    { label: "-", code: "Minus" },
    { label: "=", code: "Equal" },
    {
      label: "delete",
      code: "Backspace",
      width: 2,
      color: "#1d1d1f",
      textColor: "white",
      fontSize: 0.16,
      align: "right",
    },
  ],
  [
    { label: "tab", code: "Tab", width: 1.5, fontSize: 0.16, align: "left", color: "#e8e8ed" },
    { label: "Q", code: "KeyQ" },
    { label: "W", code: "KeyW" },
    { label: "E", code: "KeyE" },
    { label: "R", code: "KeyR" },
    { label: "T", code: "KeyT" },
    { label: "Y", code: "KeyY" },
    { label: "U", code: "KeyU" },
    { label: "I", code: "KeyI" },
    { label: "O", code: "KeyO" },
    { label: "P", code: "KeyP" },
    { label: "[", code: "BracketLeft" },
    { label: "]", code: "BracketRight" },
    { label: "\\", code: "Backslash", width: 1.5 },
  ],
  [
    { label: "caps lock", code: "CapsLock", width: 1.8, fontSize: 0.14, align: "left", color: "#e8e8ed" },
    { label: "A", code: "KeyA" },
    { label: "S", code: "KeyS" },
    { label: "D", code: "KeyD" },
    { label: "F", code: "KeyF" },
    { label: "G", code: "KeyG" },
    { label: "H", code: "KeyH" },
    { label: "J", code: "KeyJ" },
    { label: "K", code: "KeyK" },
    { label: "L", code: "KeyL" },
    { label: ";", code: "Semicolon" },
    { label: "'", code: "Quote" },
    {
      label: "return",
      code: "Enter",
      width: 2.2,
      color: "#1d1d1f",
      textColor: "white",
      fontSize: 0.16,
      align: "right",
    },
  ],
  [
    { label: "shift", code: "ShiftLeft", width: 2.3, color: "#e8e8ed", fontSize: 0.16, align: "left" },
    { label: "Z", code: "KeyZ" },
    { label: "X", code: "KeyX" },
    { label: "C", code: "KeyC" },
    { label: "V", code: "KeyV" },
    { label: "B", code: "KeyB" },
    { label: "N", code: "KeyN" },
    { label: "M", code: "KeyM" },
    { label: ",", code: "Comma" },
    { label: ".", code: "Period" },
    { label: "/", code: "Slash" },
    { label: "shift", code: "ShiftRight", width: 2.7, color: "#e8e8ed", fontSize: 0.16, align: "right" },
  ],
  [
    { label: "fn", code: "Fn", width: 1.2, fontSize: 0.14, color: "#e8e8ed" },
    { label: "control", code: "ControlLeft", width: 1.2, fontSize: 0.12, color: "#e8e8ed" },
    { label: "option", code: "AltLeft", width: 1.2, fontSize: 0.12, color: "#e8e8ed" },
    { label: "command", code: "MetaLeft", width: 1.5, fontSize: 0.12, color: "#1d1d1f", textColor: "white" },
    { label: "", code: "Space", width: 6.2 },
    { label: "command", code: "MetaRight", width: 1.5, fontSize: 0.12, color: "#1d1d1f", textColor: "white" },
    { label: "option", code: "AltRight", width: 1.2, fontSize: 0.12, color: "#e8e8ed" },
  ],
]
