import { ImageData } from "./types"

export type HomeStackParams = {
  Home: undefined
  UploadForm: undefined
}

export type RootNavigatorParams = {
  Login: undefined
  Register: undefined
  TabNavigator: undefined
  Image: { image: ImageData }
}

export type TabNavigatorParams = {
  HomeStack: undefined
  Favourites: undefined
  Profile: undefined
}