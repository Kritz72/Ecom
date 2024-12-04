import nodemailer from 'nodemailer';

// Function to generate a 6-digit OTP
export function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Nodemailer setup for sending email
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use TLS
    auth: {
        user: 'kritty.sedlazech143@gmail.com', // Your email address
        pass: 'jdob mgdx icek alku', // Your email password
    },
    tls: {
        rejectUnauthorized: false, // Ignore certificate errors
    },
});

// Function to send OTP email
export async function sendOtpEmail(email, otp) {
    const mailOptions = {
        from: 'kritty.sedlazech143@gmail.com',
        to: email,
        subject: 'Your OTP for Registration',
        text: `Your OTP is ${otp}. It is valid for 10 minutes.`
    };

    return transporter.sendMail(mailOptions);
}
