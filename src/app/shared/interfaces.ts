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

export interface ISwal {
  fire: (reason: string, more: string, output: string) => any
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

