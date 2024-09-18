import React from 'react';
import LabelInputContainer from '@/components/ui/LabelInputContainer';
import { Label } from '@/components/ui/Elements/label';
import { Input } from '@/components/ui/Elements/input';
import ErrorMessage from './ErrorMesage';

const FormInput = ({
  name,
  rules,
  type,
  label,
  placeholder,
  errorMsg,
  register,
  children,
  rows,
  className,
}) => {
  const { ref, ...rest } = register(name, rules);

  return (
    <LabelInputContainer className={className || ''}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        ref={ref}
        id={name}
        type={type}
        placeholder={placeholder}
        rows={rows || 0}
        {...rest}
      />
      {errorMsg && <ErrorMessage msg={errorMsg} />}
      {children}
    </LabelInputContainer>
  );
};

export default FormInput;
