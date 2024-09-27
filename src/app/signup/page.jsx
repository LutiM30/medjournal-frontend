"use client";
import React from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import BottomGradientBtn from "@/components/ui/Elements/Buttons/BottomGradientBtn.jsx";
import { projectConstants, USER_ROLES_OPTIONS } from "@/lib/utils";
import {
  ConfirmPasswordRules,
  FirstNameRules,
  LastNameRules,
  PasswordRules,
  EmailRules,
} from "@/lib/Rules";
import FormInput from "@/components/ui/Elements/FormInput";
import {
  FULL_WIDTH_BTN_HV_EFCT_CLASS_TXT_LEFT,
  FULL_WIDTH_BTN_HV_EFCT_CLASS,
  SIGNIN_LINK,
  SIGNUP_TXT,
} from "@/lib/constants";
import useFirebaseAuth from "@/lib/hooks/useFirebaseAuth";
import Divider from "@/components/ui/Divider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LabelInputContainer from "@/components/ui/LabelInputContainer";
import ErrorMessage from "@/components/ui/Elements/ErrorMesage";
import { Label } from "@/components/ui/Elements/label";
import { generateFirebaseAuthErrorMessage } from "@/lib/functions/generateErrorMessage";
import { AddUser } from "@/lib/functions/Firestore/UserCollection";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

import { DOCTOR_ROLE, PATIENT_ROLE } from "@/lib/constants";
import { getUserFromFirestore } from "@/lib/functions/getUserFromFirestore";

const Signup = () => {
  const { signUp } = useFirebaseAuth();
  const router = useRouter();
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmpassword: "",
      userRole: USER_ROLES_OPTIONS[0].value,
    },
  });

  const onSubmit = async (data) => {
    const sendDataToFirebase = {
      email: data.email,
      password: data.password,
    };
    try {
      const user = await signUp(sendDataToFirebase);
      console.log("User signed up successfully:", user);
      const sendDataToCollection = {
        ...data,
        createdAt: today?.toDate(),
        isProfileComplete: false,
        email: data?.email?.toLowerCase(),
      };

      delete sendDataToCollection.password;
      delete sendDataToCollection.confirmpassword;

      sendDataToCollection.uid = user.user.uid;

      const userAddRes = await AddUser(sendDataToCollection);
      console.log("User added to Firestore:", userAddRes);

      const userDoc = await getUserFromFirestore(user.user.uid);
      console.log("User role from Firestore:", userDoc);
      if (userDoc?.userRole === DOCTOR_ROLE) {
        router.push("/doctor");
      } else if (userDoc?.userRole === PATIENT_ROLE) {
        router.push("/pat"); 
      } else {
        router.push("/"); 
      }

    } catch (error) {
      let errorMsg = generateFirebaseAuthErrorMessage(error);

      const found = formInputs
        .map((input) => input.name)
        ?.find((name) => error.code?.includes(name));

      if (error?.code && found) {
        setError(
          found,
          { type: "manual", message: `${errorMsg || error?.code}` },
          { shouldFocus: true }
        );
      }

      console.error("ERROR in onSubmit Line 82: ", error);
    }
  };



  const formInputs = [
    {
      name: "firstName",
      rules: FirstNameRules,
      type: "text",
      label: "First Name",
      placeholder: "Tyler",
    },
    {
      name: "lastName",
      rules: LastNameRules,
      type: "text",
      label: "Last Name",
      placeholder: "Durden",
    },
    {
      name: "email",
      rules: EmailRules,
      type: "email",
      label: "Enter Email",
      placeholder: "tylerdurdenfc@gmail.com",
      className: "mb-4",
    },
    {
      name: "password",
      rules: PasswordRules,
      type: "password",
      label: "Setup a New Password",
      placeholder: "p@$$w0rd",
      className: "mb-4",
    },
    {
      name: "confirmpassword",
      rules: ConfirmPasswordRules(watch),
      type: "password",
      label: "Repeat The Same Password",
      placeholder: "R3p3at p@$$w0rd",
      className: "mb-4",
    },
  ];

  formInputs.forEach((input) => {
    input.errorMsg = errors[input.name]?.message || "";
  });

  const names = [formInputs[0].name, formInputs[1].name];

  const divCondition = (input) =>
    input.name === names[0] || input.name === names[1];

  return (
    <>
      <div className="max-w-md w-full mx-auto rounded-1 md:rounded-2xl  p-4 md:p-8 shadow-input bg-white dark:bg-black m-20">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to {projectConstants.PROJECT_NAME}
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          {SIGNUP_TXT} to {projectConstants.PROJECT_NAME}
        </p>
        <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            {formInputs.map((input, key) =>
              divCondition(input) ? (
                <FormInput {...input} register={register} key={key} />
              ) : (
                <React.Fragment key={key}></React.Fragment>
              )
            )}
          </div>
          {formInputs.map((input, key) =>
            !divCondition(input) ? (
              <FormInput {...input} register={register} key={key} />
            ) : (
              <React.Fragment key={key}></React.Fragment>
            )
          )}
          <Controller
            control={control}
            name="userRole"
            render={({ field }) => {
              return (
                <LabelInputContainer className={""}>
                  <Label htmlFor={"userRole"}>Select User Role</Label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select User Role" />
                    </SelectTrigger>

                    <SelectContent>
                      {USER_ROLES_OPTIONS?.map((role) => (
                        <SelectItem value={role.value} key={role.key}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors["userRole"] && (
                    <ErrorMessage msg={errors["userRole"]} />
                  )}
                </LabelInputContainer>
              );
            }}
          />

          <BottomGradientBtn
            className={FULL_WIDTH_BTN_HV_EFCT_CLASS}
            label={<>{SIGNUP_TXT} &rarr;</>}
            type="submit"
          />

          <Divider />
          <BottomGradientBtn
            onClick={() => router.push("/signin")}
            className={FULL_WIDTH_BTN_HV_EFCT_CLASS_TXT_LEFT}
            label={
              <>
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  {SIGNIN_LINK}
                </span>
                <ArrowTopRightIcon className="text-neutral-700 dark:text-neutral-300" />
              </>
            }
            type="button"
          />
        </form>
      </div>
    </>
  );
};

export default Signup;
