// import { createContext, useContext, useReducer, useEffect } from 'react';

// const AppContext = createContext();

// const initialState = {
//   theme: 'light',
//   apiKey: '',
//   model: 'gpt-4-turbo-preview',
//   temperature: 0.7,
//   sidebarOpen: true,
// };

// function appReducer(state, action) {
//   switch (action.type) {
//     case 'SET_THEME':
//       return { ...state, theme: action.payload };
//     case 'SET_API_KEY':
//       return { ...state, apiKey: action.payload };
//     case 'SET_MODEL':
//       return { ...state, model: action.payload };
//     case 'SET_TEMPERATURE':
//       return { ...state, temperature: action.payload };
//     case 'TOGGLE_SIDEBAR':
//       return { ...state, sidebarOpen: !state.sidebarOpen };
//     case 'RESET_SETTINGS':
//       return initialState;
//     default:
//       return state;
//   }
// }

// export function AppProvider({ children }) {
//   const [state, dispatch] = useReducer(appReducer, initialState, () => {
//     const savedSettings = localStorage.getItem('appSettings');
//     return savedSettings ? JSON.parse(savedSettings) : initialState;
//   });

//   // Persist settings to localStorage
//   useEffect(() => {
//     localStorage.setItem('appSettings', JSON.stringify(state));
//   }, [state]);

//   const value = {
//     ...state,
//     setTheme: (theme) => dispatch({ type: 'SET_THEME', payload: theme }),
//     setAPIKey: (key) => dispatch({ type: 'SET_API_KEY', payload: key }),
//     setModel: (model) => dispatch({ type: 'SET_MODEL', payload: model }),
//     setTemperature: (temp) => dispatch({ type: 'SET_TEMPERATURE', payload: temp }),
//     toggleSidebar: () => dispatch({ type: 'TOGGLE_SIDEBAR' }),
//     resetSettings: () => dispatch({ type: 'RESET_SETTINGS' }),
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {children}
//     </AppContext.Provider>
//   );
// }

// export function useApp() {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error('useApp must be used within an AppProvider');
//   }
//   return context;
// }


import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()
export function AppProvider({ children }) {
  const [apiKey, setApiKey] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  useEffect(() => {
    const savedApiKey = localStorage.getItem('openai_api_key')
    const savedTheme = localStorage.getItem('theme')
    if (savedApiKey) setApiKey(savedApiKey)
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (darkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }
  const saveApiKey = (key) => {
    localStorage.setItem('openai_api_key', key)
    setApiKey(key)
  }
  const removeApiKey = () => {
    localStorage.removeItem('openai_api_key')
    setApiKey('')
  }
  return (
    <AppContext.Provider value={{
      apiKey,
      saveApiKey,
      removeApiKey,
      darkMode,
      toggleDarkMode
    }}>
      {children}
    </AppContext.Provider>
  )
}
export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}