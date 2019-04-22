const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
// const helper = require('@sendgrid/mail');
const keys = require("../config/keys");

// 이렇게 호출됨  new Mailer(survey, surveyTemplate(survey));
class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();
    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email("no-replay@emaily.com");
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }
  formatAddresses(recipients) {
    
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);
    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }
  async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON()
    });
    const response = await this.sgApi.API(request);
    return response;
  }
}

// const recipientSchema = new Schema({
//     email: String,
//     responded: { type: Boolean, default: false }
//   });

// function Email(email, name) {
//     this.name = name;
//     this.email = email;

//     var json = {
//       email: this.email,
//       name: this.name,
//     };

//     return json;
//   }
// function Content(type, value) {
//     this.type = type;
//     this.value = value;

//     var json = {
//       type: this.type,
//       value: this.value,
//     };

//     return json;
//   }
{
  // function Mail(from_email, subject, to_email, content) {
  //     this.from_email = undefined;
  //     this.personalizations = undefined;
  //     this.subject = undefined;
  //     this.contents = undefined;
  //     this.attachments = undefined;
  //     this.template_id = undefined;
  //     this.sections = undefined;
  //     this.headers = undefined;
  //     this.categories = undefined;
  //     this.send_at = undefined;
  //     this.batch_id = undefined;
  //     this.asm = undefined;
  //     this.ip_pool_name = undefined;
  //     this.mail_settings = undefined;
  //     this.reply_to = undefined;
  //     this.setFrom = function(email) {
  //       this.from_email = email;
  //     };
  //     this.getFrom = function() {
  //       return this.from_email;
  //     };
  //     this.addPersonalization = function(personalization) {
  //       if (this.personalizations === undefined) {
  //         this.personalizations = [];
  //       }
  //       this.personalizations.push(personalization);
  //     };
  //     // This array must be JSON compatible with the raw sendgrid request
  //     this.getPersonalizations = function() {
  //       return this.personalizations.map(function(personalization) {
  //          return personalization.toJSON();
  //       });
  //     };
  //     this.setSubject = function(subject) {
  //       this.subject = subject;
  //     };
  //     this.getSubject = function() {
  //       return this.subject;
  //     };
  //     this.addContent = function(content) {
  //       if (this.contents === undefined) {
  //         this.contents = [];
  //       }
  //       this.contents.push(content);
  //     };
  //     this.getContents = function() {
  //       return this.contents;
  //     };
  //     this.addAttachment = function(attachment) {
  //       if (this.attachments === undefined) {
  //         this.attachments = [];
  //       }
  //       this.attachments.push(attachment);
  //     };
  //     this.getAttachments = function() {
  //       return this.attachments;
  //     };
  //     this.setTemplateId = function(template_id) {
  //       this.template_id = template_id;
  //     };
  //     this.getTemplateId = function() {
  //       return this.template_id;
  //     };
  //     this.addSection = function(section) {
  //       if (this.sections === undefined) {
  //         this.sections = {};
  //       }
  //       this.sections[Object.keys(section)[0]] = section[Object.keys(section)[0]];
  //     };
  //     this.getSections = function() {
  //       return this.sections;
  //     };
  //     this.addHeader = function(header) {
  //       if (this.headers === undefined) {
  //         this.headers = {};
  //       }
  //       this.headers[Object.keys(header)[0]] = header[Object.keys(header)[0]];
  //     };
  //     this.getHeaders = function() {
  //       return this.headers;
  //     };
  //     this.addCategory = function(category) {
  //       if (this.categories === undefined) {
  //         this.categories = [];
  //       }
  //       this.categories.push(category.category);
  //     };
  //     this.getCategories = function() {
  //       return this.categories;
  //     };
  //     this.addCustomArg = function(custom_arg) {
  //       if (this.custom_args === undefined) {
  //         this.custom_args = {};
  //       }
  //       this.custom_args[Object.keys(custom_arg)[0]] =
  //         custom_arg[Object.keys(custom_arg)[0]];
  //     };
  //     this.getCustomArgs = function() {
  //       return this.custom_args;
  //     };
  //     this.setSendAt = function(send_at) {
  //       this.send_at = send_at;
  //     };
  //     this.getSendAt = function() {
  //       return this.send_at;
  //     };
  //     this.setBatchId = function(batch_id) {
  //       this.batch_id = batch_id;
  //     };
  //     this.getBatchId = function() {
  //       return this.batch_id;
  //     };
  //     this.setAsm = function(asm) {
  //       this.asm = asm;
  //     };
  //     this.getAsm = function() {
  //       return this.asm;
  //     };
  //     this.setIpPoolName = function(ip_pool_name) {
  //       this.ip_pool_name = ip_pool_name;
  //     };
  //     this.getIpPoolName = function() {
  //       return this.ip_pool_name;
  //     };
  //     this.addMailSettings = function(mail_settings) {
  //       this.mail_settings = mail_settings;
  //     };
  //     this.getMailSettings = function() {
  //       return this.mail_settings;
  //     };
  //     this.addTrackingSettings = function(tracking_settings) {
  //       this.tracking_settings = tracking_settings;
  //     };
  //     this.getTrackingSettings = function() {
  //       return this.tracking_settings;
  //     };
  //     this.setReplyTo = function(reply_to) {
  //       this.reply_to = reply_to;
  //     };
  //     this.getReplyTo = function() {
  //       return this.reply_to;
  //     };
  //     if (from_email && subject && to_email && content) {
  //       this.setFrom(from_email);
  //       var personalization = new Personalization();
  //       personalization.addTo(to_email);
  //       this.addPersonalization(personalization);
  //       this.setSubject(subject);
  //       this.addContent(content);
  //     }
  //     this.toJSON = function() {
  //       var json = {
  //         from: this.getFrom(),
  //         personalizations: this.getPersonalizations(),
  //         subject: this.getSubject(),
  //         content: this.getContents(),
  //         attachments: this.getAttachments(),
  //         template_id: this.getTemplateId(),
  //         sections: this.getSections(),
  //         headers: this.getHeaders(),
  //         categories: this.getCategories(),
  //         custom_args: this.getCustomArgs(),
  //         send_at: this.getSendAt(),
  //         batch_id: this.getBatchId(),
  //         asm: this.getAsm(),
  //         ip_pool_name: this.getIpPoolName(),
  //         mail_settings: this.getMailSettings(),
  //         tracking_settings: this.getTrackingSettings(),
  //         reply_to: this.getReplyTo(),
  //       };
  //       return json;
  //     };
  //     return this;
  //   }
}
module.exports = Mailer;
