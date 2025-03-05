import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send('Hello from the / route!')
})

router.get('/about', (req, res) => {
  res.send('This is the about page!')
})

export default router
