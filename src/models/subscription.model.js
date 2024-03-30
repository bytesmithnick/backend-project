import mongoose, {Schema} from "mongoose";

const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId, // subscriber
        ref: 'User'
    },
    channel: {
        type: Schema.Types.ObjectId, // whom subscriber is subscribing
        ref: 'User'
    }
},{timestamps: true})

export const Subscription = mongoose.model('Subscription', subscriptionSchema)