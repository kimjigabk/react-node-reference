//return an html that can be used as any body of a survey email]

module.exports = survey => {
  return `
  <html>
    <body>
      <div style="text-align: center;">
        <h3> Hello</h3>
        <p> Please answer the following question:</p>
        <p>${survey.body}</p>
        <div>
          <a href="http://localhost:3000">Yes</a>
        </div>
        <div>
          <a href="http://localhost:3000">Yes</a>
        </div>
      </div>
    </body>
  </html>
  `;
};
