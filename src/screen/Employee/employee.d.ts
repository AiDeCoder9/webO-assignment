interface IEmployeeValues {
  name: string;
  middleName: string;
  surname: string;
  dob: string;
  gender: OptionsType<OptionType<string>> | null;
  address: string;
  mobile: string;
  email: string;
  workStartAt: string;
  workEndAt: string;
  position: string | null;
  team: OptionsType<OptionType<string>> | null;
  role: OptionsType<OptionType<string>> | null;
  billableHours: number;
  profileImage: string | null;
}
