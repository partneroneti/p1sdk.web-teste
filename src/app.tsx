import { CallbackCamera, initializeCamera } from '@partner-group/sdk-web-local';
import { config } from './config/pg-sdk'
import classes from './styles/app.module.css'
import './styles/global.css'
import './styles/sdk.css'

function App() {
  async function handleOpenCamera() {
    const callbacks: CallbackCamera = {
      on: {
        success: (obj) => {
          console.log({ base64: obj.base64 })
          console.log({ encrypted: obj.encrypted })
        },
        error: (error) => {
          console.error({ error })
        },
        support: (supportMessage) => {
          console.error({ supportMessage: supportMessage.message })
        },
      },
    }

    await initializeCamera(callbacks, config)
  }

  return (
    <div className={classes.container}>
      <button
        onClick={handleOpenCamera}
        className={classes.button}
      >
        Abrir câmera
      </button>
      <div id='box-camera'></div>
    </div>
  );
}

export default App;