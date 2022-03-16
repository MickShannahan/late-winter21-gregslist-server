import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const BidSchema = new Schema(
  {
    carId: { type: Schema.Types.ObjectId, required: true, ref: 'Car' },
    accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    amount: { type: Number, required: true, min: 100 }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

// Creates the requirement by the Database that this object can only exist with a unique combo of CarId And AccountId
BidSchema.index({ carId: 1, accountId: 1 }, { unique: true })

BidSchema.virtual('car', {
  localField: 'carId',
  foreignField: '_id',
  justOne: true,
  ref: 'Car'
})

BidSchema.virtual('bidder', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
