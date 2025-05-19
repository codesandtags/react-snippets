import * as React from "react";
import './styles.css';

export default function FollowTheLeader() {
  const [position, setPosition] = React.useState([0, 0]);
  const boxRef = React.useRef<HTMLDivElement>(null);
  
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (boxRef.current) {
      const { width, height } = boxRef.current.getBoundingClientRect();
      setPosition([e.clientX - width / 2, e.clientY - height / 2]);
    }
  }
    

  return (
    <div className="wrapper" onClick={handleClick}>
      <div
        ref={boxRef}
        className="box"
        style={{
          transform: `translate(${position[0]}px, ${position[1]}px)`,
          transition: "transform 1s"
        }}
      />
    </div>
  );
}
