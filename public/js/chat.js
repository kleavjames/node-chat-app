const socket = io();

// autoscroll to bottom
function scrollToBottom() {
  // selectors
  const messages = $('#messages');
  const newMessage = messages.children('li:last-child');
  // heights
  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMsgHeight = newMessage.innerHeight();
  const lastMsgHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMsgHeight + lastMsgHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = $('#message-template').html();
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();

  // const li = $('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);

  // $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  const messageTextBox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function() {
    messageTextBox.val('')
  })
})

socket.on('newLocationMessage', (location) => {
  const formattedTime = moment(location.createdAt).format('h:mm a');
  const template = $('#location-message-template').html();
  const html = Mustache.render(template, {
    from: location.from,
    url: location.url,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();

  // const li = $('<li></li>');
  // const a = $('<a target="_blank">My current location</a>');

  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
});

const locationBtn = $('#send-location');
locationBtn.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser.');
  }

  locationBtn.attr('disabled', 'disabled').text('Sending location...');

  const sendLocation = 'Send location';

  navigator.geolocation.getCurrentPosition( function(position) {
    locationBtn.removeAttr('disabled').text(sendLocation);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    locationBtn.removeAttr('disabled').text(sendLocation);
    alert('Unable to fetch location.');
  });
});