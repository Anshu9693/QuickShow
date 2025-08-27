import { useParams } from "react-router-dom";
import { dummyShowsData, dummyDateTimeData, assets } from "../assets/assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import { useEffect } from "react";
import isoTimeFormate from "../Lib/isoTimeFormate";
import BlurCircle from "../Components/BlurCircle";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const SearLayout = () => {
  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const { id, date } = useParams();
  const [selectedSeats, setselectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const navigate = useNavigate();

  const { axios, getToken, user, image_base_url } = useAppContext();

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`);
      if (data.success) {
        setShow(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast.error("Please select a time first");
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 4) {
      return toast.error("You can only select up to 5 seats");
    }
    if (occupiedSeats.includes(seatId)) {
      return toast.error("This seat is already occupied");
    }
    setselectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`h-8 w-8 rounded  border border-primary/60 cursor-pointer 
                ${selectedSeats.includes(seatId) && "bg-primary text-white "}
                ${
                  occupiedSeats.includes(seatId) &&
                  "opacity-50 cursor-not-allowed "
                }`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  const getOccupiedSeats = async () => {
    try {
      const { data } = await axios.get(
        `/api/booking/seats/${selectedTime.showId}`
      );
      if (data.success) {
        setOccupiedSeats(data.occupiedSeats);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const bookTickets = async () => {
    try {
      if (!user) {
        return toast.error("Please login to book tickets");
      }
      if (!selectedTime || selectedSeats.length==0) {
        return toast.error("Please select time and seats");
      }

      const { data } = await axios.post(
        "/api/booking/create",
        {
          showId: selectedTime.showId,
          selectedSeats,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (data.success) {
        window.location.href = data.url;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getShow();
  }, []);

  useEffect(() => {
    if (selectedTime) {
      getOccupiedSeats();
    }
  }, [selectedTime]);


  return show ? (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50">
      {/* avliable timing */}
      <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30">
        <p className="text-lg font-semibold px-6">Available Timinga</p>
        <div className="mt-5 space-y-1">
          {show.dateTime[date].map((item) => (
            <div
              key={item.time}
              onClick={() => {
                setSelectedTime(item);
              }}
              className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer  transition 
          ${
            selectedTime?.time === item.time
              ? "bg-primary text-white"
              : "hover:bg-primary/20"
          }
          `}
            >
              <ClockIcon className="w-4 h-4" />
              <p className="text-sm">{isoTimeFormate(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* seata layout */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="0" right="0" />
        <h1 className="text-2xl font-semibold mb-4">Select Your Seat</h1>
        <img src={assets.screenImage} alt="Screen" />
        <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>
        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
            {groupRows[0].map((row) => renderSeats(row))}
          </div>
          <div className="grid grid-cols-2 gap-11">
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>{group.map((row) => renderSeats(row))}</div>
            ))}
          </div>
        </div>
        <button
          onClick={bookTickets}
          className="flex items-center gap-1 mt-20 px-10  py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-poiter active:scale-95"
        >
          Procede to checkout
          <ArrowRightIcon strokeWidth={3} className="h-4 w-4" />
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default SearLayout;
