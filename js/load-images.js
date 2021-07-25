const addImages = () => {
  const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  const avatar = document.querySelector('#avatar');
  const avatarPreview = document.querySelector('.ad-form-header__preview img');
  const image = document.querySelector('#images');
  const imagePreview = document.querySelector('.ad-form__photo');

  const addImage = (inputFile, preview) => {
    const file = inputFile.files[0];
    const fileName = file.name.toLowerCase();
    const typeCheck = FILE_TYPES.some((fileEnd) => fileName.endsWith(fileEnd));

    if (typeCheck) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  avatar.addEventListener('change', () => {
    addImage(avatar, avatarPreview);
  });

  image.addEventListener('change', () => {
    imagePreview.innerHTML = '';
    const newImage = document.createElement('img');
    newImage.width = 70;
    newImage.height = 70;
    newImage.style.objectFit = 'cover';
    imagePreview.appendChild(newImage);
    addImage(image, newImage);
  });
};

export {addImages};
