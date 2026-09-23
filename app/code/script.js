document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('logisticsForm');
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.innerText = 'Sending...';
      submitBtn.disabled = true;

      const data = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          alert('Submission successful! Terence will get to you soon!');
          form.reset();
        } else {
          const result = await response.json();
          alert('Formspree Error: ' + (result.errors ? result.errors.map(e => e.message).join(', ') : 'Failed to send'));
        }
      } catch (error) {
        alert('Network error: Could not reach Formspree.');
      } finally {
        submitBtn.innerText = 'Submit Inquiry';
        submitBtn.disabled = false;
      }
    });
  }
});
