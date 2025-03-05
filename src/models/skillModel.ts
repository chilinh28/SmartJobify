import mongoose, { Schema } from 'mongoose'

const skillSchema = new Schema(
  {
    candidate_id: { type: String, ref: 'UserCandidate', required: true },
    skill_name: { type: String, required: true }
  },
  { timestamps: true }
)

export const Skill = mongoose.model('Skill', skillSchema)
