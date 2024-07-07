import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import 'antd/dist/reset.css';
import Error from "../components/Error";
import moment from 'moment';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [fromDate, setfromdate] = useState();
  const [toDate, settodate] = useState();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setloading(true);
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        setrooms(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    };

    fetchRooms();
  }, []);

  function filterByDate(dates) {
    if (dates && dates.length === 2) {
      const from = dates[0];
      const to = dates[1];

      // Ensure from and to dates are different before setting state
      if (!from.isSame(to, 'day')) {
        setfromdate(from.format('DD-MM-YYYY'));
        settodate(to.format('DD-MM-YYYY'));
      } else {
        // Handle the case where dates are the same
        setfromdate(from.format('DD-MM-YYYY'));
        settodate(to.format('DD-MM-YYYY'));
        console.warn('From date and To date are the same');
      }

      console.log('Raw From Date:', from);
      console.log('Raw To Date:', to);
      console.log('Formatted From Date:', from.format('DD-MM-YYYY'));
      console.log('Formatted To Date:', to.format('DD-MM-YYYY'));
    }
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-3">
          <RangePicker 
            format='DD-MM-YYYY' 
            onChange={filterByDate} 
          />
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : rooms.length > 0 ? (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-3" key={room._id}>
                <Room room={room} fromdate={fromDate} todate={toDate} />
              </div>
            );
          })
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

export default Homescreen;
