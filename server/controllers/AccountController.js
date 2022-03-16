import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { bidsService } from '../services/BidsService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/bids', this.getBids)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getBids(req, res, next) {
    try {
      const bids = await bidsService.getAccountBids({ accountId: req.userInfo.id })
      res.send(bids)
    } catch (error) {
      next(error)
    }
  }
}
