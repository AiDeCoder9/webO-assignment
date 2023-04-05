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

export const formatTeamMembers = (members: Array<OptionType>) => {
  const names = members.map((member) => member.label);
  if (names.length < 2) {
    return names.join(', ');
  } else if (names.length === 2) {
    return names.join(' & ');
  } else {
    const firstTwoNames = names.slice(0, 2).join(' & ');
    const remainingNamesCount = names.length - 2;
    const remainingNamesMsg = `and ${remainingNamesCount} other${
      remainingNamesCount > 1 ? 's' : ''
    }`;
    return `${firstTwoNames}, ${remainingNamesMsg}`;
  }
};
