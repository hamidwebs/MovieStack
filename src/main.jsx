import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import store from './store/store'
import { Provider } from 'react-redux'
import { SpeedInsights } from "@vercel/speed-insights/react"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <SpeedInsights />
  </Provider>
)