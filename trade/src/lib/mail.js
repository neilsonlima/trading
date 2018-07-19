const api_key = '?'
const domain = '?'
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})

module.exports = function(){
  'use strict';
  const send = function (email,assunto, texto){
    let data = {
      from: 'Signal Hunter <signalhunter@gmail.com>',
      to: email,
      subject: assunto,
      text: texto
    }
    mailgun.messages().send(data, function (error, body) {
      if (error) {
          console.log(error)
      }
      console.log(body)
    });
  }
  return {
    send: function(email,assunto, texto){return send(email,assunto, texto);}
  }
 }();
