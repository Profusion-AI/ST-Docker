const Tracey = ({ message }) => {
  return (
    <div className="bg-blue-900 p-4 rounded-lg mb-6 border border-blue-700">
      <p className="font-bold mb-2 text-blue-300">Tracey:</p>
      <p className="italic text-lg">{message}</p>
    </div>
  );
};

export default Tracey;