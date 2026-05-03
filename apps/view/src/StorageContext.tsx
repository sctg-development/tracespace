import React, {useContext} from 'react'

const StorageContext = React.createContext<boolean>(false)

export function StorageProvider(props: {
  useStorage: boolean
  children: React.ReactNode
}): JSX.Element {
  return (
    <StorageContext.Provider value={props.useStorage}>
      {props.children}
    </StorageContext.Provider>
  )
}

export function useStorageEnabled(): boolean {
  return useContext(StorageContext)
}
