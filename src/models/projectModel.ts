import mongoose, { Schema } from 'mongoose'

const projectSchema = new Schema(
  {
    candidate_id: { type: String, ref: 'UserCandidate', required: true },
    project_name: { type: String, required: true },
    description: { type: String },
    link: { type: String },
    start_date: { type: Date, required: true },
    end_date: { type: Date }
  },
  { timestamps: true }
)

export const Project = mongoose.model('Project', projectSchema)
