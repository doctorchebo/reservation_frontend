import Button from "../button/Button";

const Reservation = () => {
  const handleClick = () => {
    console.log("Reserved");
  };
  return (
    <div>
      <div>
        <label>Name:</label>
        <input placeholder="name" />
      </div>
      <Button name={"Reservar"} onClick={handleClick} disabled={false}/>
    </div>
  );
};

export default Reservation;
