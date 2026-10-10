// Usage (from project folder):
//   node backend/testDb.js
//   node backend/testDb.js "mongodb+srv://USER:PASS@cluster0.xxxx.mongodb.net/abcautism?retryWrites=true&w=majority"
const path = require('path');
const dns = require('dns');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '.env') });

let uri = (process.argv[2] || process.env.MONGODB_URI || process.env.MONGO_URI || process.env.DATABASE_URL || '').trim();
uri = uri.replace(/^["']|["']$/g, '');

if (!uri) { console.error('FAIL: no URI found. Pass it as argument or set MONGODB_URI in backend/.env'); process.exit(1); }
if (!/^mongodb(\+srv)?:\/\//.test(uri)) { console.error('FAIL: URI must start with mongodb+srv:// (yours starts with: "' + uri.slice(0, 15) + '")'); process.exit(1); }

console.log('Testing:', uri.replace(/\/\/([^:@/]+):[^@]*@/, '//$1:*****@'));

async function run() {
  const opts = { serverSelectionTimeoutMS: 15000 };
  if (!/^mongodb(\+srv)?:\/\/[^/]+\/[^?\s]+/.test(uri)) opts.dbName = 'abcautism';
  try {
    await mongoose.connect(uri, opts);
  } catch (e) {
    if (/querySrv|ECONNREFUSED|ENOTFOUND|ETIMEOUT|EAI_AGAIN/i.test(e.message)) {
      console.log('DNS problem, retrying with 8.8.8.8 / 1.1.1.1 ...');
      dns.setServers(['8.8.8.8', '1.1.1.1']);
      await mongoose.disconnect().catch(() => {});
      await mongoose.connect(uri, opts);
    } else throw e;
  }
  await mongoose.connection.db.admin().ping();
  console.log('SUCCESS: connected. Database =', mongoose.connection.name, '| host =', mongoose.connection.host);
  process.exit(0);
}

run().catch((e) => {
  console.error('FAIL:', e.message);
  if (/bad auth|authentication failed/i.test(e.message)) console.error('-> Username ya password galat hai (Atlas > Database Access).');
  if (/ENOTFOUND/i.test(e.message)) console.error('-> Cluster ka naam galat hai ya cluster delete ho chuka hai.');
  if (/whitelist|IP|not allowed|ReplicaSetNoPrimary|serverSelection/i.test(e.message)) console.error('-> Atlas > Network Access mein 0.0.0.0/0 add karein.');
  process.exit(1);
});