import User from '../components/User';
import Card from '../components/Card';

function card() {
  return (
    <>
      <div className='container-fluid information'>
        <div className="row">
          <div className="col-12 col-md-8">
            <Card></Card>
          </div>
          <div className="col-12 col-md-4">
            <User></User>
          </div>
        </div>
      </div>
    </>
  );
}

export default card;
