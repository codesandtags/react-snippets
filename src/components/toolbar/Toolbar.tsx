import "./Toolbar.css";

type ToolbarProps = {
    handleClick: (type: "white" | "yellow" | "black") => void
}

export default function Toolbar({ handleClick }: ToolbarProps) {
  return (
    <div className="toolbar">
      <button
        className="white-btn"
        onClick={() => handleClick("white")}
        aria-label="White"
      />
      <button
        className="yellow-btn"
        onClick={() => handleClick("yellow")}
        aria-label="Yellow"
      />
      <button
        className="black-btn"
        onClick={() => handleClick("black")}
        aria-label="Black"
      />
    </div>
  )
}
