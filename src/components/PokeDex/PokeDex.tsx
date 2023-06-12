import React, {
  CSSProperties,
  Fragment,
  FunctionComponent,
  useState,
} from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import "./pokeDex.scss";

export interface IPokeDexProps {
  collectedPokemons: any;
}

export const PokeDex: FunctionComponent<IPokeDexProps> = (
  props: IPokeDexProps
): JSX.Element => {
  const { collectedPokemons } = props;

  const [modal, setModal] = useState<boolean>(false);
  const [nestedModal, setNestedModal] = useState<boolean>(false);
  const [closeAll, setCloseAll] = useState<boolean>(false);
  const [storedPokemon, setStoredPokemon] = useState<any>();

  const toggle = () => {
    setModal(!modal);
  };
  const toggleNested = (storePokemon: any) => {
    if (storePokemon.hasOwnProperty("name")) {
      setStoredPokemon(storePokemon);
    }
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };

  const handleBackgroundColor = (): CSSProperties => {
    let pokemonType: string = "";
    pokemonType = storedPokemon.types[0].type.name;

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

  const renderModal = (): JSX.Element => {
    const sortedPokemonArray = collectedPokemons
      .sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
      .map((pokemon: any, index: any) => (
        <div
          className="col-2 collectedPokemonContainer"
          key={index}
          onClick={() => toggleNested(pokemon)}
        >
          <img alt={pokemon.name} src={pokemon.sprites.front_default} />
          <p>{pokemon.name.toLocaleUpperCase()}</p>
          <p>{pokemon.id}</p>
        </div>
      ));

    return (
      <Fragment>
        <Button onClick={toggle}>Go To PokeDex</Button>
        <Modal isOpen={modal} toggle={toggle} size="lg" scrollable fade={false}>
          <ModalHeader toggle={toggle}>
            PokeDex | Collected {collectedPokemons.length} / 1281
          </ModalHeader>
          <ModalBody>
            <div className="row">{sortedPokemonArray}</div>
            <ModalBody>
              <Modal
                isOpen={nestedModal}
                toggle={toggleNested}
                onClosed={closeAll ? toggle : undefined}
                size="md"
                scrollable
                fade={false}
              >
                {storedPokemon && (
                  <div className="nestedModal">
                    <div>
                      <ModalHeader style={handleBackgroundColor()}>
                        {storedPokemon.name.toUpperCase()} #{storedPokemon.id}
                        <br />
                        {storedPokemon.types[0].type.name}
                        &nbsp;
                        {storedPokemon.types[1]?.type.name
                          ? storedPokemon.types[1].type.name
                          : null}
                      </ModalHeader>
                    </div>
                    <ModalBody>
                      <img
                        alt={storedPokemon.name}
                        src={storedPokemon.sprites.front_default}
                      />
                      <div className="btns">
                        <span>About</span> <span>Base Stats</span>
                        <span>Shiny</span> <span>Moves</span>
                      </div>
                      <p>Height: {storedPokemon.height}</p>
                      <p>Weight: {storedPokemon.weight}</p>
                      <p>Height: {storedPokemon.height}</p>
                      <p>Weight: {storedPokemon.weight}</p>
                      <p>Height: {storedPokemon.height}</p>
                      <p>Weight: {storedPokemon.weight}</p>
                    </ModalBody>
                  </div>
                )}
                {/*                 <ModalFooter className="modalFooter">
                  <Button color="primary" onClick={toggleNested}>
                    Back
                  </Button>
                </ModalFooter> */}
              </Modal>
            </ModalBody>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  };

  return <Fragment>{renderModal()}</Fragment>;
};
