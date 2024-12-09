'use client';
import React from 'react';

import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import BottomGradientBtn from '@/components/ui/Elements/Buttons/BottomGradientBtn';
import FormInput from '@/components/ui/Elements/FormInput';
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

import { USER_ROLES_OPTIONS } from '@/lib/utils';
import { FirstNameRules, LastNameRules, EmailRules } from '@/lib/Rules';
import { FULL_WIDTH_BTN_HV_EFCT_CLASS } from '@/lib/constants';

import { generateFirebaseAuthErrorMessage } from '@/lib/functions/generateErrorMessage';
import useFirebaseAuth from '@/lib/hooks/useFirebaseAuth';

const NewUserProfileForm = ({ randomPwd }) => {
  const { createUser } = useFirebaseAuth();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: randomPwd,
      confirmpassword: randomPwd,
      role: USER_ROLES_OPTIONS[0].value,
    },
  });

  const handleSubmissionError = (error) => {
    const errorMsg = generateFirebaseAuthErrorMessage(error);
    const affectedField = creatingNewUserFormInputs.find((input) =>
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

  const creatingNewUserFormInputs = [
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
  ];

  const onSubmit = async (data) => {
    try {
      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        email: data.email,
        password: data.password,
      };

      await createUser({ ...userData });

      reset();
    } catch (error) {
      handleSubmissionError(error);
    }
  };

  creatingNewUserFormInputs.forEach((input) => {
    input.errorMsg = errors[input.name]?.message || '';
  });

  return (
    <>
      <form className='max-w-md my-8' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4'>
          {creatingNewUserFormInputs.slice(0, 2).map((input, key) => (
            <FormInput key={key} {...input} register={register} />
          ))}
        </div>
        {creatingNewUserFormInputs.slice(2).map((input, key) => (
          <FormInput key={key} {...input} register={register} />
        ))}
        <Controller
          control={control}
          name='role'
          render={({ field }) => (
            <LabelInputContainer>
              <Label htmlFor='role'>Select User Role</Label>
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
              {errors.role && <ErrorMessage msg={errors.role.message} />}
            </LabelInputContainer>
          )}
        />
        <BottomGradientBtn
          className={FULL_WIDTH_BTN_HV_EFCT_CLASS}
          label={<>Create User &rarr;</>}
          type='submit'
        />
      </form>
    </>
  );
};

export default NewUserProfileForm;
