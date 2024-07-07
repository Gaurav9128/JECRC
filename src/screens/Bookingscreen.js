import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';

function Bookingscreen() {
  const { roomid, fromdate, todate } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [room, setRoom] = useState(null);

  // Ensure fromdate and todate are correctly parsed
  const fromDate = moment(fromdate, 'DD-MM-YYYY');
  const toDate = moment(todate, 'DD-MM-YYYY');
  const totaldays = fromDate.isValid() && toDate.isValid() ? moment.duration(toDate.diff(fromDate)).asDays() + 1 : 0;

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post('/api/rooms/getroombyid', { roomid });
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [roomid]);

  async function bookRoom() {
    
    const bookingDetails = {
      roomid: room._id,

      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate: fromDate.format('DD-MM-YYYY'),
      todate: toDate.format('DD-MM-YYYY'),
      totaldays,
    }
  
    // // Log booking details for debugging
    // console.log('Booking details:', bookingDetails);
  
    try {
      const result = await axios.post('/api/bookings/bookroom' , bookingDetails);
    } catch (error) {

      }
     
  }
  

  return (
    <div className='m-5'>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg" alt={room.name} />
            </div>

            <div className="col-md-6">
              <div style={{ textAlign: 'right' }}>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>Name: {room.name}</p>
                  <p>From Date: {fromdate}</p>
                  <p>To Date: {todate}</p>
                  <p>Max Count: {room.maxcount}</p>
                  <p>Total Days: {totaldays}</p>
                </b>
              </div>
              <div style={{ float: 'right' }}>
                <button className='btn btn-primary' onClick={bookRoom}>Book Now</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
