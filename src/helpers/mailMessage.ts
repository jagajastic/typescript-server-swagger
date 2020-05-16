const message = {
  confirmationEmail: (token: string) => {
    return `
      <p>Hi User,</p>

      <p>Welcome to Fansunity, Please click link below to verify your email address</p>

       <p> 
        <a href='${process.env.CLIENT_SIDE_URL}/auth/verify?token=${token}'>Verify Account</a>
      </p>
      <p>Welcome!</p>
    `;
  },
  forgotPassword: (token: string) => {
    return `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
  
  <p>Please click on the following link, or paste this into your browser to complete the process:</p>
  
  ${process.env.CLIENT_SIDE_URL}/auth/reset-password?token=${token}
  
  <p>If you did not request this, please ignore this email and your password will remain unchanged</p>`;
  },
  resetPassword: (email: string) => {
    return `Hello
      This is a confirmation that the password for your account ${email} has just been changed`;
  },
};

export default message;
