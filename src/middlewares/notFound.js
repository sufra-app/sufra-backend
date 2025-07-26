const notFound = (req, res) =>
  res.status(404).json({ sucess: false, msg: "Rount Not Found" });

export default notFound;