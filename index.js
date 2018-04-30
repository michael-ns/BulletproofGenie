    /* eslint-disable  func-names */
    /* eslint quote-props: ["error", "consistent"]*/

    // alexa-cookbook sample code

    // There are three sections, Text Strings, Skill Code, and Helper Function(s).
    // You can copy and paste the entire file contents as the code for a new Lambda function,
    // or copy & paste section #3, the helper function, to the bottom of your existing Lambda code.

    // TODO add URL to this entry in the cookbook


     // 1. Text strings =====================================================================================================
     //    Modify these strings and messages to change the behavior of your Lambda function

     let speechOutput;
     let reprompt;
     const welcomeOutput = "Thanks for summoning me. How can I help?";
     const welcomeReprompt = "Try say start a quiz";
     const resultIntro = [
       "Ok then. "
     ];



     // 2. Skill Code =======================================================================================================

    'use strict';
    const Alexa = require('alexa-sdk');
    const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

    const handlers = {
        'LaunchRequest': function () {
          this.response.speak(welcomeOutput).listen(welcomeReprompt);
          this.emit(':responseReady');
        },
        'Assessment': function () {
            //delegate to Alexa to collect all the required slot values
            var filledSlots = delegateSlotCollection.call(this);

            //compose speechOutput that simply reads all the collected slot values
            var speechOutput = randomPhrase(resultIntro);

            var frequency = this.event.request.intent.slots.Frequency.value;
            //var ContactNumber = this.event.request.intent.slots.ContactNumber.value;
            speechOutput += "Your team can release to production " + frequency + ". ";

            if (frequency == 'every sprint') {
                speechOutput += "That is categorised as medium performer. You will need to release at least once a day to be considered as a high performer in the CI Eye CD area. ";
            } else if (frequency == 'every day') {
                speechOutput += "Wow, impressive! Keep up the good work and stay awesome!";
            } else {
                speechOutput += "Sorry I can't understand the frequency you stated. Please try say every sprint or every day.";
            }
            //speechOutput += "Your result has been sent to " + ContactNumber;

            //say the results
            this.response.speak(speechOutput);
            this.emit(":responseReady");

            //send email
            // const params = {
            //     Source: 'houyuxi@hotmail.com',
            //     Destination: { ToAddresses: ['michael.hou@bulletproof.net'] },
            //     Message: {
            //         Subject: { Data: 'DevOps Genie' },
            //         Body: { Text: { Data: 'test content' } }
            //     },
            // };

            // sendMessage(params, callback=>{
            //     console.log('sending message to ' + params.Destination.ToAddresses.toString() + ', status: ' );
            //     var say = 'sent the msg';

            //     this.response.speak(say).listen('try again');
            //     this.emit(':responseReady');
            // });
        },
        'QuizStarter': function () {
            var speechOutput = "Specify an area: source control, continuous integration, production deployment, development and operation collaboration, automated testing, infrastructure or security.";
            //say the results
            this.response.speak(speechOutput);
            this.emit(":responseReady");
        },
        'SourceControl': function () {
            //delegate to Alexa to collect all the required slot values
            var filledSlots = delegateSlotCollection.call(this);

            //compose speechOutput that simply reads all the collected slot values
            var speechOutput = randomPhrase(resultIntro);

            var score = 0;
            var questionA = this.event.request.intent.slots.sc_a.value;
            if (questionA == 'yes') {score += 1};
            var questionB = this.event.request.intent.slots.sc_b.value;
            if (questionB == 'yes') {score += 1};
            var questionC = this.event.request.intent.slots.sc_c.value;
            if (questionC == 'yes') {score += 1};
            var questionD = this.event.request.intent.slots.sc_d.value;
            if (questionD == 'yes') {score += 1};
            var questionE = this.event.request.intent.slots.sc_e.value;
            if (questionE == 'yes') {score += 1};

            speechOutput += "You have scored " + score + " out of 5 for source control";

            //say the results
            this.response.speak(speechOutput);
            this.response.shouldEndSession(false);
            this.emit(":responseReady");
        },
        'ContinuousIntegration': function () {
            //delegate to Alexa to collect all the required slot values
            var filledSlots = delegateSlotCollection.call(this);

            //compose speechOutput that simply reads all the collected slot values
            var speechOutput = randomPhrase(resultIntro);

            var score = 0;
            var questionA = this.event.request.intent.slots.ci_a.value;
            if (questionA == 'yes') {score += 1};
            var questionB = this.event.request.intent.slots.ci_b.value;
            if (questionB == 'yes') {score += 1};
            var questionC = this.event.request.intent.slots.ci_c.value;
            if (questionC == 'yes') {score += 1};
            var questionD = this.event.request.intent.slots.ci_d.value;
            if (questionD == 'yes') {score += 1};
            var questionE = this.event.request.intent.slots.ci_e.value;
            if (questionE == 'yes') {score += 1};

            speechOutput += "You have scored " + score + " out of 5 for continuous integration";

            //say the results
            this.response.speak(speechOutput);
            this.emit(":responseReady");
        },
        'AMAZON.HelpIntent': function () {
            speechOutput = "";
            reprompt = "";
            this.response.speak(speechOutput).listen(reprompt);
            this.emit(':responseReady');
        },
        'AMAZON.CancelIntent': function () {
            speechOutput = "";
            this.response.speak(speechOutput);
            this.emit(':responseReady');
        },
        'AMAZON.StopIntent': function () {
            speechOutput = "";
            this.response.speak(speechOutput);
            this.emit(':responseReady');
        },
        'SessionEndedRequest': function () {
            var speechOutput = "";
            this.response.speak(speechOutput);
            this.emit(':responseReady');
        },
    };

    exports.handler = (event, context) => {
        var alexa = Alexa.handler(event, context);
        alexa.appId = APP_ID;
        // To enable string internationalization (i18n) features, set a resources object.
        //alexa.resources = languageStrings;
        alexa.registerHandlers(handlers);
        alexa.execute();
    };

    //    END of Intent Handlers {} ========================================================================================
    // 3. Helper Function  =================================================================================================

    function delegateSlotCollection(){
      console.log("in delegateSlotCollection");
      console.log("current dialogState: "+this.event.request.dialogState);
        if (this.event.request.dialogState === "STARTED") {
          console.log("in Beginning");
          var updatedIntent=this.event.request.intent;
          //optionally pre-fill slots: update the intent object with slot values for which
          //you have defaults, then return Dialog.Delegate with this updated intent
          // in the updatedIntent property
          this.emit(":delegate", updatedIntent);
        } else if (this.event.request.dialogState !== "COMPLETED") {
          console.log("in not completed");
          // return a Dialog.Delegate directive with no updatedIntent property.
          this.emit(":delegate");
        } else {
          console.log("in completed");
          console.log("returning: "+ JSON.stringify(this.event.request.intent));
          // Dialog is now complete and all required slots should be filled,
          // so call your normal intent handler.
          return this.event.request.intent;
        }
    }

    function randomPhrase(array) {
        // the argument is an array [] of words or phrases
        var i = 0;
        i = Math.floor(Math.random() * array.length);
        return(array[i]);
    }
    function isSlotValid(request, slotName){
            var slot = request.intent.slots[slotName];
            //console.log("request = "+JSON.stringify(request)); //uncomment if you want to see the request
            var slotValue;

            //if we have a slot, get the text and store it into speechOutput
            if (slot && slot.value) {
                //we have a value in the slot
                slotValue = slot.value.toLowerCase();
                return slotValue;
            } else {
                //we didn't get a value in the slot.
                return false;
            }
    }

    // 3. SES handling =======================================================================================================

    function sendMessage(params, callback) {
        var AWS = require('aws-sdk');
        AWS.config.update({region: 'us-east-1'});
        var SES = new AWS.SES();
        console.log('sending message');
        SES.sendEmail(params, function(err, data){
            if (err) console.log(err, err.stack);
            callback('message sent');
        });
    }