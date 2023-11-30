import React, {
  CSSProperties,
  Fragment,
  FunctionComponent,
  useState,
} from "react";
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
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
  const [viewStat, setViewStat] = useState<
    "About" | "Stats" | "Sprites" | "Moves"
  >("About");

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

  const handleColor = (): CSSProperties => {
    let pokemonType: string = "";
    pokemonType = storedPokemon.types[0].type.name;

    switch (pokemonType) {
      case "bug":
        return { color: "#89ed89" };
      case "dark":
        return { color: "#303030" };
      case "dragon":
        return { color: "#010140" };
      case "electric":
        return { color: "#c5c501" };
      case "fairy":
        return { color: "#fdc1cb" };
      case "fighting":
        return { color: "#c98507" };
      case "fire":
        return { color: "#8d0606" };
      case "flying":
        return { color: "#afdbe9" };
      case "ghost":
        return { color: "#540054" };
      case "grass":
        return { color: "#028d02" };
      case "ground":
        return { color: "#603719" };
      case "ice":
        return { color: "#448e9d" };
      case "normal":
        return { color: "#c5c4c4" };
      case "poison":
        return { color: "#952795" };
      case "psychic":
        return { color: "#f9b0bb" };
      case "rock":
        return { color: "#4a4747" };
      case "steel":
        return { color: "#279b8f" };
      case "water":
        return { color: "#0f56a7" };
      default:
        return { background: undefined };
    }
  };

  const renderModal = (): JSX.Element => {
    const sortedPokemonArray = collectedPokemons
      .sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
      .map((pokemon: any, index: any) => (
        <div
          className="col-2 CollectedPokemonContainer"
          key={index}
          onClick={() => toggleNested(pokemon)}
        >
          <span className="amount">
            {pokemon.collected > 1 && "x" + pokemon.collected}
          </span>
          <img alt={pokemon.name} src={pokemon.sprites.front_default} />
          <p>{pokemon.name.toLocaleUpperCase()}</p>
        </div>
      ));

    const pokemonKiloConverter = (weight: number) => {
      let formattedWeight;
      if (weight >= 100) {
        return (formattedWeight = Math.floor(weight / 10));
      } else {
        const firstDigit = Math.floor(weight / 10);
        const secondDigit = weight % 10;
        return (formattedWeight = `${firstDigit}.${secondDigit}`);
      }
    };

    console.log("pokemons", storedPokemon);

    return (
      <Fragment>
        <Button className="dex-btn" onClick={toggle}>
          Go To PokeDex
        </Button>
        <Modal isOpen={modal} toggle={toggle} size="lg" scrollable fade={false}>
          <ModalHeader toggle={toggle}>
            PokeDex | Collected {collectedPokemons.length} / 1281
          </ModalHeader>
          <ModalBody>
            <div className="row">{sortedPokemonArray}</div>
          </ModalBody>
        </Modal>

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
              <ModalHeader style={handleBackgroundColor()} className="header">
                <div className="top">
                  <div />
                  <div>{storedPokemon.name.toUpperCase()}</div>
                  <div>#{storedPokemon.id}</div>
                </div>
                <div className="mid">
                  <img
                    alt={storedPokemon.name}
                    src={storedPokemon.sprites.front_default}
                  />
                </div>
                <div className="bot">
                  {storedPokemon.types[0].type.name.toUpperCase()}
                  &nbsp;
                  {storedPokemon.types[1]?.type.name
                    ? storedPokemon.types[1].type.name.toUpperCase()
                    : null}
                </div>
              </ModalHeader>
              <ModalBody className="nestedModal-body">
                <Row className="nestedModal-header-row">
                  <Col>
                    <h4
                      className={`${viewStat === "About" && "active"}`}
                      onClick={() => setViewStat("About")}
                    >
                      About
                    </h4>
                  </Col>
                  <Col>
                    <h4
                      className={`${viewStat === "Stats" && "active"}`}
                      onClick={() => setViewStat("Stats")}
                    >
                      Stats
                    </h4>
                  </Col>
                  <Col>
                    <h4
                      className={`${viewStat === "Sprites" && "active"}`}
                      onClick={() => setViewStat("Sprites")}
                    >
                      Sprites
                    </h4>
                  </Col>
                  <Col>
                    <h4
                      className={`${viewStat === "Moves" && "active"}`}
                      onClick={() => setViewStat("Moves")}
                    >
                      Moves
                    </h4>
                  </Col>
                </Row>
                <Row className="nestedModal-content-row">
                  {viewStat === "About" && (
                    <Row>
                      <Col xs="12" className="box-col">
                        <Row>
                          <Col>Height:</Col>
                          <Col className="stat-about-answer">
                            {storedPokemon.height}0 (cm)
                          </Col>
                        </Row>
                        <Row>
                          <Col>Weight:</Col>
                          <Col className="stat-about-answer">
                            {pokemonKiloConverter(storedPokemon.weight)} (kg)
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  )}
                  {viewStat === "Stats" && (
                    <div className="Stats">
                      <div className="hp">
                        <span>{storedPokemon.stats[0].stat.name}</span>
                        <span>{storedPokemon.stats[0].base_stat}</span>
                      </div>
                      <div className="hexagon-row">
                        <div className="leftOfhex">
                          <div className="special-atk">
                            <span>sp.atk</span>
                            <span>{storedPokemon.stats[3].base_stat}</span>
                          </div>
                          <div className="special-def">
                            <span>sp.def</span>
                            <span>{storedPokemon.stats[4].base_stat}</span>
                          </div>
                        </div>

                        <span
                          className="stats-hexagon"
                          style={{ ...handleColor(), fontSize: "250px" }}
                        >
                          &#x2B22;
                        </span>

                        <div className="rightOfhex">
                          <div className="atk">
                            <span>{storedPokemon.stats[1].stat.name}</span>
                            <span>{storedPokemon.stats[1].base_stat}</span>
                          </div>
                          <div className="def">
                            <span>{storedPokemon.stats[2].stat.name}</span>
                            <span>{storedPokemon.stats[2].base_stat}</span>
                          </div>
                        </div>
                      </div>
                      <div className="speed">
                        <span>{storedPokemon.stats[5].stat.name}</span>
                        <span>{storedPokemon.stats[5].base_stat}</span>
                      </div>
                    </div>
                  )}
                  {viewStat === "Sprites" && (
                    <Row>
                      <Col xs="12" className="box-col">
                        <img
                          alt={storedPokemon.name}
                          src={storedPokemon.sprites.front_default}
                        />
                        <img
                          alt={storedPokemon.name}
                          src={storedPokemon.sprites.front_shiny}
                        />
                        <img
                          alt={storedPokemon.name}
                          src={storedPokemon.sprites.back_default}
                        />
                        <img
                          alt={storedPokemon.name}
                          src={storedPokemon.sprites.back_shiny}
                        />
                      </Col>
                    </Row>
                  )}

                  {viewStat === "Moves" && (
                    <>
                      <Col>
                        {storedPokemon.abilities.map(
                          (abi: any, index: number) => {
                            return (
                              <Row key={index}>
                                <Col xs="12" className="box-col">
                                  {abi.ability.name}
                                </Col>
                              </Row>
                            );
                          }
                        )}
                      </Col>
                    </>
                  )}
                </Row>
              </ModalBody>
            </div>
          )}
        </Modal>
      </Fragment>
    );
  };

  return <Fragment>{renderModal()}</Fragment>;
};
