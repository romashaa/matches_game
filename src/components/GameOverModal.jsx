import React from 'react';
import {Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const GameOverModal = ({show,handleClose,winner,newGame}) => {
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Game over, {winner} wins!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Play again?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={newGame}>Yes</Button>
                    <Button variant='danger' onClick={handleClose}>No</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default GameOverModal;