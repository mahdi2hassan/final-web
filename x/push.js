// أضف في functions/index.js:  Object.assign(exports, require('./push'));
const functions = require('firebase-functions/v1');
const admin = require('firebase-admin');
if (!admin.apps.length) admin.initializeApp();

// أي إشعار جديد داخل التطبيق (notifications/{uid}/items) بيتبعت كمان push على موبايل الطالب
exports.pushOnNotification = functions.firestore
  .document('notifications/{uid}/items/{id}')
  .onCreate(async (snap, ctx) => {
    const n = snap.data() || {};
    const u = await admin.firestore().doc('users/' + ctx.params.uid).get();
    const tokens = (u.data() || {}).fcmTokens || [];
    if (!tokens.length) return null;
    const r = await admin.messaging().sendEachForMulticast({
      tokens,
      notification: { title: n.title || 'بلس', body: n.body || '' },
      webpush: { fcmOptions: { link: 'https://plusinmath.vercel.app/courses.html' } }
    });
    const bad = [];
    r.responses.forEach((x, i) => {
      const code = (x.error && x.error.code) || '';
      if (!x.success && /registration-token-not-registered|invalid-registration-token/.test(code)) bad.push(tokens[i]);
    });
    if (bad.length) await u.ref.update({ fcmTokens: admin.firestore.FieldValue.arrayRemove(...bad) });
    return null;
  });
