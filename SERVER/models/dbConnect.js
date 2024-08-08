import mongoose from "mongoose"
const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.DATABASE_URI)
        console.log(`MongoDB Connected: ${connection.host}`)
    }
    catch (e) {
        console.log(e)
    }
}

export default connectDB 