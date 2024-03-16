// POST Spaceship
document.getElementById('add-spaceship-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  

  const formData = new FormData(event.target);

  const data = Object.fromEntries(formData.entries());
  
  try {
    // Make the POST request to add the spaceship
    const response = await axios.post('/spaceship', data);
    console.log(response);
    
    alert('Added spaceship successful.');
    location.reload('');
  } catch (error) {
    console.error(error);
    alert('Failed to add spaceship.');
  }
});

// PUT Spaceship
document.getElementById('update-spaceship-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const formData = new FormData(event.target);

    const data = {
      id: formData.get('spaceship-id'),
      maxweight: formData.get('maxweight'),
      captainid: formData.get('captainid')
    };

    // Make the PUT request to update the spaceship
    const response = await axios.put('/spaceship', data);
    console.log(response);
    
    alert(`Spaceship with ID ${data.id} updated successfully.`);
    location.reload();
  } catch (error) {
    console.error(error);
    alert('Failed to update spaceship.');
  }
});


// DELETE Spaceship
document.getElementById('delete-spaceship-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {
    id: formData.get('spaceship-id'), 
  };
  
  try {
    // Make the DELETE request to delete the spaceship
    const response = await axios.delete('/cargo', { data });
    console.log(response);

    alert('Delete cargo successful.');
    location.reload();
  } catch (error) {
    console.error(error);
    alert('Error deleting cargo.');
  }
});
