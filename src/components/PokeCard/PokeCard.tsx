import React, {
  CSSProperties,
  Fragment,
  FunctionComponent,
  useState,
} from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from 'reactstrap';
import { motion } from 'framer-motion';
import './pokeCard.scss';

export interface IPokeCardProps {
  id?: number;
  sprites: string;
  types: any;
  name: string;
  addPokemonClick: () => any;
  releasePokemonClick: () => any;
}

export const PokeCard: FunctionComponent<IPokeCardProps> = (
  props: IPokeCardProps
): JSX.Element => {
  const { id, sprites, types, name, addPokemonClick, releasePokemonClick } =
    props;
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const handleTypeArray = (valueType: []) => {
    if (Array.isArray(valueType)) {
      return valueType.map((type: any, index: number) => {
        return (
          <span key={index}>{type.type.name.toLocaleUpperCase()} &nbsp;</span>
        );
      });
    }
  };

  const renderCardBackSide = () => {
    return (
      <motion.div
        className='hiddenCard'
        onClick={() => setIsHidden(false)}
        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
      ></motion.div>
    );
  };

  const handleBackgroundColor = (): CSSProperties => {
    let pokemonType: string = '';
    pokemonType = types[0].type.name;

    switch (pokemonType) {
      case 'bug':
        return { backgroundColor: '#89ed89' };
      case 'dark':
        return { backgroundColor: '#303030' };
      case 'dragon':
        return { backgroundColor: '#010140' };
      case 'electric':
        return { backgroundColor: '#c5c501' };
      case 'fairy':
        return { backgroundColor: '#fdc1cb' };
      case 'fighting':
        return { backgroundColor: '#c98507' };
      case 'fire':
        return { backgroundColor: '#8d0606' };
      case 'flying':
        return { backgroundColor: '#afdbe9' };
      case 'ghost':
        return { backgroundColor: '#540054' };
      case 'grass':
        return { backgroundColor: '#028d02' };
      case 'ground':
        return { backgroundColor: '#603719' };
      case 'ice':
        return { backgroundColor: '#448e9d' };
      case 'normal':
        return { backgroundColor: '#c5c4c4' };
      case 'poison':
        return { backgroundColor: '#952795' };
      case 'psychic':
        return { backgroundColor: '#f9b0bb' };
      case 'rock':
        return { backgroundColor: '#4a4747' };
      case 'steel':
        return { backgroundColor: '#279b8f' };
      case 'water':
        return { backgroundColor: '#0f56a7' };
      default:
        return { background: undefined };
    }
  };

  const renderCardFront = () => {
    return (
      <motion.div className='pokeCardContainer'>
        <Card>
          <CardTitle tag='h5'>{id}</CardTitle>
          <img
            className='pokeImg'
            alt='Pokemon Pic'
            src={sprites}
            style={handleBackgroundColor()}
          />
          <CardBody>
            <CardSubtitle className='mb-2' tag='h5'>
              {name.toLocaleUpperCase()}
            </CardSubtitle>
            <CardText>{handleTypeArray(types)}</CardText>
            <Button
              className='mb-2'
              size='sm'
              block
              outline
              onClick={addPokemonClick}
            >
              Add to Pokedex
            </Button>
            <Button size='sm' block outline onClick={releasePokemonClick}>
              Release Pokemon
            </Button>
          </CardBody>
        </Card>
      </motion.div>
    );
  };
  return (
    <Fragment>{isHidden ? renderCardBackSide() : renderCardFront()}</Fragment>
  );
};
