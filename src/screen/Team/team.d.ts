interface ITeamValues {
  name: string;
  password: string;
  members: Array<OptionType> | null;
  billableHours: number;
}

interface ITeamRequestData {
  id?: string;
  name: string;
  password: string;
  members: Array<OptionType>;
  billableHours: number;
}

interface ITeamDetail {
  id: string;
  name: string;
  password: string;
  members: Array<OptionType>;
  billableHours: number;
}

interface TableAction<T> {
  view: (data?: T) => void;
}
