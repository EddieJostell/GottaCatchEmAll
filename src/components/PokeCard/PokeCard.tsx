import React, {
  CSSProperties,
  Fragment,
  FunctionComponent,
  useState,
} from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import { motion } from "framer-motion";
import "./pokeCard.scss";

export interface IPokeCardProps {
  id?: number;
  sprites: any;
  types: any;
  name: string;
  addPokemonClick: any;
  cardClick: () => void;
  cardIsVisible: boolean;
}

export const PokeCard: FunctionComponent<IPokeCardProps> = (
  props: IPokeCardProps
): JSX.Element => {
  const {
    id,
    sprites,
    types,
    name,
    addPokemonClick,
    cardClick,
    cardIsVisible,
  } = props;
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

  const handleBoxShadow = () => {
    let pokemonType: string = "";
    pokemonType = types[0].type.name;

    switch (pokemonType) {
      case "bug":
        return "137, 237, 137";
      case "dark":
        return "48, 48, 48";
      case "dragon":
        return "1, 1, 64";
      case "electric":
        return "197, 197, 1";
      case "fairy":
        return "253, 193, 203";
      case "fighting":
        return "201, 133, 7";
      case "fire":
        return "141, 6, 6";
      case "flying":
        return "175, 219, 233";
      case "ghost":
        return "84, 0, 84";
      case "grass":
        return "2, 141, 2";
      case "ground":
        return "96, 55, 25";
      case "ice":
        return "68, 142, 157";
      case "normal":
        return "197, 196, 196";
      case "poison":
        return "149, 39, 149";
      case "psychic":
        return "249, 176, 187";
      case "rock":
        return "74, 71, 71";
      case "steel":
        return "39, 155, 143";
      case "water":
        return "15, 86, 167";
      default:
        return { background: undefined };
    }
  };

  const handleBackgroundColor = (): CSSProperties => {
    let pokemonType: string = "";
    pokemonType = types[0].type.name;

    switch (pokemonType) {
      case "bug":
        return { backgroundColor: "#89ed89" };
      case "dark":
        return { backgroundColor: "#303030" };
      case "dragon":
        return { backgroundColor: "#010140" };
      case "electric":
        return { backgroundColor: "#c5c501" };
      case "fairy":
        return { backgroundColor: "#fdc1cb" };
      case "fighting":
        return { backgroundColor: "#c98507" };
      case "fire":
        return { backgroundColor: "#8d0606" };
      case "flying":
        return { backgroundColor: "#afdbe9" };
      case "ghost":
        return { backgroundColor: "#540054" };
      case "grass":
        return { backgroundColor: "#028d02" };
      case "ground":
        return { backgroundColor: "#603719" };
      case "ice":
        return { backgroundColor: "#448e9d" };
      case "normal":
        return { backgroundColor: "#c5c4c4" };
      case "poison":
        return { backgroundColor: "#952795" };
      case "psychic":
        return { backgroundColor: "#f9b0bb" };
      case "rock":
        return { backgroundColor: "#4a4747" };
      case "steel":
        return { backgroundColor: "#279b8f" };
      case "water":
        return { backgroundColor: "#0f56a7" };
      default:
        return { background: undefined };
    }
  };

  const hoverVariants = {
    hoverScale: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        delay: 0.2,
      },
    },
    hoverShadow: {
      boxShadow: `0 0 15px 15px rgba(${handleBoxShadow()}, 0.6)`,
      transition: {
        delay: 0.2,
        duration: 1.5,
      },
    },
    hoverRotate: {
      rotate: [0, 0.25, -0.25, 0.25, -0.25, 0.25, -0.25, 0.2],
      transition: {
        delay: 0.1,
        duration: 0.7,
        repeat: Infinity,
        type: "spring",
      },
    },
  };

  const [variant, setVariant] = React.useState("initial");
  const handleAnimateClick = () => {
    if (cardClick) {
      cardClick();
    }
    setVariant("animate");
    setTimeout(() => {
      setIsHidden(false);
    }, 1200);
  };

  const Hiddenvariants = {
    initial: {
      scale: 1,
      opacity: 1,
    },
    animate: {
      scale: [1, 1.5],
      boxShadow: [
        `0 0 15px 15px rgba(${handleBoxShadow()}, 0.2)`,
        `0 0 100px 100px rgba(${handleBoxShadow()}, 1)`,
        `0 0 50px 50px rgba(${handleBoxShadow()}, 0)`,
      ],
      opacity: [1, 1, 0],
      transition: { duration: 1.2, delay: 0 },
    },
  };
  const variants = {
    initial: { scale: 1.5, opacity: 0, boxShadow: "0" },
    animate: {
      scale: [1.5, 1],
      opacity: [0, 1],
      transition: { duration: 0.6, delay: 0 },
    },
  };

  const twoCards = () => {
    if (isHidden) {
      return (
        <motion.div
          variants={Hiddenvariants}
          initial="initial"
          animate={variant}
          onClick={handleAnimateClick}
        >
          <motion.div
            className="hiddenCard"
            variants={hoverVariants}
            whileHover={["hoverScale", "hoverRotate", "hoverShadow"]}
          ></motion.div>
        </motion.div>
      );
    }
    return (
      <motion.div
        variants={variants}
        initial="initial"
        animate={variant}
        onClick={handleAnimateClick}
        className="pokeCardContainer"
      >
        <Card>
          <CardTitle tag="h5">{id}</CardTitle>
          <img
            className="pokeImg"
            alt="Pokemon Pic"
            src={sprites.front_default}
            style={handleBackgroundColor()}
          />
          <CardBody>
            <CardSubtitle className="mb-2" tag="h5">
              {name.toLocaleUpperCase()}
            </CardSubtitle>
            <CardText>{handleTypeArray(types)}</CardText>
            <Button
              className="mb-2"
              disabled={cardIsVisible ? false : true}
              size="sm"
              block
              outline
              onClick={addPokemonClick}
            >
              Add to Pokedex
            </Button>
          </CardBody>
        </Card>
      </motion.div>
    );
  };

  return <Fragment>{twoCards()}</Fragment>;
};
