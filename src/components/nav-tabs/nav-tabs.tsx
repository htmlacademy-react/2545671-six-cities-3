import { LocationsList } from '../locations-list/locations-list';

function NavTabs() {

  return (
    <div className="tabs">
      <section className="locations container">
        <LocationsList />
      </section>
    </div>
  );
}

export default NavTabs;
