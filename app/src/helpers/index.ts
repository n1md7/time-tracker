export const strCapitalized = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);

export enum TimeInterval {
  all,
  hh,
  mm,
  ss,
  hh_mm,
  mm_ss
}

export const timeFormat = (seconds: number, returnInterval: TimeInterval): string => {
  const hh = String(Math.floor(seconds / 60 / 60)).padStart(2, '0');
  const mm = String(Math.floor(seconds / 60 % 60)).padStart(2, '0');
  const ss = String(Math.floor(((seconds % 60) % 60) % 60)).padStart(2, '0');

  switch (returnInterval) {
    case TimeInterval.hh:
      return `${hh}`;
    case TimeInterval.mm:
      return `${mm}`;
    case TimeInterval.ss:
      return `${ss}`;
    case TimeInterval.hh_mm:
      return `${hh}:${mm}`;
    case TimeInterval.mm_ss:
      return `${mm}:${ss}`;
    case TimeInterval.all:
    default:
      return `${hh}:${mm}:${ss}`;
  }
};