import User from '../components/User';
import Diamond from '../components/Diamond';

function card() {
  return (
    <>
      <div className='container-fluid information'>
        <div className="row">
          <div className="col-12 col-md-8">
            <Diamond></Diamond>
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
