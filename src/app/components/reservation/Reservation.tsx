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
      <Button name={"Reservar"} onClick={handleClick} />
    </div>
  );
};

export default Reservation;
