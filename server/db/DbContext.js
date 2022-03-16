import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { BidSchema } from '../models/Bid'
import { CarSchema } from '../models/Car'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  // adds to the db
  Bids = mongoose.model('Bid', BidSchema)
  Cars = mongoose.model('Car', CarSchema)
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
}

export const dbContext = new DbContext()
