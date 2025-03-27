import nodemailer from "nodemailer";

// Creating the Email Sender (Transporter)
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail as the email service
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,// Store in .env
        pass: process.env.EMAIL_PASSWORD,// Your Gmail password or app-specific password
    }
});

// Welcome email function
const sendWelcomeEmail = async (userEmail, firstName) => {
    try {
      const mailOptions = {
        from: "Uber Team <no-reply@link2zakakarim@gmail.com>",
        to: userEmail,
        subject: `Welcome to Uber , ${firstName}!`,
        text: `Hi ${firstName},\n\nWelcome to Uber ! We're excited to have you on board.\n\nStart booking rides today!\n\nThe Uber Team is here for you`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1fbad6;">Welcome to Uber Your Ride Partner, ${firstName}!</h2>
            <p>We're excited to have you on board.</p>
            <p>Start booking rides today!</p>
            <br/>
            <p>Best regards,</p>
            <p>Have the Best Rides of your life,</p>
            <p><strong>The Uber Team</strong></p>
          </div>
        `
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
      console.log(`Welcome email sent to ${userEmail}`);
    } catch (error) {
      console.error("Failed to send welcome email:", error);
      // We don't throw here because we don't want email failure to block registration
    }
  };
  
  export { sendWelcomeEmail};



