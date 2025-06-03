import { useParams } from "react-router-dom";

const HomePage = () => {
  const params = useParams();
  console.log(params);

  return (
    <section className="home">
      <h1>Home</h1>
    </section>
  );
};

export default HomePage;
