import { Auth0Provider } from '@bcwdev/auth0provider'
import { bidsService } from '../services/BidsService'
import { carsService } from '../services/CarsService'
import BaseController from '../utils/BaseController'

export class CarsController extends BaseController {
  constructor() {
    super('api/cars')
    this.router
      .get('', this.getAll)
      // the : signifys that this portion of the url is a variable and adds property on the 'params' object
      .get('/:id', this.getById)
      // all requests after the use require auth
      .get('/:id/bids', this.getBids)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const cars = await carsService.getAll(req.query)
      return res.send(cars)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const car = await carsService.getById(req.params.id)
      return res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async getBids(req, res, next) {
    try {
      const bids = await bidsService.getCarBids({ carId: req.params.id })
      return res.send(bids)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NEVER TRUST THE CLIENT TO TELL YOU WHO THEY ARE IN THE BODY
      req.body.creatorId = req.userInfo.id
      const car = await carsService.create(req.body)
      return res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      // NEVER TRUST THE CLIENT TO TELL YOU WHO THEY ARE IN THE BODY
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const update = await carsService.edit(req.body)
      return res.send(update)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      // NEVER TRUST THE CLIENT TO TELL YOU WHO THEY ARE IN THE BODY
      const userId = req.userInfo.id
      const carId = req.params.id
      await carsService.remove(carId, userId)
      return res.send('Delorted')
    } catch (error) {
      next(error)
    }
  }
}
