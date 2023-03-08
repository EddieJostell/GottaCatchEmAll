import React, { Fragment, FunctionComponent, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './pokeDex.scss';

export interface IPokeDexProps {
  collectedPokemons: [];
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
    if (storePokemon.hasOwnProperty('name')) {
      setStoredPokemon(storePokemon);
    }
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  const renderModal = (): JSX.Element => {
    const sortedPokemonArray = collectedPokemons
      .sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
      .map((pokemon: any, index: any) => (
        <div
          className='col-2 collectedPokemonContainer'
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
        <Modal isOpen={modal} toggle={toggle} size='lg' scrollable fade={false}>
          <ModalHeader toggle={toggle}>PokeDex</ModalHeader>
          <ModalBody>
            <div className='row'>{sortedPokemonArray}</div>
            <ModalBody>
              <Modal
                isOpen={nestedModal}
                toggle={toggleNested}
                onClosed={closeAll ? toggle : undefined}
                size='md'
                scrollable
                fade={false}
              >
                {storedPokemon && (
                  <Fragment>
                    <ModalHeader>{storedPokemon.name}</ModalHeader>
                    <ModalBody>
                      <img src={storedPokemon.sprites.front_default} />
                    </ModalBody>
                  </Fragment>
                )}
                <ModalFooter>
                  <Button color='primary' onClick={toggleNested}>
                    Go back to PokeDex
                  </Button>
                  <Button color='secondary' onClick={toggleAll}>
                    Go to Dashboard
                  </Button>
                </ModalFooter>
              </Modal>
            </ModalBody>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  };

  return <Fragment>{renderModal()}</Fragment>;
};
