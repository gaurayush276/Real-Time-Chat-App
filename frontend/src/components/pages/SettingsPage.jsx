import React from 'react'
import Themes from '../constants/themes.js' 
import { useThemeStore } from '../store/useThemeStore.js';
export const SettingsPage = () => {

 const data = Themes ; 
 const { theme , setTheme } = useThemeStore( ) ; 
// console.log(" the current theme is " , localStorage.getItem("chat-theme")) ; 
 
   
  return (
    <div className=' p-5 flex-col '>
         { data.map( (th) =>(
          <div  key = {th}> 
            <div className='h-auto p-2 border m-2 border-zinc-600' onClick={e=> {console.log(e.target.textContent)
              setTheme(e.target.textContent ) ; 
            }}> 
              { th }
            </div>
            </div>
         ))}
    </div>
  )
}

export default SettingsPage
