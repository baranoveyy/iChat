interface Common {
  language: string;
  locale?: string;
  loading?: boolean;
  error?: string;
}

type CommonState = Readonly<Common>;

export default CommonState;
