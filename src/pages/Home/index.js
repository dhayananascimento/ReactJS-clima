import './styles.css';
import Card from '../../components/Card';

function Home() {
  return (
      <div className="container">
          <h1 className="title">CLima</h1>
          <div className="card-container">
                <Card />
          </div>
      </div>
  );
}

export default Home;