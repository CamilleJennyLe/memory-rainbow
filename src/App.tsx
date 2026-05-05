import "./App.css";
import Card from "./card/card";
import { blue, green, orange, purple, red, yellow } from "./card/card-colors";
function App() {
  return (
    <div className="container">
      <div className="memory-board">
        <Card colorClassName={red} />
        <Card colorClassName={orange} />
        <Card colorClassName={yellow} />
        <Card colorClassName={green} />
        <Card colorClassName={blue} />
        <Card colorClassName={purple} />
        <Card colorClassName={red} />
        <Card colorClassName={orange} />
        <Card colorClassName={yellow} />
        <Card colorClassName={green} />
        <Card colorClassName={blue} />
        <Card colorClassName={purple} />
      </div>
    </div>
  );
}

export default App;
