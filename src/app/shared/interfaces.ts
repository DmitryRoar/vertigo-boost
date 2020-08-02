export interface INavbar {
  title: string
  link: string
  useClass?: boolean
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
  fire: (text: string, textTwo: string, output: string) => any
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

