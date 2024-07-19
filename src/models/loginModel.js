import mongoose from 'mongoose';

const loginSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    token:{
        type:String,
        required:[true,'please provide a token'],
        unique:true,
    },
    city: String,
    country: String ,
    region: String ,
    latitude: String ,
    longitude: String ,
    ip: String,
    browser_name: String,
    browser_version: String,
    os_name: String,
    os_version: String,
    
})

const Login = mongoose.models.logins || mongoose.model('logins',loginSchema);

export default Login;
