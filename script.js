$(function() {

    // Menu Responsive
    $(".menu-responsive").toggle();
  
    $(".menu-bars").on("click", function() {
        $(".menu-responsive").toggle("slow");
    });
  
  
    // Scroll click on menu
    $(".scroll").on("click", function() {
        $(this).each(function() {
            const sectionTop = $(this.hash).offset().top;
            $("html, body").animate({
                scrollTop: sectionTop
            }, 1500);
        });
    });
  
  
    // Progress Bar Animate
    window.sr = ScrollReveal();
    sr.reveal(".progress-bar", {
       origin: "left",
       duration: 2000,
       distance: "100%"
    });
  
  
    // Contact Text Animate
    const sentences = ["web designer ?", "web developer ?"];
    let i = 0;
  
    setInterval(function() {
        $(".text-animate").fadeOut(function() {
            $(this).text(sentences[i = (i + 1) % sentences.length]).fadeIn();
        });
    }, 2500);
  
  });

  

  document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        document.getElementById('response').innerText = result.message;
    } catch (error) {
        document.getElementById('response').innerText = 'An error occurred. Please try again later.';
    }
});

//backend

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

app.post('/send', (req, res) => {
    const { name, email, message } = req.body;

    // Set up Nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail', // e.g., 'gmail'
        auth: {
            user: 'pritinavale365@gmail.com', // Replace with your email
            pass: 'Priti@7721'   // Replace with your email password
        }
    });

    // Email options
    let mailOptions = {
        from: email,
        to: 'pritinavale365@gmail.com', // Replace with your email
        subject: `Contact Form Submission from ${name}`,
        text: message
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error occurred: ' + error.message);
        }
        res.send('Message sent successfully!');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('/send', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('response').innerText = data;
    })
    .catch(error => {
        document.getElementById('response').innerText = 'An error occurred: ' + error.message;
    });
});


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/contactForm', { useNewUrlParser: true, useUnifiedTopology: true });

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

app.post('/send', (req, res) => {
    const { name, email, message } = req.body;

    const newContact = new Contact({ name, email, message });
    newContact.save((err) => {
        if (err) {
            return res.status(500).send('Error occurred: ' + err.message);
        }
        res.send('Message sent and saved successfully!');
    });
});


