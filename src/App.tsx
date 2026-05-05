import "./App.css";
import Card from "./card/card";
import { blue, green, orange, purple, red, yellow } from "./card/card-colors";
function App() {
  return (
    <div className="container">
      <div className="memory-board">
        <Card cardFrontClassname={red} />
        <Card cardFrontClassname={orange} />
        <Card cardFrontClassname={yellow} />
        <Card cardFrontClassname={green} />
        <Card cardFrontClassname={blue} />
        <Card cardFrontClassname={purple} />
        <Card cardFrontClassname={red} />
        <Card cardFrontClassname={orange} />
        <Card cardFrontClassname={yellow} />
        <Card cardFrontClassname={green} />
        <Card cardFrontClassname={blue} />
        <Card cardFrontClassname={purple} />
      </div>
    </div>
  );
}

export default App;
