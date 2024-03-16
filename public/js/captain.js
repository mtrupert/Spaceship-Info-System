// POST Captain
document.getElementById('post-captain-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  
  try {
    const response = await axios.post('/captain', data);
    console.log(response);
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = response.data;

    alert('Post captain successful.');
    location.reload('');
  } catch (error) {
    console.error(error);
    alert('Error posting captain. Please try again.');
  }
});


// PUT Captain
document.getElementById('update-captain-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const data = {
    id: formData.get('id'),
    firstname: formData.get('firstname'),
    lastname: formData.get('lastname'),
    c_rank: formData.get('c_rank'),
    homeplanet: formData.get('homeplanet')
  };

  try {
    // Make the PUT request to update the captain
    const response = await axios.put('/captain', data);
    console.log(response);

    alert('Update captain successful!');
    location.reload('');
  } catch (error) {
    console.error(error);
    alert('Update captain failed!');
  }
});


// DELETE Captain
document.getElementById('delete-captain-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    // Get the form data
    const formData = new FormData(event.target);
    // Create an object with the form data
    const data = Object.fromEntries(formData.entries());

    // Make the DELETE request to DELETE the cargo
    const response = await axios.delete('/captain', data);
    console.log(response);
    
    alert('Delete captain successful.');
    location.reload('');
  } catch (error) {
    console.error(error);
    alert('Error deleting captain.');
  }
});

