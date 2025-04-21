import crewmatesImg from '../assets/crewmates.png';
import ufoImg       from '../assets/ufo.png';

export default function Home() {
    return (
      <div className="home-page">
        <h1>Welcome to the Crewmate Creator!</h1>
        <p>Here is where you can create your very own set of crewmates before sending them off into space!</p>
        <img src={crewmatesImg} alt="Among Us crewmates" width={400} />
        <img src={ufoImg}       alt="UFO"                 width={300} />
      </div>
    )
  }
  