import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type UserLoginFormType = {
  credentials: string;
  password: string;
};

export function useLoginForm() {
  const FORM_INITIAL_VALUES = useMemo(() => ({
    credentials: "",
    password: ""
  }), []);

  const {
    register,
    handleSubmit: submitWrapper,
    formState: { errors }
  } = useForm({
    defaultValues: FORM_INITIAL_VALUES
  });

  const onSubmit: SubmitHandler<UserLoginFormType> = async ({credentials, password}) => {
    console.log(credentials, password);
  };
  const handleSubmit = submitWrapper(onSubmit);

  return {
    register,
    errors,
    handleSubmit
  };
}