import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'

import { useEffect, useState } from 'react'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const fs = window.api.fs
  const fileContent = fs.readFileSync('/etc/hosts', 'utf-8')

  const [httpContent, setHttpContent] = useState('')

  useEffect(() => {
    const fetch = window.api.fetch
    fetch('https://ifconfig.me/ip')
      .then((response) => {
        console.log(response)
        return response.text()
      })
      .then((text) => {
        setHttpContent(text)
      })
  })

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
      </div>
      <Versions></Versions>
      <div>File content: {fileContent}</div>
      <div>HTTP content: {httpContent}</div>
    </>
  )
}

export default App
