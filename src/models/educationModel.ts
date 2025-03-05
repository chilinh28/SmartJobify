import mongoose, { Schema } from 'mongoose'

const educationSchema = new Schema(
  {
    candidate_id: { type: String, ref: 'UserCandidate', required: true },
    school_name: { type: String, required: true },
    degree: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date }
  },
  { timestamps: true }
)

export const Education = mongoose.model('Education', educationSchema)
