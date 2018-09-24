import * as React from "react";
import { Button, ButtonGroup } from "reactstrap";

export interface IFilterProps {
  filteredSelection: string[];
}

export default class FilterMode extends React.PureComponent<IFilterProps, {}> {
  public render() {
    let type = ["fire", "water", "grass"];
    return (
      <div>
        <ButtonGroup>
          {type.map((t, i) => (
            <Button key={i}>{t}</Button>
          ))}
        </ButtonGroup>
      </div>
    );
  }
}
