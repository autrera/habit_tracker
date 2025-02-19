export function getDateRange(maxDays) {
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < maxDays; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    dates.push(`${year}-${month}-${day}`);
  }
  
  return dates;
}
