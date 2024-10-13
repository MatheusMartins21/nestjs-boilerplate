type ReceiverDTO = {
  name: string | null;
  email: string | null;
};

type OptionalsDTO = {
  token?: number;
};

type BodyDTO = {
  title: string;
  receiver: ReceiverDTO | null;
  optionals?: OptionalsDTO;
};

export type EmailDTO = {
  subject: string;
  from: string;
  template: string;
  body: BodyDTO | null;
};
