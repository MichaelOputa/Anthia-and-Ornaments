export const readImageAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file'));
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
};

export const validateImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024;

  if (!validTypes.includes(file.type)) {
    alert('Please upload a valid image file (JPEG, PNG, or WebP)');
    return false;
  }

  if (file.size > maxSize) {
    alert('Image size must be less than 5MB');
    return false;
  }

  return true;
};
