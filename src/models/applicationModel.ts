import mongoose, { Schema } from 'mongoose'

const applicationSchema = new Schema(
  {
    candidate_id: { type: String, ref: 'UserCandidate', required: true },
    job_id: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    status: { type: String, required: true, enum: ['pending', 'reviewed', 'accepted', 'rejected'], default: 'pending' },
    applied_at: { type: Date, default: Date.now },
    link_cv: { type: String, required: true },
    cover_letter: { type: String, required: false },
    upload_date: { type: Date, default: Date.now }
  },
  { timestamps: true }
)

export const Application = mongoose.model('Application', applicationSchema)
