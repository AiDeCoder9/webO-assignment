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
  team: OptionsType<OptionType<string>> | null;
  role: OptionsType<OptionType<string>> | null;
  isBillable: boolean;
  billableHours: number;
  profileImage: string | null;
}

interface IEmployeeRequestData {
  id?: string;
  name: string;
  middleName: string;
  surname: string;
  dob: string;
  gender: OptionsType<OptionType<string>>;
  address: string;
  mobile: string;
  email: string;
  workStartAt: string;
  workEndAt: string;
  team: OptionsType<OptionType<string>> | null;
  role: OptionsType<OptionType<string>>;
  isBillable: boolean;
  billableHours: number;
  profileImage: string | null;
}

interface IEmployeeDetail {
  name: string;
  middleName: string | null;
  surname: string;
  dob: string;
  gender: OptionsType<OptionType<string>>;
  address: string;
  mobile: string;
  email: string;
  workStartAt: string;
  workEndAt: string;
  team: OptionsType<OptionType<string>> | null;
  role: OptionsType<OptionType<string>>;
  billableHours: number;
  profileImage: null;
  isBillable: boolean;
  id: string;
}
