import React, { Fragment, FunctionComponent, useState } from 'react';
import './pokeCard.scss';
interface ITypeProps {
  typeName: string;
}
export interface IPokeCardProps {
  id?: number;
  sprites: string;
  types: ITypeProps[];
  name: string;
}
export const PokeCard: FunctionComponent<IPokeCardProps> = (
  props: IPokeCardProps
): JSX.Element => {
  const { id, sprites, types, name } = props;
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const handleTypeArray = (valueType: ITypeProps[]) => {
    if (Array.isArray(valueType)) {
      return valueType.map((type: any, index: number) => {
        return <div key={index}>{type.type.name.toLocaleUpperCase()}</div>;
      });
    }
  };
  const renderCardBackSide = () => {
    return (
      <div className='HiddenCard'>
        <img
          alt='hidden card pic'
          src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/41d3ac77-2823-4e18-8910-a48de63acf87/d8xl0ja-ca02368b-643f-42f4-9721-f3895e14690d.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQxZDNhYzc3LTI4MjMtNGUxOC04OTEwLWE0OGRlNjNhY2Y4N1wvZDh4bDBqYS1jYTAyMzY4Yi02NDNmLTQyZjQtOTcyMS1mMzg5NWUxNDY5MGQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.dUhAjPqt1Rkudg3gHjqPNOQAuaA2wmXZ7T-Lq6L28O8'
        />
      </div>
    );
  };

  const renderCardFront = () => {
    return (
      <div className='PokeCard'>
        <div className='pokeIndex'>{id}</div>
        <div className='pokeName'>{name.toLocaleUpperCase()}</div>
        <img className='pokePic' alt='Pokemon Pic' src={sprites}></img>
        <div className='pokeType'>{handleTypeArray(types)}</div>
      </div>
    );
  };
  return (
    <Fragment>{isHidden ? renderCardBackSide() : renderCardFront()}</Fragment>
  );
};
