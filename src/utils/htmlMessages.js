export const getEmailMessage = ({name}) => {
    return `
<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 5px 10px rgba(0,0,0,0.1);">
    <div style="text-align: center;">
      <h2 style="color: #4CAF50;">🎉 Welcome to CareerConnect!</h2>
    </div>
    <p style="font-size: 16px; color: #333;">Hi <strong>${name}</strong>,</p>
    <p style="font-size: 16px; color: #333;">
      We're excited to have you join our job-seeking and hiring platform! Whether you're here to find your dream job or the perfect candidate, you're in the right place.
    </p>
    <div style="margin: 30px 0; text-align: center;">
      <a href="{{careerConnect}}" style="background-color: #4CAF50; color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-size: 16px;">Career Connect</a>
    </div>
    <p style="font-size: 14px; color: #777;">If you didn’t request this email, you can safely ignore it.</p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
    <p style="font-size: 14px; color: #999; text-align: center;">
      CareerConnect Team &copy; 2025
    </p>
  </div>
</div>
`;
}

export const getJobApplicationEmail = ({ name, jobTitle }) => {
    return `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 40px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
        <div style="text-align: center;">
          <h2 style="color: #4CAF50;">✅ Application Received!</h2>
        </div>
        <p style="font-size: 16px; color: #333;">Hi <strong>${name}</strong>,</p>
        <p style="font-size: 16px; color: #333;">
          Your application for the position of <strong>${jobTitle}</strong> has been successfully received on CareerConnect.
        </p>
        <p style="font-size: 16px; color: #333;">
          Our team or the employer will review your CV and get back to you shortly.
        </p>
        <div style="margin: 30px 0; text-align: center;">
          <a href="" style="background-color: #4CAF50; color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-size: 16px;">Visit CareerConnect</a>
        </div>
        <p style="font-size: 14px; color: #777;">Thanks for trusting us to grow your career 🚀</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="font-size: 14px; color: #999; text-align: center;">
          CareerConnect Team &copy; 2025
        </p>
      </div>
    </div>
    `;
  };
  
  export const getStatusUpdateEmail = ({ name, status, jobTitle }) => {
    const statusStyles = {
      rejected: {
        title: '❌ Application Rejected',
        message: `We're sorry to inform you that your application for <strong>${jobTitle}</strong> was not successful.`,
        color: '#e74c3c'
      },
      interview: {
        title: '📅 Interview Invitation',
        message: `Congratulations! You’ve been shortlisted for an interview for <strong>${jobTitle}</strong>. We’ll contact you soon with the details.`,
        color: '#3498db'
      },
      accepted: {
        title: '✅ Application Accepted',
        message: `Great news! You’ve been accepted for the job: <strong>${jobTitle}</strong>. Welcome aboard!`,
        color: '#2ecc71'
      }
    };
  
    const { title, message, color } = statusStyles[status] || {
      title: '🔔 Status Update',
      message: `The status of your application for <strong>${jobTitle}</strong> has been updated.`,
      color: '#f39c12'
    };
  
    return `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 40px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 5px 10px rgba(0,0,0,0.05);">
        <div style="text-align: center;">
          <h2 style="color: ${color};">${title}</h2>
        </div>
        <p style="font-size: 16px; color: #333;">Hi <strong>${name}</strong>,</p>
        <p style="font-size: 16px; color: #333;">${message}</p>
        <p style="font-size: 14px; color: #777; margin-top: 30px;">If you have any questions, feel free to reach out.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="font-size: 14px; color: #999; text-align: center;">CareerConnect Team &copy; 2025</p>
      </div>
    </div>
    `;
  };
  