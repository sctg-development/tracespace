// all store middleware
import {createAnalyticsMiddleware} from '../analytics'
import {createLogMiddleware} from '../logger'
import {createRenderMiddleware} from '../render'
import {createSettingsMiddleware} from '../settings'
import {Middleware} from './types'

export default function createMiddleware(useStorage = false): Array<Middleware> {
  return [
    createAnalyticsMiddleware(),
    createRenderMiddleware(),
    createSettingsMiddleware(useStorage),
    createLogMiddleware(),
  ]
}
