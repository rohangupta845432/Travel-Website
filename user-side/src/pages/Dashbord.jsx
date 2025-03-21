import React from "react";
import { Container } from "react-bootstrap";
import { RiInboxLine } from "react-icons/ri";

const Dashbord = () => {
  return (
    <Container fluid className="p-3">
      <h4 className="border-bottom pb-2 mb-0">
        <RiInboxLine /> Dashbord
      </h4>
      <div className="d-flex gap-3 flex-wrap"></div>
    </Container>
  );
};

export default Dashbord;
