import Login from "./Login";

function Home() {
  return (
    <section className="bg-gray-100 h-screen">
      <div className="container m-auto py-4">
        <h1 className="py-8 text-center text-4xl font-bold">
          WebPOS
        </h1>
        <Login />
      </div>
    </section>
  );
}

export default Home;
