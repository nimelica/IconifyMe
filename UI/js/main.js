async function onSubmit(e) {
  e.preventDefault();

  document.querySelector('.msg').textContent = '';
  document.querySelector('#image').src = '';

  const prompt = document.querySelector('#prompt').value;
  const size = document.querySelector('#size').value;
  const amount = document.querySelector('#amount').value;

  if (prompt === '') {
    alert('Please add some description');
    return;
  }

  generateImageRequest(prompt, size, amount);
}


async function generateImageRequest(prompt, size, amount) {
  try {
    showSpinner();

    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size,
        amount,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error('The image(s) could not be generated');
    }

    const data = await response.json();
    const imageUrls = data.data;
    const imageContainer = document.querySelector('.image-container');

    // clear any previously displayed images
    imageContainer.innerHTML = '';

    // display each image URL as an image element
    for (let i = 0; i < imageUrls.length; i++) {
      const imageElement = document.createElement('img');
      imageElement.src = imageUrls[i];
      imageElement.alt = `Generated image ${i + 1}`;
      imageContainer.appendChild(imageElement);
    }

    removeSpinner();
  } catch (error) {
    document.querySelector('.msg').textContent = error;
  }
}


function downloadImage(imageUrl) {
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = 'icon.png';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);

document.querySelector('#download-button').addEventListener('click', () => {
  const imageUrl = document.querySelector('#image').src;
  if (imageUrl === '') {
    alert('Please generate an image first');
    return;
  }

  downloadImage(imageUrl);
  document.querySelector('#download-button').remove();
});
