import { useEffect, useState } from "react";
import { CssBaseline, NoSsr, ThemeProvider, alpha, createTheme, getContrastRatio } from "@mui/material"
import { Outlet } from "react-router-dom";
import GoogleFont from 'react-google-fonts'
import { salmonBase, salmonBase2, salmonMain, violetBase, violetMain } from "../constants/themecolors";
import Header from "../../pages/header/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getCookieReact } from "../../utils/getCookie";
import LoadingIndicator from "../../pages/loading/loadingIndicator";
import { useGeneralStoreDispatch, useStorePropertySelector } from "../../store";
import { getBasketAsync } from "../../reducerSlices/basketAsyncThunkMethods";


// Augment the palette to include a violet color
declare module '@mui/material/styles' {
  interface Palette {
    catalogviolet: Palette['primary'];
  }

  interface PaletteOptions {
      catalogviolet?: PaletteOptions['primary'];
  }
  interface Palette {
      catalogsalmon: Palette['primary'];
    }
  
    interface PaletteOptions {
      catalogsalmon?: PaletteOptions['primary'];
    }
}

function App() {
  //const {setBasket} = useStoreContext();
  const dispatch = useGeneralStoreDispatch();
  const status = useStorePropertySelector(state => state.BasketData.Status);

  useEffect(() => {
    let BuyerId = getCookieReact('buyerId');
    if (BuyerId){
      dispatch(getBasketAsync());
    }
    else{
      dispatch(getBasketAsync());
      BuyerId = getCookieReact('buyerId');
    }
  }, [dispatch]);

  const[darkMode, setDarkMode] = useState(false);
  const currentMode = darkMode ? 'dark' : 'light';
  const backgroundColor = darkMode ? '#111111' : '#eaeaea';

  function toggleDarkMode(){
    setDarkMode(!darkMode);
  };

  const AppTheme = createTheme({
    palette: {
        catalogviolet: {
        main: violetMain,
        light: alpha(violetBase, 0.5),
        dark: alpha(violetBase, 0.9),
        contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
      },
      catalogsalmon: {
        main: salmonMain,
        light: alpha(salmonBase2, 0.5),
        dark: alpha(salmonBase, 0.9),
        contrastText: getContrastRatio(salmonMain, '#fff') > 4.5 ? '#fff' : '#111',
      },
      mode: currentMode,
      background:{
        default: backgroundColor}
    },
  });

    if (status.includes('pending')) return <LoadingIndicator LoadingMessage="Acquiring basket....Please wait." />;
  return (
    <>
      <NoSsr>
                <GoogleFont href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,500&display=swap' />
                <GoogleFont href='https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;700&display=swap' />
                <GoogleFont href='https://fonts.googleapis.com/css2?family=Spartan:wght@200;400;700&display=swap' />
                <GoogleFont href='https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;500&display=swap' />
            </NoSsr>
      <ThemeProvider theme={AppTheme}>
        <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
        <CssBaseline />
        <Header toggleDarkMode={toggleDarkMode} toggleChecked={darkMode} />
          <div id="detail">  {/* <--- section acts like the render body  of a React component--> */}
              <Outlet />  
          </div>
      </ThemeProvider>
    </> 
  )
}

export default App
