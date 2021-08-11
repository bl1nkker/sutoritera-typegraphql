import mongoose from 'mongoose'

export const testConnection = async() => await mongoose.connect('mongodb://localhost:27017/sutoritera-test', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false});