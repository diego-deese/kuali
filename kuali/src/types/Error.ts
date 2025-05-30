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
