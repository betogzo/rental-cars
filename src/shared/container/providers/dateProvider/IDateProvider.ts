export default interface IDateProvider {
  diffInHours(start_date: Date, end_date: Date): Number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  diffInDays(start_date: Date, end_date: Date): number;
  addDays(numOfDays: number): Date;
  addHours(numOfHours: number): Date;
  isBefore(start_date: Date, end_date: Date): boolean;
}
