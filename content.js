//BLOCK WORDS
findString = function findText(text) {
  if (window.find(text)) {
    document.documentElement.innerHTML = "";
    document.documentElement.innerHTML = "This site is blocked";
    document.documentElement.scrollTop = 0;
  }
};

//BLOCK THE PARTIAL DOMAINS
findURL = function changeURL(text) {
  var current = window.location.href;
  if (current === text) {
    window.location.replace("https://www.google.co.in");
  }
};

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
}

//BLOCK THE ENTIRE DOMAIN WITH THE FOLLOWING FUNCTION
findAllURL = function changeAllURL(text) {
  var current = window.location.href;
  if (current.startsWith(text)) {
    chrome.storage.sync.get(["counter", "last_day"], function (result) {
      let current_day = new Date().getDate();
      console.log("Value currently is " + result.key);
      console.log(result);
      if (isEmpty(result) || result.last_day != current_day) {
        chrome.storage.sync.set(
          { counter: 1, last_day: current_day },
          () => null
        );
      } else if (result.last_day == current_day && result.counter >= 3) {
        chrome.storage.sync.set(
          {
            counter: result.counter + 1,
            last_day: current_day,
          },
          () => null
        );
        document.documentElement.innerHTML = "";
        document.documentElement.innerHTML =
          "Maximum Access of the day exceeded";
        document.documentElement.scrollTop = 0;
      } else {
        chrome.storage.sync.set(
          {
            counter: result.counter + 1,
            last_day: current_day,
          },
          () => null
        );
      }
    });
  }
};

findAllURL("https://www.youtube.com/feed/subscriptions");
