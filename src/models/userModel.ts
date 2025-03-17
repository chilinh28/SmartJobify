import mongoose, { Schema } from 'mongoose'

// ====== User Schema ======
const userSchema = new Schema(
  {
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['employer', 'candidate'], required: true },
    password: { type: String, required: true },
    refresh_token: { type: String, required: false }
  },
  { timestamps: true }
)
// ====== User Candidate Schema ======
const userCandidateSchema = new Schema(
  {
    user_id: { type: String, ref: 'User', required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    avatar: { type: String },
    personal_link: { type: String },
    working_time: { type: String },
    bio: { type: String },
    skills: { type: String }
  },
  { timestamps: true }
)

// ====== User Recruitment Schema ======
const userRecruitmentSchema = new Schema(
  {
    user_id: { type: String, ref: 'User', required: true },
    phone: { type: Number, required: true },
    company_name: { type: String, required: true },
    company_website: { type: String },
    company_desc: { type: String },
    company_size: { type: String },
    avatar: { type: String }
  },
  { timestamps: true }
)

// ====== Export Models ======
export const User = mongoose.model('User', userSchema)
export const UserCandidate = mongoose.model('UserCandidate', userCandidateSchema)
export const UserRecruitment = mongoose.model('UserRecruitment', userRecruitmentSchema)
