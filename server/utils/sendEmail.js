
const nodemailer = require('nodemailer')

// Transporter banao - ye email bejne ki machine hain 
const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.EMAIL_USER ,
        pass : process.env.EMAIL_PASS 
    }
})

const sendEmail = async ({ to , subject , html }) => {
    try {
        const mailOptions = {
            from : `DevConnect <${process.env.EMAIL_USER}>` ,
            to ,
            subject ,
            html 
        }
     
         await transporter.sendMail(mailOptions)
         console.log(`Email sent to ${to}`)


   

    } catch (error) {
        console.log('Email error :', error.message)
        // Email fail hone par crash na ho , isliye error throw kiya hian 
    }
}


module.exports = sendEmail