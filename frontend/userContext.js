import React from 'react'

//create a context from our React
const UserContext = React.createContext()

//export the provider component of our react context which, allows us to subscribe our components to changes made to our context. This means that the provider component will allow our components inside it access to the values of our context.
export const UserProvider = UserContext.Provider

export default UserContext