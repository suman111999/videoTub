// import styled from "styled-components";
// import Menu from "./components/sideBar";
// import Navbar from "./components/main/Navbar";
import { ThemeProvider } from "@mui/material";
import Wrapper from "./components/Wrapper";
import { darkTheme, lightTheme } from "./utils/Theme";
import { useState } from "react";

// const Container = styled.div`
//   display: flex;

// `

// const Main = styled.div`
//   flex:7;
// `
function App() {
  const [darkMode, setDarkMode] = useState(true)


  return (
    // <Container>
    //   <Menu />
    //   <Main>
    //     <Navbar />
    //   </Main>

    // </Container>
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Wrapper darkMode={darkMode} setDarkMode={setDarkMode} />
    </ThemeProvider>
  );
}

export default App;
