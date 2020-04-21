var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BPiFnhCk4QRTd0Z1mVI7_oro3Roh0KqHqd-2oOPhoWctfDbxUfeT_WTaFqWaXFB2HWmj6VLDSpfgOgVe1cgWA3A",
    "privateKey": "VH7mo4EmxtIwo53diHu0uD5KkwGSf7tLtH8IajU-nNg"
};
 
 
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fRnH1qkJ-ag:APA91bGE8wd_EKkllacUZtwv0HdipRI3garcyfZhqCBqTuZvpyMJTn9BFxljbXN2A3boHZz1rXlq8-tCqwORaYuK5fPawe-Ep-Jco__xjR7elc56bL40Bq7lb01GUNvVWxN9CxxexJTm",
    "keys": {
        "p256dh": "BI6kYmyRTnb29uxpcXGmmbzUoFsBc6VHJdLM57ceDMn5/mD8UszZmk9hrhucKynTFObhxNhF07cncH+aw5hHbpk=",
        "auth": "cxcSznKg4VmQGJFFBpzF4w=="
    }
};
var payload = 'Notif Mantap!';
var options = {
    gcmAPIKey: '491725764573',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);