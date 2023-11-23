import express from 'express'
import { json } from 'body-parser'
import { connectDatabase } from './config/database'
import adminRoutes from './routes/admin-routes'
import buyerRoutes from './routes/buyer-routes'
import farmerRoutes from './routes/farmer-routes'

const app = express()
const PORT = 8000
connectDatabase()

app.use(json())


app.use('/admin', adminRoutes)
app.use('/buyer', buyerRoutes)
app.use('/farmer', farmerRoutes)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})