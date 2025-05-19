export const toYearMonth = (dateString: string): string => {
  const d = new Date(dateString);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

// 將 '10911' 轉為 '109/11'
export const formatTaiwanMonth = (month: string): string => {
  if (month.length === 5) {
    return month.slice(0, 3) + "/" + month.slice(3);
  }
  return month;
};
