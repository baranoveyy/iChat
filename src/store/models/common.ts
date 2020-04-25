interface Common {
  language?: string;
  locale?: string;
  loading?: boolean;
  error?: string;
  warning?: any; // eslint-disable-line
  receipt?: string;
  appInactiveSeconds?: number;
}

type CommonState = Readonly<Common>;

export default CommonState;
