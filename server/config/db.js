const mongoose = require("mongoose");

const connecttodb = async ()=>{

try{
    const conn = await  mongoose.connect(process.env.MONGO_URI)
    console.log(`MONGO_DB Connected : ${conn.connection.host}`)

}
catch(error){
console.log(`ERROR : ${error.message}`)
 process.exit(1)
}
}
module.exports = connecttodb