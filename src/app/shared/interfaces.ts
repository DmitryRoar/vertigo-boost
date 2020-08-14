export interface INavbar {
  title: string
  link: string
  changeLink?: boolean
  sectionLinks?: any
}

export interface IProfileLink extends INavbar {
  sectionLinks: INavbar[]
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
  fire: (options: ISwalInputProps) => any
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
