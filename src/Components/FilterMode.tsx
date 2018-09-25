import * as React from "react";
import { Button, ButtonGroup } from "reactstrap";
import { Type } from "../data/dataType";

export interface IFilterProps {
  filteredSelection: Type[];
}
export interface IFilterModeState {
  checkBox: ICheckBoxTypesState[];
}
export interface ICheckBoxTypesState {
  type: string;
  isChecked: boolean;
}

export default class FilterMode extends React.PureComponent<
  IFilterProps,
  IFilterModeState
> {
  componentDidMount() {
    this.setState({ checkBox: this.checkBoxTypes });
  }
  checkBoxTypes = this.props.filteredSelection.map(e => {
    return { type: e.name, isChecked: false };
  });

  onClicked(boxNumber: number) {
    let checkBoxTypesCopy = [...this.checkBoxTypes];
    checkBoxTypesCopy[boxNumber].isChecked = !checkBoxTypesCopy[boxNumber]
      .isChecked;
    let flagChecks = checkBoxTypesCopy.filter(c => c.isChecked);
    let filterCount = flagChecks.length;
    if (filterCount > 2) {
      checkBoxTypesCopy[boxNumber].isChecked = !checkBoxTypesCopy[boxNumber]
        .isChecked;
      return;
    }
    this.setState({ checkBox: checkBoxTypesCopy });
  }
  public render() {
    return (
      <div>
        <ButtonGroup>
          {this.checkBoxTypes.map((t, i) => (
            <Button
              color={t.isChecked ? "primary" : "secondary"}
              key={i}
              onClick={() => this.onClicked(i)}
            >
              {t.type}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    );
  }
}
