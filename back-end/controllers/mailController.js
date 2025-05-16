import { createTransport } from 'nodemailer';
import { config } from "dotenv";
config()

const USER = process.env.USER;
const APP_PASSWORD = process.env.APP_PASSWORD;
// Configure Nodemailer transporter
const transporter = createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: USER,
        pass: APP_PASSWORD
    }
});

const autoReply = async (email) =>{
    const mailOptions={
        from:{
            name:'HNU Electronics AUTO REPLY',
            address:USER
        },
        to: email,
        subject: "AUTO REPLY",
        text:"HELLO , we have recived your email and we will contact you soon"

    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Auto-reply sent to ${email}`);
    } catch (error) {
        console.error(`Failed to send email to ${email}:`, error);
    };
};
    


// Controller function to handle email subscription
export const subscribeUser = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    const mailOptions = {
        from: {
            name: 'HNU Electronics Mail List',
            address: USER
        },
        to: email, // Send email to user
        subject: 'Welcome to HNU Electronics!',
        text: `Hello, you have been successfully added to HNU Electronics mail list.`,
        html: `<p><b>Welcome!</b> You have been successfully subscribed to the HNU Electronics mailing list.</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Auto-reply sent to ${email}`);
        res.status(200).json({ message: `Subscription email sent to ${email}` });
    } catch (error) {
        console.error(`Failed to send email to ${email}:`, error);
        res.status(500).json({ error: "Failed to send email" });
    }
};

export const contactForm = async (req, res) => {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const mailOptions = {
        from: email,
        to: USER,
        phone: `Contact Form: ${phone}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong> ${message}</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Message sent successfully!" });
        await autoReply(email);
    } catch (error) {
        console.error("Email sending failed:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
};
