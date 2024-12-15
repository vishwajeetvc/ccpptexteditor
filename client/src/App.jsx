import { useState } from "react"

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState([]);

  function handleCR() {
    fetch('http://localhost:3000', {
      method: 'POST',
      body: code,
    }).then(resp => resp.text())
      .then(data => {
        setOutput(data.split('\\n'));
        console.log(data.split('\\n'));
      });
  }

  return (<>
    <h1>My Own C & C++ text Editor.</h1>
    <textarea
      style={{
        padding: '20px',
        lineHeight: '20px',
        resize: 'none',
      }}
      spellCheck={false}
      rows={5} cols={55}
      value={code}
      onChange={e => {
        setCode(e.target.value);
      }}
    ></textarea >
    <div>
      <button onClick={handleCR}>Compile and Run</button>
    </div>
    <div
      style={{
        background: '#212121',
        color: 'red',
        width: '453px',
        marginTop: '5px',
        padding: '5px 20px',
        borderRadius: '4px',
        lineHeight: "5px",
        fontFamily: 'sans-serif',
      }}
    >{
        output.map((item, i) => {
          let str = item.replaceAll("\\", '');
          if (str[0] == '"') {
            str = str.slice(1);
          }
          return <pre key={i}>{str}</pre>
        })
      }</div>
  </>)
}

export default App
