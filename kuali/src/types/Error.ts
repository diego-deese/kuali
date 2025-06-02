export type InputError = {
  error: boolean
  errorMessage: string
}

export type ActivityErrors = {
  title: InputError
  description: InputError
  location: InputError
  posterImage: InputError
  dates: InputError
}

export type UserFormErrors = {
  name: InputError
  secondName: InputError
  paternalLastName: InputError
  maternalLastName: InputError
  institutionalEmail: InputError
  personalEmail: InputError
  password: InputError
  identifier: InputError
  curp: InputError
  role: InputError
  employeeNumber?: InputError
  namingNumber?: InputError
  cvuNumber?: InputError
}
