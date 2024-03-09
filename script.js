document.addEventListener('DOMContentLoaded', function () {
  const slotsContainer = document.getElementById('slots');

  const slots = [
    { date: '2024-03-10', time: '10:00 AM', available: true },
    { date: '2024-03-10', time: '02:00 PM', available: false },
    { date: '2024-03-11', time: '11:00 AM', available: true },
    { date: '2024-03-11', time: '03:00 PM', available: true },
  ];

  slots.forEach(slot => {
    const slotElement = document.createElement('div');
    slotElement.classList.add('slot');
    if (!slot.available) {
      slotElement.classList.add('booked');
    } else {
      slotElement.classList.add('available');
      slotElement.addEventListener('click', () => bookSlot(slotElement, slot));
    }
    slotElement.textContent = `${slot.date} - ${slot.time}`;
    slotsContainer.appendChild(slotElement);
  });

  function bookSlot(slotElement, slot) {
    slotElement.classList.remove('available');
    slotElement.classList.add('booked');
    slot.available = false;

    const email = document.getElementById('email').value;
    sendConfirmationEmail(email, slot);

    alert(`Slot booked for ${slot.date} at ${slot.time}. Confirmation email sent to ${email}`);
  }

  function sendConfirmationEmail(email, slot) {
  const doctorEmail = 'pratyuspratye@gmail.com'; // Change this to the actual doctor's email address

  const data = {
    email: email,
    slot: slot,
    doctorEmail: doctorEmail
  };

  fetch('https://kkrishnabai.github.io/counseling', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to send email');
    }
    console.log('Confirmation email sent successfully');
  })
  .catch(error => {
    console.error('Error sending confirmation email:', error);
  });
}


  const bookingForm = document.getElementById('bookingForm');
  bookingForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const selectedSlot = document.querySelector('.slot.available');
    if (selectedSlot) {
      const email = document.getElementById('email').value;
      bookSlot(selectedSlot, { date: selectedSlot.dataset.date, time: selectedSlot.dataset.time, available: false });
      bookingForm.reset();
    } else {
      alert('Please select an available slot before submitting the form.');
    }
  });
});

