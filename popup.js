// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

function update() {
  chrome.storage.sync.get(["counter", "last_day"], function (result) {
    document.getElementById("message").innerHTML =
      "Counter: " + result.counter + "<br/>Last Day" + result.last_day;
  });
}

document.getElementById("failButton").onclick = resetCounter;
update();

function resetCounter() {
  let current_day = new Date().getDate();
  chrome.storage.sync.set({ counter: 1, last_day: current_day });
  update();
}
