// to use checkImgUrl add const [urlError, setUrlError] = useState(''); to the relevant component
export const formatImgUrl = (photoUrl: string, setUrlError: (message: string) => void) => {
    const extensions = ['.jpeg', '.jpg', '.png', '.webp'];
    const imgExtension = extensions.find((ext) => photoUrl.includes(ext));

    if (!imgExtension) {
      setUrlError('Please enter a valid IMAGE url.');
      console.error('Invalid image URL, no valid image extension found.');
      return '';
    }

    setUrlError('');
    return photoUrl.slice(
      0,
      photoUrl.indexOf(imgExtension) + imgExtension.length
    );
  };