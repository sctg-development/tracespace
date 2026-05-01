import React from 'react'
import {CSSTransition} from 'react-transition-group'

type AnimationProps = {
  in: boolean | string | null | undefined
  children: React.ReactNode
}

export type FadeProps = AnimationProps

const FADE_STYLE = 'w-60 fade'

export function Fade(props: AnimationProps): JSX.Element {
  const nodeRef = React.useRef<HTMLDivElement>(null)

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={Boolean(props.in)}
      classNames={FADE_STYLE}
      timeout={500}
      mountOnEnter
      unmountOnExit
    >
      <div ref={nodeRef}>{props.children}</div>
    </CSSTransition>
  )
}

export type SlideProps = AnimationProps & {
  from: 'top' | 'bottom' | 'left' | 'right'
}

const SLIDE_STYLE = 'slide'

export function Slide(props: SlideProps): JSX.Element {
  const nodeRef = React.useRef<HTMLDivElement>(null)

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={Boolean(props.in)}
      classNames={`${SLIDE_STYLE}-${props.from}`}
      timeout={500}
      mountOnEnter
      unmountOnExit
    >
      <div ref={nodeRef}>{props.children}</div>
    </CSSTransition>
  )
}
