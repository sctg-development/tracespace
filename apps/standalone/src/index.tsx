import React from 'react'
import {createRoot} from 'react-dom/client'

import './index.css'
import {TracespaceViewer} from '@sctg/tracespace-view'

createRoot(document.querySelector('[data-hook=root]') as Element).render(
  <div className="h-screen">
    <TracespaceViewer
      showNav={true}
      showPageTitle={false}
      showPageTitleLogo={false}
      pageTitle="tracespace"
      pageSubtitle="react standalone example"
      showLoadFiles={false}
      useStorage={false}
      file="/arduino-uno.zip"
    />
  </div>
)