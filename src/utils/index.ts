import moment from "jalali-moment";

export function maxCal<T>(data: T[], getValue: (item: T) => number): number {
  return Math.max(...data.map(getValue));
}

export function minCal<T>(data: T[], getValue: (item: T) => number): number {
  return Math.min(...data.map(getValue));
}

export function convertTimeToPersianDate(timeString: string | number | Date) {
    const dateTime = new Date(timeString);
    const jalaliDate = moment(dateTime).locale('fa').format('D MMMM');
    return jalaliDate;
}
function convertToPersianDigits(input: string): string {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  
    return input.replace(/[0-9]/g, (match) => persianDigits[parseInt(match)]);
  }
export function convertTimeToHour(timeString: string | number | Date): string {
    const dateTime = moment(timeString);
    const persianHour = moment(dateTime).format('HH:mm');
    const persianDigitsHour = convertToPersianDigits(persianHour);
    return persianDigitsHour;
  }
export const formatPrice = (price: number | string) => {
    let tempPrice = (price);
    if( typeof price === 'string') {
        tempPrice = Number(tempPrice);
    }

    return tempPrice.toLocaleString('en-US');
}
