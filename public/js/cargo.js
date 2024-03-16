// POST Method
const cargoForm = document.getElementById('post-cargo-form');
cargoForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  try {

    const formData = new FormData(event.target);
    const cargo = Object.fromEntries(formData.entries());
    
    // Send a POST request to add the cargo
    const response = await axios.post('/cargo', cargo);
    console.log(response);
    

    alert(`Successfully added cargo!`);
    location.reload();
  } catch (error) {

    console.error(error);
    alert('Failed to add cargo!');
  }
});

// PUT Method
const putCargoForm = document.getElementById('put-cargo-form');
putCargoForm.addEventListener('submit', async (event) => {

  event.preventDefault();
  
  try {

    const formData = new FormData(event.target);
    const cargo = {
      id: formData.get('cargo-id'),
      ...Object.fromEntries(formData.entries())
    };
    
    // Send a PUT request to update the cargo
    const response = await axios.put(`/cargo/${cargo.id}`, cargo);
    console.log(response);
    

    alert(`Successfully updated cargo!`);
    location.reload();
  } catch (error) {

    console.error(error);
    alert('Failed to update cargo!');
  }
});


// DELETE Method
document.getElementById('delete-cargo-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {
    id: formData.get('cargo-id'), 
  };
  
  try {
    // Send a DELETE request to delete the cargo
    const response = await axios.delete('/cargo', { data });
    console.log(response);
    alert('Delete cargo successful.');
    location.reload();

  } catch (error) {
    console.error(error);
    alert('Error deleting cargo.');
  }
});
