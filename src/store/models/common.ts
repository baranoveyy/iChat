interface Common {
  language: string;
  locale?: string;
  loading?: boolean;
  error?: any;
}

type CommonState = Readonly<Common>;

export default CommonState;
