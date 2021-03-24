import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { Video as VC } from "@crystallize/react-video";
import "@crystallize/react-video/dist/styles.css";

const Outer = styled.div`
  position: relative;
  min-height: 50px;
`;

export default function Video({ className, ...rest }) {
  return (
    <Outer className={className}>
      <VC {...rest} />
    </Outer>
  );
}
