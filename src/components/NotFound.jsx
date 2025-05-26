import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center h-screen bg-center bg-cover p-8 flex justify-center items-center flex-col " style={{ backgroundImage: "url('/notfound.png')"}}>
      <h1 className="text-8xl font-extrabold mb-4 text-white name ">404</h1>
      <p className="mb-4 text-2xl font-bold text-[#00A8E8]">The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-black py-1 px-3 font-bold rounded-xl text-lg bg-[#00A8E8]">GO HOME!</Link>
    </div>
  );
};

export default NotFound;
