
const applicationSubmittedEmail = (developerName , jobTitle )=> {
return `
 <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #2563eb; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">DevConnect</h1>
      </div>
      
      <div style="padding: 30px; background-color: #f9fafb;">
        <h2 style="color: #1f2937;">Application Submitted! 🎉</h2>
        
        <p style="color: #4b5563;">
          Hi <strong>${developerName}</strong>,
        </p>
        
        <p style="color: #4b5563;">
          Your application <strong>${jobTitle}</strong> is submitted 
          successfully to our team .
        </p>
        
        <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="color: #1e40af; margin: 0;">
            ✅ Application Status: <strong>Pending</strong>
          </p>
        </div>
        
        <p style="color: #4b5563;">
          Recruiter will review your application and we will send you 
          an email when your status for the job application is updated .
          Thanks .
        </p>
        
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          Best of luck! 🚀<br/>
          Team DevConnect
        </p>
      </div>
    </div> `

}

const statusUpdateEmail = (developerName , jobTitle , status) =>{
    const statusColors = {
   shortlisted : '#16a34a',
   rejected : '#dc2626' ,
   pending : '#d97706'
    }

const statusMessages = {
    shortlisted : 'Congratulations , You are selected ! 🎉' ,
    rejected : 'Better Luck next time ! ' ,
    pending : " Your application is under review ."
}

return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #2563eb; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">DevConnect</h1>
      </div>
      
      <div style="padding: 30px; background-color: #f9fafb;">
        <h2 style="color: #1f2937;">Application Status Update</h2>
        
        <p style="color: #4b5563;">
          Hi <strong>${developerName}</strong>,
        </p>
        
        <p style="color: #4b5563;">
          Your application status for the post of 
          <strong>${jobTitle}</strong> is updated .
        </p>
        
        <div style="background-color: #f3f4f6; padding: 15px; 
             border-radius: 8px; margin: 20px 0; 
             border-left: 4px solid ${statusColors[status]};">
          <p style="margin: 0; font-size: 18px;">
            Status: 
            <strong style="color: ${statusColors[status]};">
              ${status.toUpperCase()}
            </strong>
          </p>
          <p style="color: #4b5563; margin-top: 8px;">
            ${statusMessages[status]}
          </p>
        </div>
        
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          Team DevConnect
        </p>
      </div>
    </div>
  `

}

module.exports = { applicationSubmittedEmail , statusUpdateEmail }
