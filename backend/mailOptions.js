
function setMailOptions(name, email, message, EMAIL_USER) {
    const mailOptions = {
        from: `"Feedback from ${name}" <${email}>`,
        to: EMAIL_USER,
        subject: "New Feedback Received",
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #000;
                color: #fff;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                border: 2px solid #fcd904;
                border-radius: 10px;
                background-color: #000;
              }
              .header {
                text-align: center;
                border-bottom: 2px solid #fcd904;
                padding-bottom: 10px;
                margin-bottom: 20px;
              }
              .header h1 {
                color: #fcd904;
                font-size: 22px;
              }
              .content {
                line-height: 1.6;
              }
              .content p {
                margin: 10px 0;
                color: white;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 12px;
                color: #aaa;
              }
              .highlight {
                color: #fcd904;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Feedback Message From ParkEase</h1>
              </div>
              <div class="content">
                <p><span class="highlight">Name:</span> ${name}</p>
                <p><span class="highlight">Email:</span> ${email}</p>
                <p><span class="highlight">Message:</span></p>
                <p>${message}</p>
              </div>
              <div class="footer">
                <p>Thank you for your feedback!</p>
              </div>
            </div>
          </body>
          </html>
        `,
    };
    return mailOptions;
}

export default setMailOptions;
