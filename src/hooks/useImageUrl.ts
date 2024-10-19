import { useEffect, useState } from 'react';
import defaultPlaceholder from '../assets/avatar-placeholder.jpg';

export const useImageUrl = (imageUrl: string, placeholder: string = defaultPlaceholder) => {
  const [validImageUrl, setValidImageUrl] = useState<string>(placeholder);

  useEffect(() => {
    if (!imageUrl) {
      setValidImageUrl(placeholder);
      return;
    }

    isImageURLValid(imageUrl).then((isValid) => {
      if (isValid) {
        setValidImageUrl(imageUrl);
      } else {
        setValidImageUrl(placeholder);
      }
    });
  }, [imageUrl]);

  const isImageURLValid = (url: string) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  return validImageUrl;
};
