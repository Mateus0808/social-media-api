import express from 'express'

export class App {
  public server: express.Application

  constructor () {
    this.server = express()
  }
}
