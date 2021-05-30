import { ActionT } from "@/types/common-types";
import { cookieCtrl } from "@/utils/ThemeCookie";
import { Subscriber } from "@/utils/utils";

export type ThemeT = 'dark' | 'main'

const SET_CURRENT_THEME = 'theme/SET_CURRENT_THEME'

type setCurrentThemeT = ActionT<typeof SET_CURRENT_THEME, ThemeT>

type ThemeActionT = setCurrentThemeT

export const actionCreator = {
  setCurrentTheme: (theme: ThemeT): setCurrentThemeT => {
    return { type: SET_CURRENT_THEME, payload: theme }
  }
}

const initialState = {
  currentTheme: (cookieCtrl.getTheme() || 'main') as ThemeT,
  subscribeControllers: {
    setDarkTheme: new Subscriber(),
    setMainTheme: new Subscriber()
  }
}

type ThemeState = typeof initialState

export const themeReducer = (state = initialState, action: ThemeActionT): ThemeState => {
  switch (action.type) {
    case SET_CURRENT_THEME:
      cookieCtrl.setTheme(action.payload)
      return { ...state, currentTheme: action.payload }
    default:
      return state
  }
}

