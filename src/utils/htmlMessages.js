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