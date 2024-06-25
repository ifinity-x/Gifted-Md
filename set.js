const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Gifted;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEhYNkVwam5nOGNHVjRSWG5QRkhkb3pmTFRCam5aWGIyeGo4cGdpVThHbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK1NyUlZqMmZUNzJqUFpucHB6M1poOEJLeGNLeWptcjZPZCtJOW5PY0xoZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpSi9Dd0Y5V29SQVMzeERjT2U2Z3pLL3BPVDR4UDlCSHJ4eVpienpmcGxBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0SCt5Wllub04wVTBhTjBHSTM0S2tMS2drMzhML3RaZnhGRUgva2ZVbmtJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVJaDArdmVEQVRvdlRwOXl0OEVUSllyMzdjUTJ1NXovMWxRYVloRHgwWFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijl0VUdiekNabkluNDg4WWpDeHJ4S3dOVitXdGs1Nk1QK3YxckhVRjBQd0E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid014UDE5cjhON1ExQmI5ZFJ0eHZiSFNRZXdvdGlLRHZsL0NkUi9NcVcxRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUTJ6UmlnbkdpUDRYZ2I1NzBUNXg4aGZTQS92dTNRejlzQmVWb2F0K0ZXRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBKV2pPb0ErREtoUW5sNk52NWtqWWFTZlVkYVhFWGd6LzBKTmJ1Z25JRlZSZVMyMnJLbWs3MmxIamNDZVQxTnBTVGlVbVhxRDVnUnFFS2JHQmhYTENRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM2LCJhZHZTZWNyZXRLZXkiOiJYdE5tWHRlVjBvekFWbVRDaVZjcUo4Zngvc2lvdEZtUlR0MDhhQTI3NE5rPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI4Z3dtdV9uMlFGQ3RZYzI2YXFkbVhnIiwicGhvbmVJZCI6ImE0MWZmODQ2LTEwMzgtNDQwNi1iN2JjLTE2OTRiMDE0NzA5MCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDYUVNb2t3Sm9PckdDL3ZLQjN4bzcxSTBSU0k9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNmxtK1FYOGpwVThaVG9KWkQyZmhockNtWTE4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik1MNlNNOEJBIiwibWUiOnsiaWQiOiIyMzQ5MTMzMDE5MzEzOjM0QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOcXE1OXdGRUpQTjU3TUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJjTFJRdEpWUTJHRENVOFFSbVBZeUY1eFRkb2xGb0QzU1VIMURocjNuemlNPSIsImFjY291bnRTaWduYXR1cmUiOiJzUERLQ2RjT0hHa1h0NVI1bGlmRDBMQWU1R3ZlV3Z4Qm4vRlF3S0F1NTJKemtLQ2h4VFlwK2xlWEs0SFhOaWhBQ2w3aDNpVG40RHc4NC80eFYyUVdEdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiay9DN0NXQzNiSmV2WUFHS0R5U0ljdjBCV2Z2QUF1ZjRZN0w3YmxqWDl5YWRkYnR4MHp5cXIycDUrVVFDc09pbnhuNWdZZFZYZEQxSU5VUzdOYjZkQXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTMzMDE5MzEzOjM0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlhDMFVMU1ZVTmhnd2xQRUVaajJNaGVjVTNhSlJhQTkwbEI5UTRhOTU4NGoifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTkyNjQ5MjgsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQjZ3In0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Gifted Tech",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "2347039570336", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
CHATBOT: process.env.CHAT_BOT || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'ɢɪғᴛᴇᴅ-ᴍᴅ',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/a202f454c9532c3f5b7f8.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    PRESENCE : process.env.PRESENCE || 'online',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});




