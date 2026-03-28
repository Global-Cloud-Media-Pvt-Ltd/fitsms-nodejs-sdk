const FitSMS = require("./index.js");

/*

FOR V4 API, WEBHOOKS & FURTHER DOCUMENTATION, SEE:
https://app.fitsms.lk/developers/docs

DEV. BY GLOBAL CLOUD MEDIA (https://globalcloudmedia.lk)
REPOSITORY: https://github.com/Global-Cloud-Media-Pvt-Ltd/fitsms-nodejs-sdk

*/

// REPLACE THESE WITH YOUR ACTUAL CREDENTIALS FOR TESTING
const API_TOKEN = "YOUR_ACTUAL_BEARER_TOKEN_HERE";
const SENDER_ID = "YOUR_ACTUAL_SENDER_ID_HERE";
const TEST_MOBILE = "947XXXXXXX";

const sms = new FitSMS(API_TOKEN, SENDER_ID);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runTests() {
  console.log("🚀 Starting FitSMS Module Tests...\n");

  try {
    // 1. Test Balance (v4 API)
    console.log("--- Testing getBalance() ---");
    const balance = await sms.getBalance();
    console.log("✅ Balance Status:", balance.status);
    console.log("Remaining Units:", balance.data);
    console.log("----------------------------\n");

    // 2. Test Sending SMS (v4 API)
    console.log("--- Testing send() ---");
    const sendRes = await sms.send(TEST_MOBILE, "Test message from local SDK");
    console.log("✅ Send Status:", sendRes.status);

    if (sendRes.data && sendRes.data.ruid) {
      const ruid = sendRes.data.ruid;
      console.log("Message RUID:", ruid);
      console.log("----------------------------\n");

      // 3. Test Status Check (v4 API)
      await delay(10000);

      console.log("--- Testing getStatus() ---");
      const statusRes = await sms.getStatus(ruid, TEST_MOBILE);
      console.log("✅ Status Check:", statusRes.status);
      console.log("Delivery Status:", statusRes.data.status);
      console.log("----------------------------\n");
    }

    console.log("🎉 All tests passed successfully!");
  } catch (error) {
    console.error("❌ Test Failed!");
    console.error("Error Message:", error.message);
  }
}

runTests();
