 function onSubmit(e) {
  e.preventDefault();

  document.querySelector('.msg').textContent = '';
  document.querySelector('#image').src = '';

  const prompt = document.querySelector('#prompt').value;
  const size = document.querySelector('#size').value;

  if (prompt === '') {
    alert('Please add some description');
    return;
  }

  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
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
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error('That image could not be generated');
    }

    const data = await response.json();
    const imageUrl = data.data;
    document.querySelector('#image').src = imageUrl;

    const downloadButton = document.createElement('a');
    downloadButton.textContent = 'Download';
    downloadButton.classList.add('btn');
    downloadButton.addEventListener('click', () => {
      downloadImage(imageUrl);
    });

    const imageContainer = document.querySelector('.image-container');
    imageContainer.appendChild(downloadButton);

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
