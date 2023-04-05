const checkText = (text: string | undefined) => {
  if (text) return text;
  return '';
};
export const optionTransform = (dataArray: Array<any>) => {
  const returnData: OptionType[] = dataArray?.map((item) => {
    console.log(item, 'item');
    return {
      value: item?.id,
      label: `${item.name} ${checkText(item?.middleName)} ${checkText(item?.surname)}`.trim()
    };
  });
  return returnData;
};
