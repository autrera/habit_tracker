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

export function groupDatesForYearly(days, groupBy) {
  const groupedDates = [];
  for (let i = 0; i < groupBy; i++) {
    groupedDates.push([]);
  }

  let group = 0;
  days.map(date => {
    groupedDates[group].push(date);
    group++;
    if (group == groupBy) {
      group = 0;
    }
  });

  return groupedDates;
}

export function groupDatesForDisplay(days, groupBy) {
  const groupedDates = [[]];

  let group = 0;
  let counter = 0;
  days.map(date => {
    groupedDates[group].push(date);
    counter++;
    if (counter == groupBy) {
      group++;
      counter = 0;
      groupedDates[group] = [];
    }
  });

  return groupedDates;
}

export function getToday() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
