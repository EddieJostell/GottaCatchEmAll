import React, {
  CSSProperties,
  Fragment,
  FunctionComponent,
  useState,
} from "react";
import { Modal, ModalHeader, ModalBody, Row, Col, Container } from "reactstrap";
import "./pokeDex.scss";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import pokedexLogo from "../../utils/Pokedex_tool_icon-icons.com_67529.png";
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
  const [viewStat, setViewStat] = useState<"About" | "Stats">("About");

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

  const handleStrokeFillColor = (): CSSProperties => {
    let pokemonType: string = "";
    pokemonType = storedPokemon.types[0].type.name;

    switch (pokemonType) {
      case "bug":
        return { stroke: "#89ed89", fill: "#89ed89" };
      case "dark":
        return { stroke: "#303030", fill: "#303030" };
      case "dragon":
        return { stroke: "#010140", fill: "#010140" };
      case "electric":
        return { stroke: "#c5c501", fill: "#c5c501" };
      case "fairy":
        return { stroke: "#fdc1cb", fill: "#fdc1cb" };
      case "fighting":
        return { stroke: "#c98507", fill: "#c98507" };
      case "fire":
        return { stroke: "#8d0606", fill: "#8d0606" };
      case "flying":
        return { stroke: "#8d0606", fill: "#8d0606" };
      case "ghost":
        return { stroke: "#540054", fill: "#540054" };
      case "grass":
        return { stroke: "#028d02", fill: "#028d02" };
      case "ground":
        return { stroke: "#603719", fill: "#603719" };
      case "ice":
        return { stroke: "#448e9d", fill: "#448e9d" };
      case "normal":
        return { stroke: "#c5c4c4", fill: "#c5c4c4" };
      case "poison":
        return { stroke: "#952795", fill: "#952795" };
      case "psychic":
        return { stroke: "#f9b0bb", fill: "#f9b0bb" };
      case "rock":
        return { stroke: "#4a4747", fill: "#4a4747" };
      case "steel":
        return { stroke: "#279b8f", fill: "#279b8f" };
      case "water":
        return { stroke: "#0f56a7", fill: "#0f56a7" };
      default:
        return { background: undefined };
    }
  };

  const renderModal = (): JSX.Element => {
    const sortedPokemonArray = collectedPokemons
      .sort((a: any, b: any) => (a.id > b.id ? 1 : -1))
      .map((pokemon: any, index: any) => (
        <div
          className="PokeDex-entry"
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
        <div className="pokedex" onClick={toggle}>
          <img width="180" height="180" src={pokedexLogo} alt="pokedex" />
          <span>Pokedex</span>
        </div>

        <Modal isOpen={modal} toggle={toggle} size="lg" scrollable fade={false}>
          <ModalHeader toggle={toggle}>
            PokeDex | Collected {collectedPokemons.length} / 1281
          </ModalHeader>
          <ModalBody>
            <Container fluid className="CollectedPokemonContainer">
              {sortedPokemonArray}
            </Container>
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
                </Row>
                <Row className="nestedModal-content-row">
                  {viewStat === "About" && (
                    <>
                      <Col xs="12" className="box-col">
                        <Row>
                          <Col>
                            <div style={{ textAlign: "center" }}>
                              {storedPokemon.name.toUpperCase()} a&nbsp;
                              {storedPokemon.types[0].type.name.toUpperCase()}
                              {storedPokemon.types[1]?.type.name
                                ? " & " +
                                  storedPokemon.types[1].type.name.toUpperCase()
                                : null}{" "}
                              type pokemon that weigh about&nbsp;
                              {pokemonKiloConverter(storedPokemon.weight)} kg
                              and measures about {storedPokemon.height}0 cm from
                              the ground.
                            </div>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs="12" className="box-col">
                        <Row>
                          <Col>
                            <div style={{ textAlign: "center" }}>Normal</div>
                            <div style={{ textAlign: "center" }}>
                              <img
                                alt={storedPokemon.name}
                                src={storedPokemon.sprites.front_default}
                              />
                              <img
                                alt={storedPokemon.name}
                                src={storedPokemon.sprites.back_default}
                              />
                            </div>
                          </Col>

                          <Col>
                            <div style={{ textAlign: "center" }}>Rare </div>
                            <div style={{ textAlign: "center" }}>
                              <img
                                alt={storedPokemon.name}
                                src={storedPokemon.sprites.front_shiny}
                              />

                              <img
                                alt={storedPokemon.name}
                                src={storedPokemon.sprites.back_shiny}
                              />
                            </div>
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        {storedPokemon.abilities.map(
                          (abi: any, index: number) => {
                            return (
                              <Row key={index}>
                                <Col xs="12" className="box-col">
                                  Innate ability: {abi.ability.name}
                                </Col>
                              </Row>
                            );
                          }
                        )}
                      </Col>
                    </>
                  )}
                  {viewStat === "Stats" && (
                    <div className="Stats">
                      {storedPokemon && (
                        <RadarChart
                          cx={235}
                          cy={170}
                          outerRadius={110}
                          width={450}
                          height={300}
                          data={[
                            {
                              subject: storedPokemon?.stats[0]?.stat?.name,
                              A: storedPokemon?.stats[0]?.base_stat,
                            },
                            {
                              subject: storedPokemon?.stats[1]?.stat?.name,
                              A: storedPokemon?.stats[1]?.base_stat,
                            },
                            {
                              subject: storedPokemon?.stats[2]?.stat?.name,
                              A: storedPokemon.stats[2].base_stat,
                            },
                            {
                              subject: storedPokemon?.stats[5]?.stat?.name,
                              A: storedPokemon?.stats[5]?.base_stat,
                            },
                            {
                              subject: storedPokemon?.stats[4]?.stat?.name,
                              A: storedPokemon?.stats[4]?.base_stat,
                            },
                            {
                              subject: storedPokemon?.stats[3]?.stat?.name,
                              A: storedPokemon?.stats[3]?.base_stat,
                            },
                          ]}
                        >
                          <PolarGrid gridType="circle" />
                          <PolarAngleAxis dataKey="subject" />
                          <PolarRadiusAxis />
                          <Radar
                            name="Mike"
                            dataKey="A"
                            style={handleStrokeFillColor()}
                            fillOpacity={0.6}
                          />
                        </RadarChart>
                      )}
                    </div>
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
