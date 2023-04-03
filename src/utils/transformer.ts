export const optionTransform = (dataArray: Array<any>) => {
  const returnData: OptionType[] = dataArray?.map((item) => {
    console.log(item, 'item');
    return {
      value: item?.id,
      label: item.name
    };
  });
  return returnData;
};
