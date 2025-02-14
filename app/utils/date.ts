export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function getNextAvailableDate(date: Date): Date {
  const now = new Date();
  const isAfter1630 = now.getHours() > 16 || (now.getHours() === 16 && now.getMinutes() >= 30);
  
  // If it's after 16:30 and the selected date is today, return tomorrow
  if (isAfter1630 && 
      date.getDate() === now.getDate() && 
      date.getMonth() === now.getMonth() && 
      date.getFullYear() === now.getFullYear()) {
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }
  
  return date;
}

export function addHours(date: Date, hours: number): Date {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
} 