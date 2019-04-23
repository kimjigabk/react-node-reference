//return an html that can be used as any body of a survey email]
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
          <a href="${keys.redirectDomain}/api/surveys/received">Yes</a>
        </div>
        <div>
          <a href="${keys.redirectDomain}/api/surveys/received">Yes</a>
        </div>
      </div>
    </body>
  </html>
  `;
};
