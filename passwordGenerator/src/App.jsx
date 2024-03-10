import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [isChar, setIsChar] = useState(false);
  const [isNum, setIsNum] = useState(false);
  const [password, setPassword] = useState(false);

  const generatePassword = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNum) str += "0123456789";
    if (isChar) str += "~`!@#$%^&*(){}[]:;";

    let i;
    let password = "";
    for (i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * 100 + 1) % str.length;
      password += str[index];
    }
    setPassword(password);
  }, [length, isChar, isNum, setPassword]);
  const passwordRef = useRef(null);
  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [setPassword, length, isNum, isChar]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500 ">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-sky-700"
        >
          Copy
        </button>
      </div>
      <div className="flex ext-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(Number(e.target.value));
            }}
          />
          <label>Length : {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={isNum}
            id="numberInput"
            onChange={() => {
              setIsNum((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={isChar}
            id="charInput"
            onChange={() => {
              setIsChar((prev) => !prev);
            }}
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
