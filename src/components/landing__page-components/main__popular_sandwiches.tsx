import "./main__popular_sandwiches.css";
import { useTheme } from "../../Theme_context";
import { ThemeType } from "../../Types";
import { useQuery } from "react-query";
import { GetSandwiches } from "../../API_requests";

    
export default function Popular__sandwiches() {

    const { theme } = useTheme() as ThemeType;

    const {isLoading, error, data} = useQuery<any[], Error>('sandwiches', GetSandwiches, {
        staleTime: 1000 * 60 * 60,
    });
    
    if (error) return <p>Error</p>

    return (
        <section className="shop-popular__sandwiches">
            <h1>Popular <span>Sandwiches</span></h1>
            <div className="shop-popular__sandwiches__container">
                { data &&
                    data.map((val, index) => (
                        <div key={index} className="card">
                            <div className="card-image">
                                <figure className="image is-4by3">
                                    <img style={{ objectFit: "cover" }} src={val.image} alt="Placeholder" />
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <h3>{val.name}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="card-content card__price">
                                <h3>{val.price}</h3>
                                <button className="button">Add to cart</button>
                                <button className="button">Buy now</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}
