"use strict";
import  nodemailer from "nodemailer";
import Imap from 'imap';
import { simpleParser } from 'mailparser';
import  fs from 'fs';


/**
 * Send Email
 * @param {Object} senderCredentials user and password and server details of sender
 * @param {Object} emailContent Metadata of message to send 
 * @returns 
 */
function sendEmail(senderCredentials,emailContent) {
    return new Promise((resolve, reject)=>{
        let transporter;

        transporter = nodemailer.createTransport({
            host: senderCredentials.smtp,
            port: senderCredentials.smtpPort,
            secure: false, // true for 465, false for other ports
            auth: {
            user: senderCredentials.user,
            pass: senderCredentials.pass 
            },
            tls: {
                rejectUnauthorized: false
            }            
        });

        // send mail with defined transport object
        transporter.sendMail({
            from: `${emailContent.formLegend} <${senderCredentials.user}>`,
            to: emailContent.receivers, 
            cc: emailContent.cc,
            subject: emailContent.subject, 
            text: emailContent.contentPlain, 
            html: emailContent.contentHtml,
            attachments: emailContent.attachments 
        }).then(res =>{
            resolve(res);
        })

        
    })
}

/**
 * Get Emails
 * @param {Object} senderCredentials Credentials for server 
 * @param {String} folder folder to Open
 * @returns {Promise} Emails in box
 */
function getEmails(senderCredentials, folder){
    return new Promise((resolve, reject) =>{
        try {
            let messageData = [];

            const imapConfig = {
                user: senderCredentials.user,
                password: senderCredentials.pass,
                host: senderCredentials.imap,
                port: senderCredentials.imapPort,
                tls: senderCredentials.tls,
            };

            const imap = new Imap(imapConfig);
            imap.once('ready', () => {
                imap.openBox(folder, false, () => {
                    imap.search(['ALL'], (err, results) => {
                        const f = imap.fetch(results, { bodies: '' });
                        f.on('message', msg => {
                            msg.on('body', stream => {
                                // console.log(stream)
                                simpleParser(stream, async (err, parsed) => {
                                    
                                    const {from, subject, textAsHtml, text, headers, attachments, messageId, date} = parsed;
                                    messageData.push(
                                        {
                                            "messageID": messageId,
                                            "from": from,
                                            "subject" : subject,
                                            "messageHTML" : textAsHtml,
                                            "messageText" : text,
                                            "headers" : headers,
                                            "attachments" : attachments,
                                            "date" : date
                                        }
                                    )
                                    
                                });
                            });
                            // msg.once('attributes', attrs => {
                            //     const { uid } = attrs;
                            //     imap.addFlags(uid, ['\\Seen'], () => {
                            //         // Mark the email as read after reading it
                            //         console.log('Marked as read!');
                            //     });
                            // });
                        });
                        f.once('error', ex => {
                            reject(Promise.reject(ex));
                        });
                        f.once('end', () => {
                            console.log('Done fetching all messages!');
                            imap.end();
                        });
                    });
                });
            });
    
            imap.once('error', err => {
                reject(err);
            });
    
            imap.once('end', () => {
                console.log('Connection ended');
                resolve(messageData);
            });
    
            imap.connect();
        } catch (ex) {
            reject('an error occurred');
        }
    }) 

}

/**
 * List Boxes
 * @param {Object} senderCredentials Credentials for server
 * @returns {Object} Folders and folders details
 */
function listBoxes(senderCredentials){
    return new Promise (function (resolve, reject) {
        try{
            const imapConfig = {
                user: senderCredentials.user,
                password: senderCredentials.pass,
                host: senderCredentials.imap,
                port: senderCredentials.imapPort,
                tls: senderCredentials.tls,
            };
    
            const imap = new Imap(imapConfig);
            
            imap.once('ready', () => {
                console.log("Listo")
                imap.getBoxes((error , boxes) =>{
                    if(error){
                        reject(error)
                    }else{
                        imap.end();
                        resolve(boxes)
                    }
                })
            })
    
            imap.once('error', err => {
                reject(err);
            });
    
            imap.once('end', () => {
                console.log('Connection ended');
            });
    
            imap.connect();
    
        }catch(e){
            console.log(e)
        }
    })
}

/**
 * Extract Attchments
 * @param {ArrayBuffer} attachments Array with buffer of files
 * @param {String} dir path to folder for save the files 
 * @return {String} Response with error or "File was saved" on success
 */
function extractAttchments(attachments, dir){
    if(attachments.length > 0){
        attachments.forEach(file =>{
            // console.log(file.content)
            const c = file.content;
            fs.writeFile(`${dir}/${file.filename}`, c,  "binary",function(err) {
                if(err) {
                    return err;
                } else {
                    return "File was saved";
                }
            });
        })                                  
                                        
    }
}

export {
    sendEmail,
    getEmails,
    listBoxes,
    extractAttchments
}