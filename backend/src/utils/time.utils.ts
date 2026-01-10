export const isNowBetween = (start: string, end: string) => {
    const now = new Date().toTimeString().slice(0, 8);
    return now >= start && now <= end;
  };
  