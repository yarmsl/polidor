interface Child {
  children?: React.ReactNode;
}

interface MetaLT {
  title: string;
}

interface formSignIn {
  email: string;
  password: string;
}

interface formSignUp extends formSignIn {
  name: string;
}

interface IQueryError {
  status: number;
  data: {
    message: string;
  };
}

interface IMessage {
  message: string;
}

type TStyles = Record<string, import('@mui/material').SxProps>;

interface IBase {
  _id: string;
  author: IUser;
  createdAt: string;
  updatedAt: string;
}

type TMuiTableProps = import('@mui/material').TableProps;

interface IEdit<Dto> {
  id: string;
  dto: Dto;
}
