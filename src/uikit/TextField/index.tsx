import React from 'react'

type TextFieldProps = {
  variant: string,
  placeholder: string,
  label: string,
  help: string,
  hasError: string,
  value: string,
  defaultValue: string,
  prefix: string,
  suffix: string,
  right: string,
  disabled: boolean,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TextField() {
  return (
    <></>
  )
}