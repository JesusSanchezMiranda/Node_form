const form = document.getElementById('dataForm');
const result = document.getElementById('result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value
  };

  try {
    const response = await fetch('/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    if (data.success) {
      result.textContent = '¡Datos enviados correctamente!';
      result.style.color = 'green';
    } else {
      result.textContent = 'Error al enviar los datos: ' + data.message;
      result.style.color = 'red';
    }
  } catch (error) {
    result.textContent = 'Error en la conexión: ' + error.message;
    result.style.color = 'red';
  }
});