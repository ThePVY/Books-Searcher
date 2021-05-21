import Footer from "./components/Footer/Footer";
import Content from "./components/Content/Content";
import styled from "styled-components";
import Header from "./components/Header/Header";

const AppWrapper = styled.div`
  background-color: rgb(236, 236, 236);
  z-index: 100;
  min-height: 100%;
  min-width: 300px;
  display: grid;
  grid-template-rows: 6vh 1fr 6vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "content"
    "footer";
`;

function App() {
  return (
    <AppWrapper>
      <Header />
      <Content />
      <Footer />
    </AppWrapper>
  );
}

export default App;
