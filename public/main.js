function getAll() {
  fetch("/appart")
    .then((response) => response.json())
    .then((data) => {
      console.log('data: ', data);
    });
}
