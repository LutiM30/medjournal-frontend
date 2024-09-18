'use client';
import React from 'react';
import BottomGradient from '@/components/ui/Effects/BottomGradient';
import { projectConstants } from '@/lib/utils';
import { useForm } from 'react-hook-form';

import { EmailRules, PasswordRules } from '@/lib/Rules';
import FormInput from '@/components/ui/Elements/FormInput';
import { FULL_WIDTH_BTN_HV_EFCT_CLASS, SIGNIN_TXT } from '@/lib/constants';
import useFirebaseAuth from '@/lib/hooks/useFirebaseAuth';

import { generateFirebaseAuthErrorMessage } from '@/lib/functions/generateErrorMessage';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const { signIn } = useFirebaseAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,

    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    const sendDataToFirebase = {
      email: data.email,
      password: data.password,
    };
    try {
      const user = await signIn(sendDataToFirebase);

      router.push('/');
    } catch (error) {
      let errorMsg = generateFirebaseAuthErrorMessage(error);

      const found = formInputs
        .map((input) => input.name)
        ?.find((name) => error.code?.includes(name));
      console.log(error?.code);

      const foundErrorMsg = formInputs
        .map((input) => input.name)
        ?.find((name) => errorMsg?.includes(name));

      console.log({ foundErrorMsg, error, errorMsg });

      if ((error?.code && found) || (errorMsg && foundErrorMsg)) {
        setError(
          found,
          { type: 'manual', message: `${errorMsg || error?.code}` },
          { shouldFocus: true }
        );
      } else {
        setError(
          'email',
          { type: 'manual', message: `${errorMsg || error?.code}` },
          { shouldFocus: true }
        );
      }

      console.error('ERROR in onSubmit Line 82: ', error);
    }
  };

  const formInputs = [
    {
      name: 'email',
      rules: EmailRules,
      type: 'email',
      label: 'Enter Email',
      placeholder: 'tylerdurdenfc@gmail.com',
      className: 'mb-4',
    },
    {
      name: 'password',
      rules: PasswordRules,
      type: 'password',
      label: 'Enter Password',
      placeholder: 'p@$$w0rd',
      className: 'mb-4',
    },
  ];

  formInputs.forEach((input) => {
    input.errorMsg = errors[input.name]?.message || '';
  });

  return (
    <>
      <div className='max-w-md w-full mx-auto rounded-1 md:rounded-2xl  p-4 md:p-8 shadow-input bg-white dark:bg-black m-20'>
        <h2 className='font-bold text-xl text-neutral-800 dark:text-neutral-200'>
          Welcome to {projectConstants.PROJECT_NAME}
        </h2>
        <p className='text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
          {SIGNIN_TXT} to {projectConstants.PROJECT_NAME}
        </p>
        <form className='my-8' onSubmit={handleSubmit(onSubmit)}>
          {formInputs.map((input, key) => (
            <FormInput {...input} register={register} key={key} />
          ))}

          <button className={FULL_WIDTH_BTN_HV_EFCT_CLASS} type='submit'>
            {SIGNIN_TXT} &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
