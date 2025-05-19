import * as React from "react";

function TextInput() {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current !== null) {
      ref.current.focus();
    }
  }, []);
  
  return (
    <div>
      <h1>Autofocus Input</h1>
      <label htmlFor="focus">Email Address</label>
      <input ref={ref} id="focus" type="email" placeholder="Enter your email" />
    </div>
  );
}

export default TextInput;
