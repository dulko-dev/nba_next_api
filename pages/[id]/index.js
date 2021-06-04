function index({ data }) {
 

  return (
    <div>
      <h1>t</h1>
    </div>
  );
}

export const getStaticPaths = async() => {
  const res = await fetch(`https://www.balldontlie.io/api/v1/teams/`);
  const data = await res.json();

  const ids = data.data.map((data) => data.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const res = await fetch(
    `https://www.balldontlie.io/api/v1/teams/${context.params.id}`
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};


export default index;
