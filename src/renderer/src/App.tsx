import electronLogo from "./assets/electron.svg";
import Versions from "./components/Versions";

import { AnsiUp } from "ansi_up";
// import { useEffect, useState } from "react";

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send("ping");

  const fs = window.api.fs;
  const fsContent = fs.readFileSync("/etc/hosts", "utf-8");

  // // tempy is ESM module with dependencies that can't be running in browser context
  // const temporaryFile = window.api.temporaryFile;
  // const temporaryFilePath = temporaryFile({ extension: "tmp" });

  // node-fetch can't be externalized then must be imported in preload
  // const [httpContent, setHttpContent] = useState("");

  // useEffect(() => {
  //   const fetch = window.api.fetch;
  //   fetch("https://ifconfig.me/ip")
  //     .then((response) => {
  //       console.log(response);
  //       return response.text();
  //     })
  //     .then((text) => {
  //       setHttpContent(text);
  //     });
  // });

  // ESM module but can be transplied and bundled to renderer asset
  const ansiContent = new AnsiUp().ansi_to_html(
    "I want \x1b[31mRED\x1b[0m color",
  );

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
      <Versions />
      <div>FS content: {fsContent}</div>
      {/* <div>HTTP content: {httpContent}</div> */}
      {/* <div>Temporary file path: {temporaryFilePath}</div> */}
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: just a simple test */}
      <div dangerouslySetInnerHTML={{ __html: ansiContent }} />
    </>
  );
}

export default App;
