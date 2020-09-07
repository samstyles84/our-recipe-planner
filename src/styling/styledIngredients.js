import { styleColours } from "./styledGlobal";
import styled from "styled-components";

export const StyledIngredientsContainer = styled.section`
  display: grid;
  grid-template-columns: minmax(10px, auto) minmax(300px, 500px) minmax(
      10px,
      auto
    );
  border: 2px solid;
  border-top: 0;
`;

export const StyledIngredientTable = styled.table`
  background-color: ${styleColours.middle};
  border: 2px solid;
  margin: auto;
`;
