import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const GameModeModal = ({show, handleClose, onGameModeSelect}) => {

    const [selectedMode, setSelectedMode] = useState(null);

    const handleModeChange = (event) => {
        setSelectedMode(event.target.value);
    }

    const handleModeSave = () => {
        onGameModeSelect(selectedMode);
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose the game mode</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Check // prettier-ignore
                            type='radio'
                            label='Computer makes the first move'
                            name='modeRadio'
                            value='aiFirst'
                            checked={selectedMode==='aiFirst'}
                            onChange={handleModeChange}
                        />
                        <Form.Check // prettier-ignore
                            type='radio'
                            label='You make the first move'
                            name='modeRadio'
                            value='playerFirst'
                            checked={selectedMode==='playerFirst'}
                            onChange={handleModeChange}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={handleModeSave}>Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default GameModeModal;