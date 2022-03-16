import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { carsService } from './CarsService'

class BidsService {
  // get cars this account has bid on
  async getAccountBids(query) {
    const carBids = await dbContext.Bids.find(query).populate('car')
    // converts the data transfer object (DTO) into a ViewModel
    return carBids.map(mongooseDocument => {
      const carBid = mongooseDocument.toJSON()
      return {
        bidId: carBid.id,
        amount: carBid.amount,
        ...carBid.car
      }
    })
  }

  // get accounts that have bid on this car
  async getCarBids(query) {
    const bidderBids = await dbContext.Bids.find(query).populate('bidder', 'name picture')
    return bidderBids.map(mongooseDocument => {
      const bidderBid = mongooseDocument.toJSON()
      return {
        bidId: bidderBid.id,
        amount: bidderBid.amount,
        ...bidderBid.bidder
      }
    })
  }

  async createOrUpdate(bid) {
    // bid must be an increase in price
    const car = await carsService.getById(bid.carId)
    if (bid.amount <= car.price) {
      throw new BadRequest('Bids Must Be an Increase')
    }
    // Update bid, or if not found create
    // upsert true says to create one if one is not found
    const newBid = await dbContext.Bids.findOneAndUpdate({ carId: bid.carId, accountId: bid.accountId }, bid, { upsert: true, new: true })
    // update the car's price
    car.price = bid.amount
    // save the change to the car
    await car.save()
    return newBid
  }
}

export const bidsService = new BidsService()
