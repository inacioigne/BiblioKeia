import { parseCookies } from "nookies";

export default function Admin() {
    return (
        <h1>Admin</h1>
    )
}

export const getServerSideProps = async (ctx) => {
    const { ["bibliokeia.token"]: token } = parseCookies(ctx);
    if (!token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    return {
      props: {},
    };
  };