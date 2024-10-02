import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  subMonths,
  subYears,
} from 'date-fns';

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

  export const formatTime = (date: string) => {
    const today = new Date();
    const years = differenceInYears(today, date);
    const dateAfterYears = subYears(today, years);
    const months = differenceInMonths(dateAfterYears, date);
    const dateAfterMonths = subMonths(dateAfterYears, months);
    const days = differenceInDays(dateAfterMonths, date);

    const showYears = years > 0 ? true : false;
    const showMonths = months > 0 ? true : false;
    const showDays = !showYears
      ? true
      : !showMonths
      ? days > 0
        ? true
        : false
      : false;

    const resultYears = !showYears
      ? ''
      : years === 1
      ? `${years} year`
      : `${years} years`;
    const resultMonths = !showMonths
      ? ''
      : months === 1
      ? `${months} month`
      : `${months} months`;
    const resultDays = !showDays
      ? ''
      : days === 1
      ? `${days} day`
      : `${days} days`;

    return `${resultYears} ${resultMonths} ${resultDays}`;
  };