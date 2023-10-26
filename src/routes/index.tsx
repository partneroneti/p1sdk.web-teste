import React from 'react'
import { Routes as ReactDOMRoutes, Route } from 'react-router-dom'

import { Home } from '@/pages/home'
import { Selfie } from '@/pages/selfie'
import { Result } from '@/pages/result'

const Routes: React.FC = () => {
  return (
    <ReactDOMRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/selfie" element={<Selfie />} />
      <Route path="/resultado" element={<Result />} />
    </ReactDOMRoutes>
  )
}

export default Routes
