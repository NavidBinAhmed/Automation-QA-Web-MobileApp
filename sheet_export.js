const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
var feature = "";

var app = process.argv[3];
var app_uppercase = app.toUpperCase();
var platform = process.argv[4];
var platform_uppercase = platform.toUpperCase();

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = './auths/token.json';

// Load client secrets from a local file.
fs.readFile('./auths/credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), getValues);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), () => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function getValues(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  
  if (platform_uppercase === "IOS") {
    if (app_uppercase === "KIOSK") { 
      if(process.argv[2] === "User Session")
        feature = "A3:I7";
      else if(process.argv[2] === "Bus Management")
        feature = "A9:I12";
      else if(process.argv[2] === "Visitor Management")
        feature = "A14:I17";
      else if(process.argv[2] === "Child CICO Via Parent")
        feature = "A19:I22";
      else if(process.argv[2] === "Child CICO Via Guardian")
        feature = "A24:I27";
      else if(process.argv[2] === "Staff CICO")
        feature = "A29:I32";
      else if(process.argv[2] === "Custom")
        feature = "A34:I37";
    }
    else if (app_uppercase === "STAFF") {
      if(process.argv[2] === "User Session")
        feature = "A3:I6";
    }
    else if (app_uppercase === "MULTIAPP") {
      if(process.argv[2] === "User Session")
        feature = "A3:I6";
    }
  }
  else if (platform_uppercase === "ANDROID") {
    if (app_uppercase === "PARENT") {
      if(process.argv[2] === "User Session")
        feature = "A3:I6";
      else if(process.argv[2] === "User Navigation")
        feature = "A8:I21";
      else if(process.argv[2] === "Class Operations")
        feature = "A23:I31";
      else if(process.argv[2] === "Statement of Account")
        feature = "A33:I41";
      else if(process.argv[2] === "Child Health")
        feature = "A43:I44";
      else if(process.argv[2] === "Class Attendance")
        feature = "A46:I48";
      else if(process.argv[2] === "Parent and Guardians - Add Guardian")
        feature = "A50:I51";
      else if(process.argv[2] === "Parent and Guardians - Add Existing Guardian")
        feature = "A53:I53";
      else if(process.argv[2] === "Parent and Guardians - Delete Guardian")
        feature = "A55:I56";
      else if(process.argv[2] === "Parents and Guardians")
        feature = "A58:I62";
      else if(process.argv[2] === "Child Profile")
        feature = "A67:I68";
      else if(process.argv[2] === "My Profile")
        feature = "A70:I75";
      else if(process.argv[2] === "Home Page")
        feature = "A77:I79";
      else if(process.argv[2] === "Notifications")
        feature = "A81:I82";
      else if(process.argv[2] === "Child Attendance - Check In")
        feature = "A84:I85";
      else if(process.argv[2] === "Child Attendance - Check Out")
        feature = "A89:I92";
      else if(process.argv[2] === "Announcements")
        feature = "A94:I94";
      else if(process.argv[2] === "Calendar")
        feature = "A96:I96";
      else if(process.argv[2] === "GIRO Payments")
        feature = "A98:I98";
      else if(process.argv[2] === "Events")
        feature = "A100:I100";
      else if(process.argv[2] === "Resources")
        feature = "A102:I102";
      else if(process.argv[2] === "Transfers and Withdrawals")
        feature = "A104:I104";
    }
    else if (app_uppercase === "STAFF") {
      if(process.argv[2] === "User Session")
        feature = "A3:I5";
      else if (process.argv[2] === "Homepage")
        feature = "A7:I11";
      else if (process.argv[2] === "Staff Attendance")
        feature = "A13:I16";
      else if (process.argv[2] === "Child CICO")
        feature = "A18:I28";
      else if (process.argv[2] === "Class Attendance")
        feature = "A30:I42";
      else if (process.argv[2] === "Class Activity")
        feature = "A44:I52";
      else if (process.argv[2] === "Announcements")
        feature = "A54:I61";
      else if (process.argv[2] === "Notifications")
        feature = "A63:I64";
      else if (process.argv[2] === "Custom")
        feature = "A53:I56";
    } 
    else if (app_uppercase === "GUARDIAN") {
      if(process.argv[2] === "User Session")
        feature = "A3:I9";
      else if(process.argv[2] === "CI")
        feature = "A11:I23";
      else if(process.argv[2] === "CO")
        feature = "A25:I40";
    } else if (app_uppercase === "CROSSAPP"){
      if(process.argv[2] === "Create Guardian for Guardian App")
      feature = "A3:I6";
    }
    else if (app_uppercase === "MULTIAPP") {
      if(process.argv[2] === "User Session")
        feature = "A3:I6";
    }
  } 
  else if (platform_uppercase === "WEB") {
    if (app_uppercase === "PARENT") {
      if(process.argv[2] === "User Session")
        feature = "A3:K9";
      else if(process.argv[2] === "My Downloads - Portfolio")
        feature = "A11:K21";
      else if(process.argv[2] === "My Downloads - Albums")
        feature = "A23:K35";
    }
    else if (app_uppercase === "STAFF") {
      if(process.argv[2] === "Login")
        feature = "A3:K3";
      else if(process.argv[2] === "Centre Management")
        feature = "A5:K21";
      else if(process.argv[2] === "Child Management")
        feature = "A23:K57";
      else if(process.argv[2] === "Settings")
        feature = "A62:K64";
      else if(process.argv[2] === "Announcements - Attach and Embed")
        feature = "A63:K70";
      else if(process.argv[2] === "Announcements - Create Announcement")
        feature = "A72:K75";
      else if(process.argv[2] === "Announcements - Delete")
        feature = "A77:K82";
      else if(process.argv[2] === "Announcements - Draft Announcement")
        feature = "A84:K90";
      else if(process.argv[2] === "Announcements - Draft Counters")
        feature = "A92:K99";
      else if(process.argv[2] === "Announcements - Page  Verification")
        feature = "A101:K121";
      else if(process.argv[2] === "Announcements - Recall Announcement")
        feature = "A123:K124";
      else if(process.argv[2] === "Announcements - Send Announcement")
        feature = "A126:K141";
      else if(process.argv[2] === "Announcements - Tabs")
        feature = "A143:K146";
  }
}

  sheets.spreadsheets.values.get({
    spreadsheetId: '1d1Ncf-2lPC09FHbrc5-ZvSkflhdo6rqN_6-U5IJL2sQ',
    range: `${app_uppercase} ${platform_uppercase} Capability!${feature}`,
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      let capability = JSON.stringify(rows, null, 2);
      fs.writeFileSync('./exports/capability.json', capability);
    } else {
      console.log('No data found.');
    }
  });

  sheets.spreadsheets.values.get({
    spreadsheetId: '1d1Ncf-2lPC09FHbrc5-ZvSkflhdo6rqN_6-U5IJL2sQ',
    range: `${app_uppercase} ${platform_uppercase} Attribute!B2:C100`,
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      let attribute = JSON.stringify(rows, null, 2);
      fs.writeFileSync('./exports/attribute.json', attribute);
    } else {
      console.log('No data found.');
    }
  });

  sheets.spreadsheets.values.get({
    spreadsheetId: '1d1Ncf-2lPC09FHbrc5-ZvSkflhdo6rqN_6-U5IJL2sQ',
    range: `${app_uppercase} ${platform_uppercase} Datum!B2:C100`,
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      let datum = JSON.stringify(rows, null, 2);
      fs.writeFileSync('./exports/datum.json', datum);
    } else {
      console.log('No data found.');
    }
  });
}