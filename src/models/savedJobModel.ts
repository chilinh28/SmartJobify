import mongoose, { Schema } from 'mongoose'

const savedJobSchema = new Schema(
  {
    candidate_id: { type: String, ref: 'UserCandidate', required: true },
    job_id: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    saved_at: { type: Date, default: Date.now }
  },
  { timestamps: true }
)

export const SavedJob = mongoose.model('SavedJob', savedJobSchema)
