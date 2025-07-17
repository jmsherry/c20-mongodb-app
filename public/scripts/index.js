const codeBlock = document.getElementById('code')
try {
  const resp = await fetch('/api/v1/cars');
  if(!resp.ok) throw new Error('Failed to fetch', { reason: resp });
  const cars = await resp.json();
  console.log('cars', cars);
  codeBlock.textContent = JSON.stringify(cars, null, 2);
} catch (err) {
  console.log(err);
}