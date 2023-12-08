import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { usePokemonContext } from "../PokemonContext/PokemonContext";
import {
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { quests } from "./Quests";
import coinBag from "../../utils/Coin_Bag_icon-icons.com_67574.png";
import "./IdleQuests.scss";

export interface IIdleQuests {}

export const IdleQuests: FunctionComponent<IIdleQuests> = (props: IIdleQuests): JSX.Element => {
  const {} = props;
  const { pokemonContext, setPokemonContext } = usePokemonContext();

  useEffect(() => {
    localStorage.setItem("collectedPokemons", JSON.stringify(pokemonContext.collectedPokemons));
  }, [pokemonContext.collectedPokemons]);

  const [openQuests, setOpenQuests] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<any>(
    pokemonContext.collectedPokemons ? pokemonContext.collectedPokemons[0 as any] : undefined
  );
  const [selectedQuestIndex, setSelectedQuestIndex] = useState<number>(0);
  const [pokemonsOnQuests, setPokemonsOnQuests] = useState<any[]>([]);

  const handleQuestClick = (index: number) => {
    setSelectedQuestIndex(index);
  };

  const handleDropdownPokemons = () => setDropdownOpen((prevState) => !prevState);
  const handleToggleQuests = () => setOpenQuests(!openQuests);

  const handleSelectPokemon = (pokemonSelected: React.SetStateAction<undefined>) => {
    setSelectedPokemon(pokemonSelected);
  };

  const handleStartQuest = (pokemon: any) => {
    const randomPercentage = Math.random() * 100;
    pokemon.isBusyOnQuest = true;
    setSelectedPokemon(() => {
      const availablePokemons = pokemonContext.collectedPokemons.filter(
        (availablePokemon: any) => !availablePokemon.isBusyOnQuest
      );
      if (availablePokemons.length === 0) {
        return undefined;
      }

      return availablePokemons[Math.floor(Math.random() * availablePokemons.length)];
    });

    const questStartTime = Date.now();
    const questEndTime = Date.now();
    const questDuration = questEndTime - questStartTime;
    let remainingTime = quests[selectedQuestIndex].timer - questDuration;

    const handleQuestResult = (isQuestCompleted: boolean) => {
      setPokemonsOnQuests((prevPokemonsOnQuests) => prevPokemonsOnQuests.filter((p) => p.id !== pokemon.id));
      if (isQuestCompleted) {
        //JUSTERA OM MAN KLARAR UPPDRAG

        pokemon.isBusyOnQuest = false;
        setPokemonContext((prevContext) => ({
          ...prevContext,
          coins: prevContext.coins + quests[selectedQuestIndex].reward.coins,
        }));
        console.log("Din pokemon klarade uppdraget", pokemon.name, quests[selectedQuestIndex].questName);
      } else {
        //JUSTERA OM MAN INTE KLARAR UPPDRAG

        const updateRemovePokemon = pokemonContext.collectedPokemons.filter(
          (pokemonQuest: any) => pokemonQuest.id !== pokemon.id
        ) as any;
        setPokemonContext((prevContext) => ({
          ...prevContext,
          collectedPokemons: updateRemovePokemon,
        }));
        console.log("Förlorade uppdrag... du förlorade", pokemon.name, quests[selectedQuestIndex].questName);
      }
    };

    const questInterval = setInterval(() => {
      remainingTime -= 1000;

      setPokemonsOnQuests((prevPokemonsOnQuests) => {
        const index = prevPokemonsOnQuests.findIndex((p) => p.id === pokemon.id);

        prevPokemonsOnQuests[index].timeUntilQuestFinished = remainingTime;
        return [...prevPokemonsOnQuests];
      });

      if (remainingTime <= 0) {
        clearInterval(questInterval);
      }
    }, 1000);

    setTimeout(() => {
      if (quests[selectedQuestIndex].completionPercentage < randomPercentage) {
        // Handle Quest Fail
        handleQuestResult(false);
      } else {
        // Handle Quest Completion
        handleQuestResult(true);
      }
    }, quests[selectedQuestIndex].timer);

    setPokemonsOnQuests((prevPokemonsOnQuests) => [
      ...prevPokemonsOnQuests,
      {
        name: pokemon.name,
        quest: quests[selectedQuestIndex].questName,
        id: pokemon.id,
        image: pokemon.sprites.front_default,
      },
    ]);
  };

  return (
    <Fragment>
      <div className="bag" onClick={handleToggleQuests}>
        <img src={coinBag} alt="Coin bag" />
        <span>Coins (Click for idle quests): {pokemonContext.coins}</span>
      </div>
      <div>
        <Modal className="idleQuests" isOpen={openQuests} toggle={handleToggleQuests} fade={false}>
          <ModalHeader toggle={handleToggleQuests}>Quest Log</ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <div>
                  <h3>{quests[selectedQuestIndex].questName}</h3>
                  {quests.map((quest, index) => (
                    <button key={index} className="questBtn" onClick={() => handleQuestClick(index)}>
                      {quest.questName}
                    </button>
                  ))}
                </div>
              </Col>
              <Col style={{ textAlign: "center" }}>
                <div className="pokemonAvatar">
                  {selectedPokemon && (
                    <h3>
                      {selectedPokemon.name.charAt(0).toUpperCase()}
                      {selectedPokemon.name.slice(1)}
                    </h3>
                  )}
                  {selectedPokemon && <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />}
                  {selectedPokemon === undefined && <p>Choose a pokemon!</p>}
                </div>
                <Dropdown isOpen={dropdownOpen} toggle={handleDropdownPokemons}>
                  <DropdownToggle>Choose Pokemon</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Available Pokemons</DropdownItem>
                    {pokemonContext.collectedPokemons.map((pokemon: any) => (
                      <div key={pokemon.id}>
                        <DropdownItem onClick={() => handleSelectPokemon(pokemon)} disabled={pokemon.isBusyOnQuest}>
                          {pokemon.name}
                        </DropdownItem>
                      </div>
                    ))}
                  </DropdownMenu>
                  <br />
                </Dropdown>
              </Col>
            </Row>
            <Row>
              <h3>Details</h3>
              <Row>
                <Col md="4">Reward:</Col>
                <Col>
                  <b>{quests[selectedQuestIndex].reward.coins} Gold</b>
                </Col>
              </Row>
              <Row>
                <Col md="4">Success Rate:</Col>
                <Col>
                  <b>{quests[selectedQuestIndex].completionPercentage}%</b>
                </Col>
              </Row>
              <Row>
                <Col md="4">Time Limit:</Col>
                <Col>
                  <b>{quests[selectedQuestIndex].timer / 1000 - 1} Seconds</b>
                </Col>
              </Row>
            </Row>
          </ModalBody>
          <ModalFooter>
            <button
              onClick={() => handleStartQuest(selectedPokemon)}
              disabled={selectedPokemon === undefined || pokemonsOnQuests.length > 0}
            >
              Start Quest
            </button>
            <div>Pokemon Currently on Quest</div>
            {pokemonsOnQuests.map((pokemonOnQuest: any, index: number) => {
              return (
                <div key={index}>
                  <img style={{ transform: "scaleX(-1)" }} src={pokemonOnQuest.image} /> Time left: &nbsp;
                  {isNaN(pokemonOnQuest.timeUntilQuestFinished / 1000)
                    ? "Starting Quest"
                    : `${pokemonOnQuest.timeUntilQuestFinished / 1000} seconds`}
                </div>
              );
            })}
          </ModalFooter>
        </Modal>
      </div>
    </Fragment>
  );
};
