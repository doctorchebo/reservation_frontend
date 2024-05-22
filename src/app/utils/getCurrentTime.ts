const getCurrentDateTime = () => {
  const now = new Date();

  // Get components
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  // Format components
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}`;

  // Combine and return
  return `${formattedDate}T${formattedTime}`;
};

export default getCurrentDateTime;
