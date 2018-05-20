const socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('newMessage', function(message) {
  console.log('new message: ', message);

  const li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messages').append(li);
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
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

socket.on('newLocationMessage', (message) => {
  const li = $('<li></li>');
  const a = $('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);

  $('#messages').append(li);
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