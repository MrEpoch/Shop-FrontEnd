export interface ChildrenProp {
  children: React.ReactNode;
}

export type ThemeType = {
    theme: boolean,
    setTheme: React.Dispatch<React.SetStateAction<boolean>>
}
