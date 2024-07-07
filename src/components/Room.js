import React , {useState} from 'react'
import { Modal , Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Room({room , fromdate, todate}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className='row bs'>
      <div className='col-md-4'>
        <img src={room.imageurls[0]} className='smalling'/>
      </div>
        <div className='col-md-7'>
          <h1>{room.name}</h1>
          <b>
          <p>Max Count : {room.maxcount}</p>
          <p>Phone Number:{room.Phonenumber}</p>
          <p>Type: {room.type}</p>
          </b>

          <div style={{float: 'right'}}>
            <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
            <button className='btn btn-primary' style={{ marginRight: '10px' }}onClick={handleShow}>Book Now</button>
            </Link>
            <button className='btn btn-primary' onClick={handleShow}>View Details</button>
          </div>
        </div>
        

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Room