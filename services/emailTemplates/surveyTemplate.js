//return an html that can be used as any body of a survey email]

// const survey = new Survey({
//   title,
//   subject,
//   body,
//   recipients: recipients.split(",").map(email => ({ email: email.trim() })),
//   _user: req.user.id,
//   dateSent: Date.now()
// });
const keys = require("../../config/keys");
module.exports = survey => {
  return `
  <html>
    <body>
      <div style="text-align: center;">
        <h3> Hello</h3>
        <p> Please answer the following question:</p>
        <p>${survey.body}</p>
        <div>
          <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
        </div>
        <div>
          <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
        </div>
      </div>
    </body>
  </html>
  `;
};
