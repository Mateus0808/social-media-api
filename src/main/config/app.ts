import express, { Express } from 'express'

import setupRoutes from './routes'

export class App {
  public server: Express

  constructor () {
    this.server = express()
    this.router()
  }

  private router () {
    setupRoutes(this.server)
  }
}
