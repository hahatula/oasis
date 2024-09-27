import { ReactNode } from 'react';
import './Form.css';

type FormProps = {
  formName: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  title: string;
  children: ReactNode;
  action?: string;
  method?: string;
};

function Form({
  formName,
  onSubmit,
  title,
  children,
  action,
  method,
}: FormProps) {
  return (
    <form
      id={formName}
      onSubmit={onSubmit}
      className="form"
      action={action}
      method={method}
    >
      <h2 className="form__title">{title}</h2>
      {children}
    </form>
  );
}

export default Form;
