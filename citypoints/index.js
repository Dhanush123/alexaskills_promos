"use strict";

var Alexa = require("alexa-sdk");

var APP_ID = "amzn1.ask.skill.5d10aab1-51d2-4287-90c6-f015b58ec63c"; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = "City Points";

//use same project as Alexa Maps Dist & Elev in Google APIs console
var gmAPI = require("@google/maps").createClient({
  key: process.env.GOOGLEKEY
});


exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    "LaunchRequest": function () {
        console.log("went in LaunchRequest function");
        // If the user either does not reply to the welcome message or says something that is not
        // understood, they will be prompted again with this text.
        this.attributes["speechOutput"] = "Welcome to " + SKILL_NAME + ". You can ask a question like, what are the coordinates for San Francisco? Please tell me a city you would like to find the coordinates for.";
        this.attributes["repromptSpeech"] = "To find the coordinates of a city, say something like: what are the coordinates for San Diego?";
        this.emit(":ask", this.attributes["speechOutput"], this.attributes["repromptSpeech"])
    },
    "coordsCalc": function () {
        console.log("went in coordsCalc function");
        const thingy = this;
        if(thingy.event.request.intent.slots.city.value != undefined){
            var coordsSlot = thingy.event.request.intent.slots.city.value;
            if(coordsSlot === undefined){
              console.log("city slot is undefined!!!");
                thingy.emit("Unhandled");
            }
            else {
              console.log("coordsSlot value: " + coordsSlot);
              var params = {
                "address": coordsSlot,
                "components": "components=country:US",
                "language":   "en",
                "region":     "us"
              };
            //---------
            gmAPI.geocode(params, function(err, res) {
              console.log("err: "+err);
              console.log("res: " + JSON.stringify(res.json));
              var result = res.json.results;
              if(res.json.status != "OK"){
                console.log("google maps location is undefined!!!");
                thingy.emit("Unhandled");
              }
              else {
                console.log("result[0]: "+result[0]);
                console.log("result[0].geometry.location: "+result[0].geometry.location);
                console.log("result[0].geometry.location.lat: "+result[0].geometry.location.lat);
                console.log("result[0].geometry.location.lng: "+result[0].geometry.location.lng);
                var lat = result[0].geometry.location.lat;
                var lng = result[0].geometry.location.lng;
                var show = coordsSlot + " is located at <emphasis level='strong'>" + lat + "</emphasis> degrees latitude and <emphasis level='strong'>" + lng + "</emphasis> degrees longitude.";
                console.log("show: " + show);
                thingy.emit(":tell", show);
              }
              console.log("workidsgsdgsng????");
            });
          }
        }
        else if(this.event.request.intent.slots.city.value == undefined){
                console.log("city undefined logic");
                this.emit("Unhandled");
        }
        else if(this.event.request.intent.slots.city.value == "help"){
                console.log("help if logic");
                this.attributes["speechOutput"] = "You can ask a question like, what are the coordinates of Los Angeles? Please tell me a city you would like to find the coordinates of."
                this.attributes["repromptSpeech"] = "You can ask a question like, what are the coordinates of Los Angeles? Please tell me a city you would like to find the coordinates of."
                this.emit(":ask", this.attributes["speechOutput"], this.attributes["repromptSpeech"])
                // this.emit("HelpMe");
        }
        else{
          // If the user either does not reply to the welcome message or says something that is not
          // understood, they will be prompted again with this text.
          this.attributes["speechOutput"] = "Welcome to " + SKILL_NAME + ". You can ask a question like, what are the coordinates of Seattle? Please tell me a city you would like to find the coordinates of.";

          this.attributes["repromptSpeech"] = "To find the coordinates of a city, say something like: what are the coordinates of Berkeley?";
          this.emit(":ask", this.attributes["speechOutput"], this.attributes["repromptSpeech"])
        }
    },
    "AMAZON.HelpIntent": function() {
      console.log("went in Amazon.HelpIntent");
      // If the user either does not reply to the welcome message or says something that is not
      // understood, they will be prompted again with this text.
      this.attributes["speechOutput"] = "You can ask a question like, what are the coordinates for Los Angeles? Please tell me a city you would like to find the coordinates for."
      this.attributes["repromptSpeech"] = "You can ask a question like, what are the coordinates for Los Angeles? Please tell me a city you would like to find the coordinates for."
      this.emit(":ask", this.attributes["speechOutput"], this.attributes["repromptSpeech"])
    },
    "AMAZON.StopIntent": function () {
        this.emit("SessionEndedRequest");
    },
    "AMAZON.CancelIntent": function () {
        this.emit("SessionEndedRequest");
    },
    "SessionEndedRequest":function () {
        this.emit(":tell", "Goodbye!");
    },
    "Unhandled": function() {
      this.emit(":tell", "Sorry, I was unable to understand and process your request. Please try again.");
      this.emit("SessionEndedRequest");
    },
};
