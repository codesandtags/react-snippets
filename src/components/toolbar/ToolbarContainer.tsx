import * as React from "react"
import Toolbar from "./Toolbar"

import "./Toolbar.css";

export default function ToolbarContainer() {
  const white = React.useRef<HTMLDivElement>(null)
  const black = React.useRef<HTMLDivElement>(null)
  const yellow = React.useRef<HTMLDivElement>(null)

  const handleClick = (type: "white" | "yellow" | "black") => {
    let ref: React.RefObject<HTMLDivElement> | null = null

    if (type === "white") ref = white
    if (type === "yellow") ref = yellow
    if (type === "black") ref = black

    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      })
    }
  }

  return (
    <div>
      <Toolbar handleClick={handleClick} />
      <div ref={white} className="white" />
      <div ref={yellow} className="yellow" />
      <div ref={black} className="black" />
    </div>
  )
}