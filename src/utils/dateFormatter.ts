export type FormatDateProps = {
  date: string | number | Date;
  noDateDisplay?: string | undefined;
  tzCommonName?: string;
};

export const formatDate = ({ date }: FormatDateProps) => {
  const newDate = new Date(date);

  if (newDate instanceof Date && !isNaN(newDate.valueOf())) {
    const dateArray = newDate.toDateString().split(' ').slice(1);

    dateArray[1] = `${dateArray[1]},`;

    const dateText = dateArray.join(' ');

    return `${dateText}`;
  }
  return 'Invalid date';
};
