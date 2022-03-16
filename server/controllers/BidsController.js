import { Auth0Provider } from '@bcwdev/auth0provider'
import { bidsService } from '../services/BidsService'
import BaseController from '../utils/BaseController'

export class BidsController extends BaseController {
  constructor() {
    super('api/bids')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.editBid)
  }

  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const bid = await bidsService.createOrUpdate(req.body)
      return res.send(bid)
    } catch (error) {
      next(error)
    }
  }

  async editBid(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const update = await bidsService.createOrUpdate(req.body)
      return res.send(update)
    } catch (error) {
      next(error)
    }
  }
}
