export interface INavbar {
  title: string
  link: string
  changeLink?: boolean
  sectionLinks?: any
}

export interface IPricing {
  title: string
  price: number
  privileges: string[]
  btnTitle: string
  active: boolean
}

export interface ISwalBtn {
  fire: (reason: string, more: string, output: string) => any
}

interface ISwalInputProps {
  title: string
  input: string
  inputAttributes: object
}

export interface ISwalInput {
  fire: (options: ISwalInputProps) => any,
  close: () => void
}

export interface IAuthData {
  email: string
  password: string
  returnSecureToken: boolean
}

export interface FbAuthResponse {
  expiresIn: string
  idToken: string
}

export interface ISubscriptionItem {
  version: string
  code: string
  pc: string
  id: string
  activated: boolean
  open: boolean
  marginTrans?: boolean
}

export interface IComputerInfo {
  name: string
  id: string
  active: boolean
}

export interface IUpdatePassword {
  idToken: string
  password: string
  returnSecureToken: boolean
}

export interface IConfirmEmail {
  requestType: string
  idToken: string
}

export interface IResetPassword {
  requestType: string
  email: string
}

export interface IParamsForObb {
  oobCode: string
}

export interface IPasswordHash {
  passwordHash: string
}

export interface ISendOobCode {
  email: string
}

export interface ISignUp {
  idToken: string
  email: string
  expiresIn: string
}

export interface IChangeData {
  idToken: string,
  photoUrl: string,
  displayName: string | null,
  deleteAttribute: string | null,
  returnSecureToken: boolean
}
