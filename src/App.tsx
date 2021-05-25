import Footer from "./components/Footer/Footer";
import Content from "./components/Content/Content";
import styled from "styled-components";
import Header from "./components/Header/Header";
import { FC, ReactEventHandler } from "react";
import { Subscriber } from "./utils/utils";
import { hintClassName } from "./components/Content/HintsPanel";
import { searchInputClass } from "./components/Content/SearchForm";

const AppWrapper = styled.div`
  background-color: rgb(236, 236, 236);
  z-index: 100;
  min-height: 100%;
  min-width: 250px;
  display: grid;
  grid-template-rows: 6vh 1fr 6vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "content"
    "footer";
`;

const hintSubscriber = new Subscriber()

const App: FC = () => {
  console.log('App rendered')
  const handleClick: ReactEventHandler<HTMLDivElement> = (e) => {
    const { classList } = e.target as HTMLDivElement
    if (!classList.contains(hintClassName) && !classList.contains(searchInputClass)) {
      hintSubscriber.observer()
    }
  }
  return (
    <AppWrapper onClick={handleClick}>
      <Header />
      <Content subscribeHint={hintSubscriber.subscribe} />
      <Footer />
    </AppWrapper>
  );
}

export default App;