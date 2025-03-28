$(function () {
  // Default message to send
  let smsg = "Hi";

  // Form submission handler
  $("#form").submit(function () {
    $("#msend").trigger("click");
    return false;
  });

  // Set the last seen time
  const d = new Date();
  let h = d.getHours();
  let t = d.getMinutes();
  t = t - 3;
  h = h < 10 ? "0" + h : h;
  t = t < 10 ? "0" + t : t;
  const time = h < 12 ? `${h}:${t} am` : `${h - 12}:${t} pm`;
  $(".status").html("last seen today at " + time);

  // SVG for ticks
  const tick = `
    <svg style='position: absolute;transition: .5s ease-in-out;' xmlns='http://www.w3.org/2000/svg' width='16' height='15' id='msg-dblcheck-ack' x='2063' y='2076'>
      <path d='M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z' fill='#4fc3f7'/>
    </svg>`;
  $(".tick").html(tick);

  // Emoji SVG
  $(".emoji").html(`
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' id='smiley' x='3147' y='3209'>
      <path fill-rule='evenodd' clip-rule='evenodd' d='M9.153 11.603c.795 0 1.44-.88 1.44-1.962s-.645-1.96-1.44-1.96c-.795 0-1.44.88-1.44 1.96s.645 1.965 1.44 1.965zM5.95 12.965c-.027-.307-.132 5.218 6.062 5.55 6.066-.25 6.066-5.55 6.066-5.55-6.078 1.416-12.13 0-12.13 0zm11.362 1.108s-.67 1.96-5.05 1.96c-3.506 0-5.39-1.165-5.608-1.96 0 0 5.912 1.055 10.658 0zM11.804 1.01C5.61 1.01.978 6.034.978 12.23s4.826 10.76 11.02 10.76S23.02 18.424 23.02 12.23c0-6.197-5.02-11.22-11.216-11.22zM12 21.355c-5.273 0-9.38-3.886-9.38-9.16 0-5.272 3.94-9.547 9.214-9.547a9.548 9.548 0 0 1 9.548 9.548c0 5.272-4.11 9.16-9.382 9.16zm3.108-9.75c.795 0 1.44-.88 1.44-1.963s-.645-1.96-1.44-1.96c-.795 0-1.44.878-1.44 1.96s.645 1.963 1.44 1.963z' fill='#7d8489'/>
    </svg>`);

  // Send message handler
  $("#msend").click(function () {
    const msg = $("#val").val().trim();
    if (msg === "") {
      $("#val").focus();
      return;
    }

    // Append the sent message
    const para = $(`
      <div class='message sent'>
        ${msg}
        <span class='metadata'>
          <span class='time'>${time}</span>
          <span class='tick'>${tick}</span>
        </span>
      </div>`);
    $("#ap").append(para);
    $("#form")[0].reset();

    // Simulate typing status
    setTimeout(() => $(".status").html("online"), 900);
    setTimeout(() => $(".status").html("typing..."), 1000);

    // Scroll to the bottom
    $(".conversation-container").scrollTop(
      $(".conversation-container")[0].scrollHeight
    );

    // Simulate a response
    sendResponse(msg);
  });

  // Simulate chatbot response
  function sendResponse(userMessage) {
    const responses = {
      hello: "Hello, How are you? 😊",
      bye: "Thanks for checking my social media platforms. See you again!",
      thanks: "You're Welcome 😊",
      default: "Sorry, I didn't understand. Please try again.",
    };

    const response = responses[userMessage.toLowerCase()] || responses.default;

    // Append the response
    const para = $(`
      <div class='message received'>
        ${response}
        <span class='metadata'>
          <span class='time'>${time}</span>
        </span>
      </div>`);
    setTimeout(() => {
      $("#ap").append(para);
      $(".conversation-container").scrollTop(
        $(".conversation-container")[0].scrollHeight
      );
    }, 1100);
  }
});
