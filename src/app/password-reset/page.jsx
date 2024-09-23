'use client';
import React from 'react';
import { projectConstants } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { EmailRules, PasswordRules } from '@/lib/Rules';
import Divider from '@/components/ui/Divider';
import FormInput from '@/components/ui/Elements/FormInput';
import {
  FULL_WIDTH_BTN_HV_EFCT_CLASS_TXT_LEFT,
  FULL_WIDTH_BTN_HV_EFCT_CLASS,
  SIGNIN_TXT,
  SIGNUP_LINK,
  SIGNIN_LINK,
} from '@/lib/constants';
import useFirebaseAuth from '@/lib/hooks/useFirebaseAuth';
import { generateFirebaseAuthErrorMessage } from '@/lib/functions/generateErrorMessage';
import BottomGradientBtn from '@/components/ui/Elements/Buttons/BottomGradientBtn.jsx';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

const ForgotPassword = () => {
  const { sendPasswordResetEmail } = useFirebaseAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,

    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data) => {
    const sendDataToFirebase = {
      email: data.email,
    };
    try {
      const response = await sendPasswordResetEmail(sendDataToFirebase);

      console.log({ response });
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
      label: 'Enter email associated with an account',
      placeholder: 'tylerdurdenfc@gmail.com',
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
          {projectConstants.PROJECT_NAME}
        </h2>
        <p className='text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
          Forgot password
        </p>
        <form className='my-8' onSubmit={handleSubmit(onSubmit)}>
          {formInputs.map((input, key) => (
            <FormInput {...input} register={register} key={key} />
          ))}

          <BottomGradientBtn
            className={FULL_WIDTH_BTN_HV_EFCT_CLASS}
            label={<> Get the Password Request Link &rarr;</>}
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
            onClick={() => router.push('/signin')}
            className={FULL_WIDTH_BTN_HV_EFCT_CLASS_TXT_LEFT}
            label={
              <>
                <span className='text-neutral-700 dark:text-neutral-300 text-sm'>
                  {SIGNIN_LINK}
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

export default ForgotPassword;
