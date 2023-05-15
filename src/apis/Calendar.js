import { google } from 'googleapis';
import fs from 'fs';
import {dirname,  join} from 'path';
import {fileURLToPath} from 'url';

const OAuth2Client = google.auth.OAuth2;
const __dirname = dirname(fileURLToPath(import.meta.url))


function getAutenticateUrl(keys){
    const clientKeys = keys.web;
    const clientId = clientKeys.client_id;
    const clientSecret = clientKeys.client_secret;
    const redirectUrl = 'http://localhost:8080/authGmail';

    // Crea un cliente OAuth2
    const oAuth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);

    // Genera un enlace de autorización
    const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar'],
    prompt: 'consent'
    });

    return authUrl
}

function getCalendarConnector(keys){
    return new Promise((resolve, reject)=>{
      fs.readFile(join(__dirname,'credentials.json'), 'utf8', (err, data) => {
        if(err){
          resolve({type:"authURL",url:getAutenticateUrl(keys)})
        }else{
          getConnectorFromCredentials(keys).then(res=>{
            resolve({type:"connector",connector:res});
          });
        }
        
      })
        
    });
}

function getConnectorFromCredentials(keys){
  return new Promise((resolve, reject)=>{
    const clientKeys = keys.web;
    const clientId = clientKeys.client_id;
    const clientSecret = clientKeys.client_secret;
    const redirectUrl = 'http://localhost:8080/authGmail';
    
    const oAuth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);

    fs.readFile(join(__dirname, 'credentials.json'), 'utf8', (err, data) => {
      if (err) resolve("read credentials fail");
    
      let credentials = JSON.parse(data);

      oAuth2Client.setCredentials({
        access_token: credentials.token.access_token,
        refresh_token: credentials.token.refresh_token

      });
    
      checkToken(oAuth2Client).then(res =>{
        if(!res){
          oAuth2Client.refreshAccessToken(res=>{
            oAuth2Client.getAccessToken((err,token)=>{
              
                const Newcredentials  = JSON.parse(fs.readFileSync( join(__dirname,'credentials.json')));
                
                Newcredentials.token.access_token = token;

                const dataJson = JSON.stringify(Newcredentials);
                /*
                fs.writeFile( join(__dirname,'credentials.json'), dataJson, (err) => {
                    if (err) throw err;
                    console.log('Credentials updated');
                });*/

                const calendar = google.calendar({version: 'v3', auth:oAuth2Client});
                resolve(calendar);
              })
          })
        }else{
          const gmail = google.gmail({version: 'v1', auth:oAuth2Client});
          resolve(gmail);
        }
      })
      
    });
  })
   
}

async function checkToken(client){
  try{
    const x = await client.getTokenInfo(credentials.token.access_token);
    return true;
  }catch(e){
      return false;
  }
}

/**
 * Edit Event
 * @param {CalendarConnector} calendarConnector API connector
 * @param {Object} newEvent new evet object with the event details
 * @param {String} dateFrom starting point for searching events | new Date().toISOString() | format
 * @param {Number} results Numbes de results to searchs
 * @param {String} calendarId ID of calendar, default primary
 */
function listEvents(calendarConnector, dateFrom, results, calendarId = 'primary') {
    return new Promise((resolve, reject) => {
      calendarConnector.events.list({
        calendarId: calendarId,
        timeMin: dateFrom,
        maxResults: results,
        singleEvents: true,
        orderBy: 'startTime',
      }).then(res =>{
        const events = res.data.items;
        if (!events || events.length === 0) {
          resolve('No upcoming events found.');
        }
        resolve(events)
      })
    })
}

/**
 * Create Event
 * @param {CalendarConnector} calendarConnector API connector
 * @param {Object} eventObject Event object with the event details
 * @param {String} calendarID ID of calendar, default primary
 */
function createEvent(calendarConnector,eventObject, calendarID = 'primary'){
  return new Promise((resolve, reject) =>{
    calendarConnector.events.insert({
      calendarId: calendarID,
      resource: eventObject,
    }, function(err, event) {
      if (err) {
        reject(err);
      }
      resolve(event)
    });
  })
}

/**
 * Edit Event
 * @param {CalendarConnector} calendarConnector API connector
 * @param {Object} newEvent new event object with the event details
 * @param {String} oldEventID ID of old event
 * @param {String} calendarID ID of calendar, default primary
 */
function editEvent(calendarConnector, newEvent, oldEventID, calendarID = 'primary'){
  return new Promise((resolve, reject)=>{
    calendarConnector.events.update({
      calendarId: calendarID, 
      eventId: oldEventID, 
      resource: newEvent
    }).then(res =>{
      resolve(res)
    });
  })
}

/**
 * Delete Event
 * @param {CalendarConnector} calendarConnector API connector
 * @param {String} eventId ID of event
 * @param {String} calendarID ID of calendar, default primary
 */
function deleteEvent(calendarConnector, eventId, calendarID = 'primary'){
  return new Promise((resolve, reject)=>{
    calendarConnector.events.delete({
      calendarId: calendarID, 
      eventId: eventId
    }).then(res =>{
      resolve(res);
    });
  })
}

/**
 * Get event details
 * @param {CalendarConnector} calendarConnector API connector
 * @param {String} eventID ID of event
 * @param {String} calendarID ID of calendar, default primary
 */
function getEvent(calendarConnector, eventID, calendarID = 'primary'){
  return new Promise((resolve, reject)=>{
    calendarConnector.events.get({
      calendarId: calendarID, 
      eventId: eventID
    }).then(res =>{
      resolve(res);
    });
  })
}


  
export default{
  createEvent,
    deleteEvent,
    editEvent,
    getCalendarConnector,
    listEvents,
}