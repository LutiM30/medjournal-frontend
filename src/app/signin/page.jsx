'use client';
import React from 'react';
import { projectConstants } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { EmailRules, PasswordRules } from '@/lib/Rules';
import Divider from '@/components/ui/Divider';
import FormInput from '@/components/ui/Elements/FormInput';
import {
  FORGOT_PASSWORD,
  FULL_WIDTH_BTN_HV_EFCT_CLASS_TXT_LEFT,
  FULL_WIDTH_BTN_HV_EFCT_CLASS,
  SIGNIN_TXT,
  SIGNUP_LINK,
} from '@/lib/constants';
import useFirebaseAuth from '@/lib/hooks/useFirebaseAuth';
import { generateFirebaseAuthErrorMessage } from '@/lib/functions/generateErrorMessage';
import BottomGradientBtn from '@/components/ui/Elements/Buttons/BottomGradientBtn.jsx';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

import useProfileRedirect from '@/lib/hooks/useProfileRedirect';
import { toast } from 'sonner';

const SignIn = () => {
  const { signIn } = useFirebaseAuth();

  const router = useRouter();
  const redirectTo = useProfileRedirect();

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
      toast.success(`Welcome back ${user.user.displayName ?? ''}`);
      redirectTo();
    } catch (error) {
      handleSubmissionError(error);
    }
  };

  const handleSubmissionError = (error) => {
    const errorMsg = generateFirebaseAuthErrorMessage(error);
    const affectedField = formInputs.find((input) =>
      error.code?.includes(input.name)
    )?.name;

    if (affectedField) {
      setError(
        affectedField,
        { type: 'manual', message: errorMsg || error.code },
        { shouldFocus: true }
      );
    }
    toast.error(errorMsg || error.code);
    console.error('Error in onSubmit:', error);
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

          <BottomGradientBtn
            className={FULL_WIDTH_BTN_HV_EFCT_CLASS}
            label={<>{SIGNIN_TXT} &rarr;</>}
            type='submit'
          />

          <Divider />
          <BottomGradientBtn
            type='button'
            onClick={() => router.push('/signup')}
            className={FULL_WIDTH_BTN_HV_EFCT_CLASS_TXT_LEFT + ' mb-4'}
            label={
              <>
                <span className='text-neutral-700 dark:text-neutral-300 text-sm'>
                  {SIGNUP_LINK}
                </span>
                <ArrowTopRightIcon className='text-neutral-700 dark:text-neutral-300' />
              </>
            }
          />

          <BottomGradientBtn
            type='button'
            onClick={() => router.push('/password-reset')}
            className={FULL_WIDTH_BTN_HV_EFCT_CLASS_TXT_LEFT}
            label={
              <>
                <span className='text-neutral-700 dark:text-neutral-300 text-sm'>
                  {FORGOT_PASSWORD}
                </span>
                <ArrowTopRightIcon className='text-neutral-700 dark:text-neutral-300' />
              </>
            }
          />
        </form>
      </div>
    </>
  );
};

export default SignIn;
