import React, { useState } from 'react';
import axios from 'axios';
import { BsChevronDown, BsChevronUp, BsClockFill } from "react-icons/bs";
import { FaRegCheckCircle, FaCheckCircle } from "react-icons/fa";
import { CustomInput, Collapse, Button, CardBody, Card, Modal, ModalHeader, ModalBody, ModalFooter,  Form, FormGroup, Label, InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';

const Queue = (props) => {
  const {buttonLabel, className} = props;

  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDone, setDone] = useState(false);
  const [isPriority, setPriority] = useState(1);
  var btn;
  var tickBtn;
  var priorityBtn;

  const [ticketdata, setTicketData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  if(isLoaded === false){
      axios.get("http://localhost:8903/readAll")
      .then(response => {
          console.log(response.data);
          setTicketData(response.data);
      });
      setIsLoaded(true); 
  }

  const data = [
    {id: 1, title: "Title 1", complete: false, description:"Desc 1", author:"Author 1", topic: "Topic 1", urgency: 1},
    {id: 2, title: "Title 2", complete: false, description:"Desc 2", author:"Author 2", topic: "Topic 1", urgency: 2},
    {id: 3, title: "Title 3", complete: false, description:"Desc 3", author:"Author 1", topic: "Topic 3", urgency: 1},
  ];

  const expand = () => setIsOpen(!isOpen);

  const toggle = () => setModal(!modal);
    if (isOpen) {
      btn = <BsChevronUp className="contractQueueIc" onClick={expand}/>;
    } else {
      btn = <BsChevronDown className="expandQueueIc" onClick={expand}/>;
    }

    if (isDone) {
      tickBtn = <FaCheckCircle className="completedIc"/>;
    } else {
      tickBtn = <FaRegCheckCircle className="uncompletedIc"/>;
    }

    if(isPriority === 1){
      priorityBtn = <BsClockFill className="mostUrgIcQ"/>
    } else if(isPriority === 2){
      priorityBtn = <BsClockFill className="secMostUrgIcQ"/>
    }else if(isPriority === 3){
      priorityBtn = <BsClockFill className="middleUrgIcQ"/>
    }else if(isPriority === 4){
      priorityBtn = <BsClockFill className="secLeastUrgIcQ"/>
    }else if(isPriority === 5){
      priorityBtn = <BsClockFill className="leastUrgIcQ"/>
    }

    return (
      <> 
        <p>Queue</p>
        {data.map((item) => (
          <div className="ticket_div" key={item.id}>
            
              <p className="ticket_comp title_comp">{item.title} </p>
              <p className="ticket_comp">{item.topic} </p>
              {btn}
              {tickBtn}
              {priorityBtn}
              
              <Collapse isOpen={isOpen}>
                <Card id="cueCard">
                  <CardBody>
                    <p><strong>Topic:</strong> {item.topic}</p>
                    <br />
                    <p><strong>Description:</strong></p>
                    <p>{item.description}</p>
                    <br />
                    <p><strong>Completed:</strong> {item.completed}</p>
                    <br />
                    <p><strong>Urgency:</strong> {item.urgency}</p>
                    <br />
                    <p><strong>Date created:</strong> Anim pariatur cliche</p>
                    <Button color="success" className="queueBtnBlock">Mark as done</Button>
                    <Button color="warning" className="queueBtnBlock" onClick={toggle}>Update ticket</Button>
                    <Button color="danger" className="queueBtnBlock">Delete ticket</Button>
                    <div>
                      <Modal isOpen={modal} toggle={toggle} className={className}>
                        <ModalHeader toggle={toggle}>Update ticket</ModalHeader>
                        <ModalBody>
                          <Form>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>Author</InputGroupText>
                              </InputGroupAddon>
                              <Input type="text" name="author" id="author" value={item.author} placeholder="Enter author name"/>
                            </InputGroup>
                            <br />
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>Topic</InputGroupText>
                              </InputGroupAddon>
                              <Input type="text" name="topic" id="topic" placeholder="Enter topic"/>
                            </InputGroup>
                            <br />
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>Description</InputGroupText>
                              </InputGroupAddon>
                              <Input type="textarea" name="description" id="description" placeholder="Enter description" />
                            </InputGroup>
                            <br />
                            <FormGroup>
                              <Label for="radioLabel">Urgency</Label>
                              <div>
                                <CustomInput type="radio" id="exampleCustomRadio" name="urgency" value="1" label="Most urgent" />
                                <CustomInput type="radio" id="exampleCustomRadio2" name="urgency" value="2" label="Very urgent" />
                                <CustomInput type="radio" id="exampleCustomRadio3" name="urgency" value="3" label="Slightly urgent" />
                                <CustomInput type="radio" id="exampleCustomRadio4" name="urgency" value="4" label="Less urgent" />
                                <CustomInput type="radio" id="exampleCustomRadio5" name="urgency" value="5" label="Least urgent" />
                              </div>
                            </FormGroup>
                            <br />

                            <Input type="hidden" name="completed" id="completed" value="false"/>
                          </Form>
                          </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={toggle}>Update ticket</Button>{' '}
                          <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                      </Modal>
                    </div>

                  </CardBody>
                </Card>
              </Collapse>
          </div>
        ))}
      </>
    );
  };
  
  export default Queue;