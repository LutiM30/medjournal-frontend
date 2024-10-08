'use client';
import React from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

import BottomGradientBtn from '@/components/ui/Elements/Buttons/BottomGradientBtn';
import FormInput from '@/components/ui/Elements/FormInput';
import Divider from '@/components/ui/Divider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import LabelInputContainer from '@/components/ui/LabelInputContainer';
import ErrorMessage from '@/components/ui/Elements/ErrorMesage';
import { Label } from '@/components/ui/Elements/label';

import { projectConstants, USER_ROLES_OPTIONS } from '@/lib/utils';
import {
  ConfirmPasswordRules,
  FirstNameRules,
  LastNameRules,
  PasswordRules,
  EmailRules,
} from '@/lib/Rules';
import {
  FULL_WIDTH_BTN_HV_EFCT_CLASS_TXT_LEFT,
  FULL_WIDTH_BTN_HV_EFCT_CLASS,
  SIGNIN_LINK,
  SIGNUP_TXT,
} from '@/lib/constants';
import useFirebaseAuth from '@/lib/hooks/useFirebaseAuth';
import useProfileRedirect from '@/lib/hooks/useProfileRedirect';
import { generateFirebaseAuthErrorMessage } from '@/lib/functions/generateErrorMessage';
import { AddUser } from '@/lib/functions/Firestore/UserCollection';
import { api } from '@/lib/apis/api';
import { CREATE_USER_ROLE } from '@/lib/apis/apiUrls';

const Signup = () => {
  const { signUp } = useFirebaseAuth();
  const router = useRouter();
  const redirectTo = useProfileRedirect();
  const today = dayjs();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmpassword: '',
      userRole: USER_ROLES_OPTIONS[0].value,
    },
  });

  const onSubmit = async (data) => {
    try {
      // signup and signin using firebase
      const user = await signUp({ email: data.email, password: data.password });

      const userData = {
        ...data,
        createdAt: today.toDate(),
        isProfileComplete: false,
        uid: user.user.uid,
      };
      if (
        !String(userData.email).includes(process.env.NEXT_PUBLIC_ADMIN_EMAIL)
      ) {
        delete userData.email;
        delete userData.password;
        delete userData.confirmpassword;
        await AddUser(userData);
      }

      const tokenResult = await user.user.getIdTokenResult();

      await api(CREATE_USER_ROLE, { role: userData.userRole }, null, {
        authToken: tokenResult.token,
      });
      toast.success('Signed up successfully');
      redirectTo(userData.userRole);
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
      name: 'firstName',
      rules: FirstNameRules,
      type: 'text',
      label: 'First Name',
      placeholder: 'Tyler',
    },
    {
      name: 'lastName',
      rules: LastNameRules,
      type: 'text',
      label: 'Last Name',
      placeholder: 'Durden',
    },
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
      label: 'Setup a New Password',
      placeholder: 'p@$$w0rd',
      className: 'mb-4',
    },
    {
      name: 'confirmpassword',
      rules: ConfirmPasswordRules(watch),
      type: 'password',
      label: 'Repeat The Same Password',
      placeholder: 'R3p3at p@$$w0rd',
      className: 'mb-4',
    },
  ];

  formInputs.forEach((input) => {
    input.errorMsg = errors[input.name]?.message || '';
  });

  return (
    <div className='max-w-md w-full mx-auto rounded-1 md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black m-20'>
      <h2 className='font-bold text-xl text-neutral-800 dark:text-neutral-200'>
        Welcome to {projectConstants.PROJECT_NAME}
      </h2>
      <p className='text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
        {SIGNUP_TXT} to {projectConstants.PROJECT_NAME}
      </p>
      <form className='my-8' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4'>
          {formInputs.slice(0, 2).map((input, key) => (
            <FormInput key={key} {...input} register={register} />
          ))}
        </div>
        {formInputs.slice(2).map((input, key) => (
          <FormInput key={key} {...input} register={register} />
        ))}
        <Controller
          control={control}
          name='userRole'
          render={({ field }) => (
            <LabelInputContainer>
              <Label htmlFor='userRole'>Select User Role</Label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder='Select User Role' />
                </SelectTrigger>
                <SelectContent>
                  {USER_ROLES_OPTIONS.map((role) => (
                    <SelectItem key={role.key} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.userRole && (
                <ErrorMessage msg={errors.userRole.message} />
              )}
            </LabelInputContainer>
          )}
        />
        <BottomGradientBtn
          className={FULL_WIDTH_BTN_HV_EFCT_CLASS}
          label={<>{SIGNUP_TXT} &rarr;</>}
          type='submit'
        />
        <Divider />
        <BottomGradientBtn
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
          type='button'
        />
      </form>
    </div>
  );
};

export default Signup;
