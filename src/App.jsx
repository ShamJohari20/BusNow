import { useState, useEffect } from "react"
import { jsPDF } from "jspdf";
import "./App.css"

const App = () => {

  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [mobile, setMobile] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [minDate, setMinDate] = useState('')
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
  }, []);

  const bookTicket = () => {
    // console.log(source)
    // console.log(destination)
    // console.log(date)
    // console.log(name)
    // console.log(gender)
    // console.log(mobile)
    // console.log(age)
    // console.log(email)

    const tic = new jsPDF({
      orientation: "portrait", // or "landscape" if you want horizontal A4
      unit: "mm",              // mm, pt, cm, or in
      format: "a4"             // Standard A4 size
    });
    

    if (source == "" || destination == "" || date == "" || name == "" || gender == "" || mobile == "" || age == "" || email == "") {
      alert("Plz Fill Complete Details")
    }
    else if (source == destination) {
      alert("Plz Enter Source & Destination Carefully")
    }
    else {

      // Draw the logo
      tic.addImage("/logo.png", 'PNG', 10, 10, 30, 30);

      // Title
      tic.setFontSize(18);
      tic.text("BusNow Travel Ticket", 70, 20);

      // Draw horizontal line
      tic.setLineWidth(0.5);
      tic.line(10, 45, 200, 45);

      // Ticket details
      tic.setFontSize(12);
      const lineHeight = 10;
      let y = 55;

      const details = [
        { label: "Passenger Name", value: name },
        { label: "Gender", value: gender },
        { label: "Age", value: age },
        { label: "Mobile", value: mobile },
        { label: "Email", value: email },
        { label: "Date of Journey", value: date },
        { label: "Source", value: source },
        { label: "Destination", value: destination },
      ];

      details.forEach((item) => {
        tic.text(`${item.label}:`, 20, y);
        tic.text(`${item.value}`, 80, y);
        y += lineHeight;
      });

      // Footer
      tic.setFontSize(10);
      tic.text("Thank you for booking with BusNow!", 77, y + 20);
      tic.text("Happy Journey...", 93, y + 30);

      tic.save(`${name}_Ticket.pdf`);
    };

    
  }



  return (
    <>
      <div id="main">
        <div id="parent">
          <div id="child1">
            <img src="/logo.png" width="150" />
            {/* <h1 id="hedding">BusNow</h1> */}
          </div>

          <div id="ticket">
            <select value={source} onChange={(event) => setSource(event.target.value)}>
              <option label="Source">Source</option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Nagpur">Nagpur</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Banglore">Banglore</option>
              <option value="Chennai">Chennai</option>
              <option value="Kolkata">Kolkata</option>
            </select>

            <select value={destination} onChange={(event) => setDestination(event.target.value)}>
              <option label="Destination">Destination</option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Nagpur">Nagpur</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Banglore">Banglore</option>
              <option value="Chennai">Chennai</option>
              <option value="Kolkata">Kolkata</option>
            </select>

            <input type="date" placeholder="Enter Date" min={minDate}
              value={date} onChange={(event) => setDate(event.target.value)}
            />

            <input type="text" placeholder="Enter Name"
              value={name} onChange={(event) => setName(event.target.value)}
            />

            <input type="text" placeholder="Enter Gender"
              value={gender} onChange={(event) => setGender(event.target.value)}
            />

            <input type="number" placeholder="Enter Age"
              value={age} onChange={(event) => setAge(event.target.value)}
            />

            <input type="tel" placeholder="Enter Mobile"
              value={mobile} onChange={(event) => setMobile(event.target.value)}
            />

            <input type="email" placeholder="Enter Email"
              value={email} onChange={(event) => setEmail(event.target.value)}
            />

            <button onClick={bookTicket}>Book</button>
          </div>

        </div>
      </div>
    </>
  )
}

export default App