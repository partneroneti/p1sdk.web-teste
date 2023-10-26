interface ConfigProps {
  sdk: {
    projectNumber: string
    projectId: string
    mobileSdkAppId: string
    hostname: string
    hostInfo: string
    hostKey: string
  }
  builder: {
    modelsPath: string
    resourcesDirectory: string
  }
  theme: {
    colorSilhouetteSuccess: string
    colorSilhouetteError: string
    colorSilhouetteNeutral: string
    backgroundColor: string
    colorText: string
    backgroundColorComponents: string
    colorTextComponents: string
    backgroundColorButtons: string
    colorTextButtons: string
    backgroundColorBoxMessage: string
    colorTextBoxMessage: string
    htmlPopupLoading: string
  }
}

export const config: ConfigProps = {
  sdk: {
    projectNumber: '9200425810982653706',
    projectId: 'crefisa',
    mobileSdkAppId: '3:526108:js',
    hostname: 'http://localhost:3000',
    hostInfo: 'nRMqSJJeWMZ0K4n9Dxs/Zhb5RslAxes+pmH0gJgmVtZdwNyOQ5wThBl1Sd+1hKs+D0gFCgAOsDVc6cWdPbtDMQ==',
    hostKey: 'F/c0dcA4RT2GnaqxrwpFpUnaJkVrKXLwRvUmlbwAVERLOdUWVer6rXC4/iWPu0Ou',
  },
  builder: {
    modelsPath: '/pg-sdk/models',
    resourcesDirectory: '/pg-sdk/resources/3.10.0',
  },
  theme: {
    colorSilhouetteSuccess: '#00EB5E',
    colorSilhouetteError: '#D50000',
    colorSilhouetteNeutral: '#777',
    backgroundColor: '#777',
    colorText: '#FFF',
    backgroundColorComponents: '#00EB5E',
    colorTextComponents: '#221C46',
    backgroundColorButtons: '#00EB5E',
    colorTextButtons: '#221C46',
    backgroundColorBoxMessage: '#777',
    colorTextBoxMessage: '#FFF',
    htmlPopupLoading:  `<div style="position: absolute; top: 45%; right: 50%; transform: translate(50%, -50%); z-index: 10; text-align: center;">Carregando câmera</div>`,
  }
}