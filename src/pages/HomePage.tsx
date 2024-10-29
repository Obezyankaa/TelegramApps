import Balance from "../components/balance/Balance";
import List from "../components/List/List";
import Profile from "../components/Profile/Profile";

export default function HomePage() {
  return (
    <section>
      <Profile />
      <Balance />
      <List />
    </section>
  );
}
