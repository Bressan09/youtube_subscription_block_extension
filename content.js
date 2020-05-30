function isEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function validateAccess() {
  // console.log("request get");
  // console.log(new Date());
  chrome.storage.sync.get(["counter", "last_day"], function (result) {
    // console.log("start get");
    // console.log(new Date());
    // console.log(result);

    let current_day = new Date().getDate();
    if (isEmpty(result) || result.last_day != current_day) {
      chrome.storage.sync.set({ counter: 1, last_day: current_day });
    } else if (result.last_day == current_day && result.counter > 3) {
      chrome.storage.sync.set(
        {
          counter: result.counter + 1,
          last_day: current_day,
        },
        () => {
          document.documentElement.innerHTML = "";
          document.documentElement.innerHTML =
            "Maximum Access of the day exceeded";
          document.documentElement.scrollTop = 0;
        }
      );
    } else {
      chrome.storage.sync.set({
        counter: result.counter + 1,
        last_day: current_day,
      });
    }
    // console.log("end get");
    // console.log(new Date());
  });
}

validateAccess();
