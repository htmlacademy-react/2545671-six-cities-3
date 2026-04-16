import { memo } from 'react';
import { PlacesSorting } from '../../consts/consts';

type SortListProps = {
  selected: PlacesSorting;
  onChange: (value: PlacesSorting) => void;
  isOpen?: boolean;
}

function SortListComponent({ selected, onChange, isOpen = false }: SortListProps): JSX.Element {
  const openedClass = isOpen ? ' places__options--opened' : '';
  return (
    <ul className={`places__options places__options--custom ${openedClass}`} >
      {
        Object.values(PlacesSorting).map((option) => {
          const isActive = option === selected;
          const optionClassName = `places__option ${isActive ? 'places__option--active'
            : ''}`;
          return (
            <li
              className={optionClassName}
              tabIndex={0}
              key={option}
              onClick={() => onChange(option)}
            >
              {option}
            </li>
          );
        })
      }
    </ ul>
  );
}

export const SortList = memo(SortListComponent);
