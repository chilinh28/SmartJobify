import mongoose, { Schema } from 'mongoose'

const categorySchema = new Schema(
  {
    name_category: { type: String, required: true, unique: true }
  },
  { timestamps: true }
)

const jobSchema = new Schema(
  {
    employer_id: { type: String, ref: 'UserRecruitment', required: true },
    category_id: { type: Schema.Types.ObjectId, ref: 'CategoryJob', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    job_type: { type: String, required: true },
    requirements: { type: String, required: true },
    salary_from: { type: Number, required: true },
    salary_to: { type: Number, required: true },
    status: { type: Boolean, default: true },
    posted_at: { type: Date, default: Date.now }
  },
  { timestamps: true }
)

export const Job = mongoose.model('Job', jobSchema)
export const CategoryJob = mongoose.model('CategoryJob', categorySchema)
