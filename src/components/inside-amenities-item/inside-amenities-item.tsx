type Inside = {
  services: string[];
}

function InsideAmenitiesItem({ services }: Inside): JSX.Element {
  return (
    <ul className="offer__inside-list" data-testid='inside-container'>
      {services.map((service) => (
        <li
          className="offer__inside-item"
          key={service}
          data-testid='inside-value'
        >
          {service}
        </li>))}
    </ul>
  );
}

export default InsideAmenitiesItem;
