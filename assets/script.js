$(document).ready(function () {

  $("currentDay").text(getDate());
  const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  let body = document.body;
  const now = new Date();
  const currentHour = now.getHours();

  function getDate() {
    return dayjs().format("dddd, MMMM D");
  }

  function getHourStatus(hour) {
    if (currentHour === hour) {
      return "current";
    } else if (currentHour < hour) {
      return "past";
    } else {
      return "future";
    }
  }

  function getHourDisplay(hour) {
    if (hour > 12) 
        return hour - 12 + " pm";
    if (hour === 12) 
        return "12 pm";
    return hour + " am";
  }

  function saveInput(hour) {
    const task = document.querySelector(`#textarea-${hour}`).value;
    localStorage.setItem(hour, task);
  }

  function getRow(hour) {
    let rowDiv = document.createElement("div");
    rowDiv.setAttribute("class", "row time-block");
    rowDiv.setAttribute("id", `hour-${hour}`);

    let labelDiv = document.createElement("div");
    labelDiv.setAttribute("class", "col-md-1 hour");
    labelDiv.setAttribute("id", `hour-${hour}-label`);
    labelDiv.textContent = `${getHourDisplay(hour)}`;

    let textAreaEl = document.createElement("textarea");
    textAreaEl.setAttribute("class", `col-md-10 description ${getHourStatus(hour)}`);
    textAreaEl.setAttribute("id", `textarea-${hour}`);
    if (localStorage.getItem(hour)) {
      textAreaEl.textContent = localStorage.getItem(hour);
    }

    let saveBtnEl = document.createElement("button");
    saveBtnEl.setAttribute("class", "btn saveBtn col-md-1");
    saveBtnEl.setAttribute("id", `btn-hour-${hour}`);
    saveBtnEl.addEventListener("click", function () {
      saveInput(hour);
    });

    let iconEl = document.createElement("i");
    iconEl.setAttribute("class", "fas fa-save");

    body.appendChild(rowDiv);
    rowDiv.appendChild(labelDiv);
    rowDiv.appendChild(textAreaEl);
    rowDiv.appendChild(saveBtnEl);
    saveBtnEl.appendChild(iconEl);
  }

  for (let i = 0; i < hours.length; i++) {
    getRow(hours[i]);
  }
});
