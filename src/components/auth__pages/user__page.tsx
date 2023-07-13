import "./user__page.css";
import { useAccount } from "../../Account_context"
import LogoutIcon from '@mui/icons-material/Logout';
import { useSandwich } from "../../Sandwich_context";

export default function User__page() {
    
    const { account, favourites } = useAccount();
    const { sandwiches } = useSandwich();

    return (
        <section className="shop__user-page">
            <div className="shop__user-page__logout"><LogoutIcon /></div>
            <div className="shop__user-page__design"></div>
            <div className="shop__user-page__information">
                <h3>Account information</h3>
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
                    {sandwiches && sandwiches.filter((favourite: any) => favourites && favourites.includes(favourite.id)
                    ).map((favourite: any, index: number) => (
                        <div className="shop__user-page__favourites__container__favourite" key={index}>
                            <div className="shop__user-page__favourites__container__favourite__image">
                                <img src={favourite.image} alt={favourite.name} />
                            </div>
                            <div className="shop__user-page__favourites__container__favourite__info">
                                <h4>{favourite.name}</h4>
                                <p>{favourite.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="shop__user-page__orders">

            </div>
        </section>
    )
}
