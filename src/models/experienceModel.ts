import mongoose, { Schema } from 'mongoose'

const experienceSchema = new Schema(
  {
    candidate_id: { type: String, ref: 'UserCandidate', required: true },
    company_name: { type: String, required: true },
    position: { type: String, required: true },
    description: { type: String },
    start_date: { type: Date, required: true },
    end_date: { type: Date }
  },
  { timestamps: true }
)

export const Experience = mongoose.model('Experience', experienceSchema)
