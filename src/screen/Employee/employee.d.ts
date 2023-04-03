interface IEmployeeValues {
  name: string;
  middleName: string;
  surname: string;
  dob: string;
  gender: OptionType | null;
  address: string;
  mobile: string;
  email: string;
  workStartAt: string;
  workEndAt: string;
  team: OptionType | null;
  role: OptionType | null;
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
  gender: OptionType;
  address: string;
  mobile: string;
  email: string;
  workStartAt: string;
  workEndAt: string;
  team: OptionType | null;
  role: OptionType;
  isBillable: boolean;
  billableHours: number;
  profileImage: string | null;
}

interface IEmployeeDetail {
  name: string;
  middleName: string | null;
  surname: string;
  dob: string;
  gender: OptionType;
  address: string;
  mobile: string;
  email: string;
  workStartAt: string;
  workEndAt: string;
  team: OptionType | null;
  role: OptionType;
  billableHours: number;
  profileImage: null;
  isBillable: boolean;
  id: string;
}
