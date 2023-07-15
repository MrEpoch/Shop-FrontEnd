import "./user__page.css";
import { useAccount } from "../../Account_context";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSandwich } from "../../Sandwich_context";
import Sandwich_card from "../shop__page-components/sandwich-card";

export default function User__page() {
  const { account, favourites } = useAccount();
  const { sandwich } = useSandwich();

  return (
    <section className="shop__user-page">
      <div className="shop__user-page__logout">
        <LogoutIcon />
      </div>
      <div className="shop__user-page__design"></div>
      <div className="shop__user-page__greeting">
        <h1>Hi, {account && account.name}!</h1>
        <p>Here you can see your account information, favourites and orders.</p>
      </div>
      <div className="shop__user-page__information">
        <h3>Account information:</h3>
        <div className="shop__user-page__information__container">
          <h3>Name: {account && account.name}</h3>
          <h3>Email: {account && account.email}</h3>
          <h3>Address: {account && account.address}</h3>
          <h3>Phone: {account && account.phone}</h3>
        </div>
      </div>
      <div className="shop__user-page__favourites">
        <h3>Favourites</h3>
        <div className="shop__user-page__favourites__container">
          {sandwich &&
            <Sandwich_card sandwich={sandwich
              .filter(
                (favourite: any) => favourites && favourites.includes(favourite.id)
                )} />
            }
        </div>
      </div>
      <div className="shop__user-page__orders"></div>
    </section>
  );
}
