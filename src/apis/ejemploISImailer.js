import ISImailer from "./ISImailer.js";
import  fs from 'fs';


const senderCredentials = {
    user: "Comptabilite@beltifich.com",
    pass: "CivodLu123!@#",// En el campo pass puede ir la clave del correo o la clave de aplicación si este tiene autenticación en dos pasos.
    smtp: "smtp.beltifich.com", //"smtp.gmail.com"
    // smtp: "smtp.gmail.com",
    smtpPort: 587,
    // imap: 'mail.google.com',
    imap: 'beltifich.com',
    imapPort: 993,
    tls: true,
}

const emailContent = {
    formLegend : "Mensaje De prueba 🧑🏿‍💻", 
    receivers : "pjgm181818@gmail.com", 
    subject: "Prueba librería", 
    contentPlain: "Cuerpo del Email en texto plano", 
    contentHtml: "<p>Cuerpo del Email en texto plano</p>",
    attachments: [
        {path: "./Cuenta de cobros ghf 010.pdf"},
        {path: "./6.png"}
    ]
}

// Send Email with attachments or no
const sendEmail = await ISImailer.sendEmail(senderCredentials, emailContent);


//List folders of server
// ISImailer.listBoxes(senderCredentials).then(folders =>{
//     console.log(folders);
// })


//lIST EMAIL DATA
// const emails = await ISImailer.getEmails(senderCredentials, 'INBOX');
// console.log(emails[0]);


//lIST ALL EMAILS IN FOLDER AND DOWNLOAD ATTACHMENTS
/*ISImailer.getEmails(senderCredentials, 'INBOX').then(res =>{
    res.forEach(message =>{
        if(message.attachments.length > 0){
            ISImailer.extractAttchments(message.attachments, "attachments")
        }
    });
});*/  