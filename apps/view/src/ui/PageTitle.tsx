import React from 'react'
import cx from 'classnames'

import {Logo} from './Logo'

export type PageTitleProps = {
  title?: string
  subtitle?: string
  showLogo?: boolean
  className?: string
}

export function PageTitle(props: PageTitleProps): JSX.Element {
  const {
    title = 'tracespace',
    subtitle,
    showLogo = true,
    className,
  } = props

  return (
    <div className={cx('dib', className)}>
      {showLogo && <Logo className="pl1 mr3 v-btm brand" />}
      <h1 className="dib mv0 f3 lh-title normal">
        {title}
        {subtitle && <span className="b">{` ${subtitle}`}</span>}
      </h1>
    </div>
  )
}
