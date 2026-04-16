import { useState } from 'react';

import { SortList } from '../sort-list/sort-list';
import { PlacesSorting } from '../../consts/consts';

type SortProps = {
  selected: PlacesSorting;
  onChange: (value: PlacesSorting) => void;
}

function Sort({ selected, onChange }: SortProps): JSX.Element {
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);

  const toggleSortOpen = () => setIsSortOpen((prev) => !prev);

  const handleSortChange = (value: PlacesSorting) => {
    onChange(value);
    setIsSortOpen(false);
  };

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      onSubmit={(evt) => evt.preventDefault()}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={toggleSortOpen}
      >
        &nbsp;{selected}&nbsp;
        <svg
          className="places__sorting-arrow"
          width={7}
          height={4}
        >
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <SortList
        selected={selected}
        onChange={handleSortChange}
        isOpen={isSortOpen}
      />
    </form>
  );
}

export default Sort;
